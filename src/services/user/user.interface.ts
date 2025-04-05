import { IQuerryPage } from "../interface";

export interface IUserSearchResponse {
  total: number;
  users: IUserSearch[];
}

export interface IUserSearch {
  id: string;
  name: string;
}

export interface IUserQuerry extends IQuerryPage {
  name: string;
}
