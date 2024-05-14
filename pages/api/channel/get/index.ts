import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyAccessToken } from '@/utils/jsonwebtoken';
import jwt from 'jsonwebtoken';
import { handleMySQLQuery } from '@/db/dbConn';
import { channelListData } from '@/types/channelListData';
type Data = {
    status: string,
    code: number,
    message: string,
    result?: {
        channelList : channelListData[],
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let verifyResult;
    const workspaceId = req.query.wid;
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
        let findChannelList = await handleMySQLQuery({
            sqlStr: `SELECT *
            FROM channel
            JOIN user_channel ON channel.id = user_channel.channel_id
            JOIN user ON user_channel.user_id = user.id
            WHERE user_channel.user_id = ${findUserInfoResult[0].id} AND user_channel.workspace_id = ${workspaceId};`
        });
        console.log('findChannelList ', findChannelList)
        const resultData: channelListData[] = [];
        if(findChannelList && Array.isArray(findChannelList) && findChannelList.length !== 0){
            findChannelList.forEach((item: any) => {
            resultData.push({
                channelId: item.channel_id.toString(),
              workspaceId: item.workspace_id.toString(),
              channelTitle: item.title,
              createdAt: item.created_at,
              updatedAt: item.updated_at,
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
            message: 'Find Channel List',
            result: {
              channelList: resultData
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