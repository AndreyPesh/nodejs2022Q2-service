export interface PayloadJWT {
  login: string;
  id: string;
}

export interface UserData {
  id: string;
  login: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
