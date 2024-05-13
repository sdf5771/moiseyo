import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyAccessToken } from '@/utils/jsonwebtoken';
import jwt from 'jsonwebtoken';
type Data = {
    status: string,
    code: number,
    message: string,
    result?: {
        accessToken : string,
        refreshToken : string,
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let verifyResult;
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        verifyResult = verifyAccessToken(token);
    } else {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
        message: 'jwt is not defined'
      });
    }

    res.status(200).json({
      status: 'Success',
      code: 200,
      message: 'jwt is fresh'
    });

  } catch (error) {
    console.error(error)

    if(error instanceof jwt.TokenExpiredError){
        res.status(401).json({
          status: 'Unauthorized',
          code: 401,
          message: 'jwt expired'
        });
    }

    if(error instanceof jwt.JsonWebTokenError){
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
        message: 'jwt is not valid'
      });
    }

    res.status(500).json({
      status: 'Failed',
      code: 500,
      message: 'Server Error'
    });
  }
}