import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyAccessToken } from '@/utils/jsonwebtoken';
import jwt from 'jsonwebtoken';
import { handleMySQLQuery } from '@/db/dbConn';
import { workspaceListData } from '@/types/workspaceListData';
type Data = {
    status: string,
    code: number,
    message: string,
    result?: {
        workspaceList : workspaceListData[],
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let verifyResult;
    if(req.headers.authorization){
      console.log('req.headers.authorization ', req.headers.authorization);
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

    console.log('findUserInfoResult ', findUserInfoResult);

    if(findUserInfoResult && Array.isArray(findUserInfoResult) && findUserInfoResult.length !== 0){
        let findWorkspaceList = await handleMySQLQuery({
            sqlStr: `SELECT *
            FROM workspace
            JOIN user_workspace ON workspace.id = user_workspace.workspace_id
            JOIN user ON user_workspace.user_id = user.id
            WHERE user_workspace.user_id = ${findUserInfoResult[0].id};`
        });
        console.log('findWorkspaceList ', findWorkspaceList)
        const resultData: workspaceListData[] = [];
        if(findWorkspaceList && Array.isArray(findWorkspaceList) && findWorkspaceList.length !== 0){
          findWorkspaceList.forEach((item: any) => {
            resultData.push({
              workspaceId: item.workspace_id.toString(),
              workspaceTitle: item.title,
              createdAt: item.created_at,
              isAdmin: item.is_admin === 1 ? true : false,
              ownerInfo: {
                username: item.username,
                email: item.email,
              }
            })
          })
        }
        
        res.status(200).json({
            status: 'Success',
            code: 200,
            message: 'Find Workspace List',
            result: {
              workspaceList: resultData
            }
        });
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