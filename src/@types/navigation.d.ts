export type RootParamList = {
  groups: undefined;
  new: undefined;
  players: {
    group: undefined
  }
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      groups: undefined;
      new: undefined;
      players: {
        group: string
      }
    }
  }
}