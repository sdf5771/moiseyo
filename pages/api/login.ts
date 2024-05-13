import type { NextApiRequest, NextApiResponse } from 'next'
import { handleMySQLQuery } from '@/db/dbConn';
import { createAccessToken, createRefreshToken } from '@/utils/jsonwebtoken';
type Data = {
    status: string,
    code: number,
    message: string,
    result?: {
        accessToken : string,
        refreshToken : string,
        userInfo : {
            email: string,
          username: string,
          role: string,
          create_at: string,
          emailConfirm: boolean,
        }
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let findUserInfoResult = await handleMySQLQuery({
      sqlStr: `SELECT * FROM user WHERE email='${req.body.email}';`
    });
    
    let userData = {
      email: '',
      username: '',
      role: '',
      createAt: '',
      emailConfirm: false,
    }

    if(findUserInfoResult && Array.isArray(findUserInfoResult) && findUserInfoResult.length !== 0){
      if(findUserInfoResult[0].password !== req.body.password){
        res.status(422).json({
          status: 'Unprocessable Content',
          code: 422,
          message: 'Password Wrong'
        });
      }

      userData.email = findUserInfoResult[0].email;
      userData.username = findUserInfoResult[0].username;
      userData.role = findUserInfoResult[0].role;
      userData.createAt = findUserInfoResult[0].create_at;
      userData.emailConfirm = findUserInfoResult[0].email_confirm === 0 ? false : true;

    } else {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
        message: 'UserId is not defined'
      });
    }

    const accessToken = createAccessToken(req.body.email);
    const refreshToken = createRefreshToken(req.body.email);
    console.log("accessToken ", accessToken);
    console.log('refreshToken ', refreshToken);
    let updateRefreshTokenResult = await handleMySQLQuery({
      sqlStr: `UPDATE user SET refresh_token='${refreshToken}' WHERE email='${req.body.email}'`
    })

    res.status(200).json({
      status: 'Success',
      code: 200,
      message: 'Login Success',
      result: {
        accessToken,
        refreshToken,
        userInfo:{
            email: userData.email,
          username: userData.username,
          role: userData.role,
          create_at: userData.createAt,
          emailConfirm: userData.emailConfirm,
        }
      }
    });
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: 'Failed',
      code: 500,
      message: 'Server Error'
    });
  }
}