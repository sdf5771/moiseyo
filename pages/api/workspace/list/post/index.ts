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
        let createWorkspaceResult: any = await handleMySQLQuery({
            sqlStr: `INSERT INTO workspace (title, owner)
            VALUES ('${req.body.workspaceTitle}', '${findUserInfoResult[0].id}');`
        });

        if(createWorkspaceResult && createWorkspaceResult.insertId){
            let createdUserWorkspace = await handleMySQLQuery({
                sqlStr: `INSERT INTO user_workspace (user_id, workspace_id)
                VALUES ('${findUserInfoResult[0].id}', '${createWorkspaceResult.insertId}');`
            })

            res.status(200).json({
              status: 'Success',
              code: 200,
              message: 'Create Workspace Success',
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