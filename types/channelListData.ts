export type channelListData = {
    channelId: string,
    workspaceId: string,
    channelTitle: string,
    createdAt: string,
    updatedAt: string,
    isAdmin: boolean,
    ownerInfo: {
      username: string,
      email: string,
    }
  }