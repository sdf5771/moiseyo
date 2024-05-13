export type workspaceListData = {
    workspaceId: string,
    workspaceTitle: string,
    createdAt: string,
    isAdmin: boolean,
    ownerInfo: {
      username: string,
      email: string,
    }
  }