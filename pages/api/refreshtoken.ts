import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyRefreshToken, createAccessToken } from '@/utils/jsonwebtoken';
import { handleMySQLQuery } from '@/db/dbConn';
import jwt from 'jsonwebtoken';

type Tdata = {
    status: string,
    code: number,
    message: string,
    result?: {
        accessToken : string,
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tdata>
) {
  try {
    let refreshToken = req.body.refreshToken;
    let verifyResult;
    let newAccessToken;
    if(refreshToken){
        verifyResult = verifyRefreshToken(refreshToken);
        if(verifyResult && verifyResult.email){
          let userInfo = await handleMySQLQuery({
            sqlStr: `SELECT refresh_token FROM user WHERE email='${verifyResult.email}'`
          })

          if(Array.isArray(userInfo) && userInfo[0].refresh_token === refreshToken){
            newAccessToken = createAccessToken(verifyResult.email);
          } else {
            res.status(401).json({
              status: 'Unauthorized',
              code: 401,
              message: 'refreshtoken is not valid'
            });
          }
        }
    }
    if(newAccessToken){
      res.status(200).json({
        status: 'Success',
        code: 200,
        message: 'accessToken refreshed',
        result: {
          accessToken: newAccessToken,
        }
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error)
    if(error instanceof jwt.TokenExpiredError){
        res.status(401).json({
          status: 'Unauthorized',
          code: 401,
          message: 'refreshtoken expired'
        });
    }

    res.status(500).json({
      status: 'Failed',
      code: 500,
      message: 'Server Error'
    });
  }
}