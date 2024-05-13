import type { NextApiRequest, NextApiResponse } from 'next'
import { handleMySQLQuery } from '@/db/dbConn';
type Data = {
    status: string,
    code: number,
    message: string,
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
        // 유저 이메일 중복
        res.status(409).json({
            status: 'Failed',
            code: 409,
            message: 'User Email Duplicate',
        });
    } else {
        let createAccountResult = await handleMySQLQuery({
            sqlStr: `INSERT INTO user (email, password, username)
                    VALUE ('${req.body.email}', '${req.body.password}', '${req.body.userName}');`
        });

        console.log('createAccountResult ', createAccountResult);

        res.status(200).json({
          status: 'Success',
          code: 200,
          message: 'Create Success',
        });
    }
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: 'Failed',
      code: 500,
      message: 'Server Error'
    });
  }
}