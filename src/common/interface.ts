import * as types from './types';

export type TValues<T> = T[keyof T];
export type TR<T> = [T | null, Error];
export type TPR<T> = Promise<TR<T>>;

export interface IUser {
  id: number;
  email: string;
}

export type TAccountStateType = TValues<typeof types.ACCOUNT_STATE_TYPE>;

export interface ILogin {
  email: string;
  password: string;
  user_id: number;
  account_state: TAccountStateType;
}

export type TWalletType = TValues<typeof types.WALLET_TYPE>;

export interface IWallet {
  id: number;
  user_id: number;
  wallet_type: TWalletType;
  wallet_address: string;
}
