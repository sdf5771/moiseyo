import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyAccessToken } from '@/utils/jsonwebtoken';
import jwt from 'jsonwebtoken';
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

    let findUserInfoResult = await handleMySQLQuery({
        sqlStr: `SELECT * FROM user WHERE email='${verifyResult.userId}';`
    });

    if(findUserInfoResult  && Array.isArray(findUserInfoResult) && findUserInfoResult.length !== 0){
        let createChannelResult: any = await handleMySQLQuery({
            sqlStr: `INSERT INTO channel (title, owner, workspace_id)
            VALUES ('${req.body.channelTitle}', '${findUserInfoResult[0].id}', '${req.body.workspaceId}');`
        });

        if(createChannelResult && createChannelResult.insertId){
            let createdUserChannel = await handleMySQLQuery({
                sqlStr: `INSERT INTO user_channel (user_id, channel_id ,workspace_id)
                VALUES ('${findUserInfoResult[0].id}', '${createChannelResult.insertId}', '${req.body.workspaceId}');`
            })

            res.status(200).json({
              status: 'Success',
              code: 200,
              message: 'Create Channel Success',
            });
        }
    } else {
        res.status(401).json({
            status: 'Unauthorized',
            code: 401,
            message: 'jwt is not valid'
        });
    }
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