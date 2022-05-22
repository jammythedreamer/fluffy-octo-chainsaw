import knex from './knex';
import sha256 = require('crypto-js/sha256');
import {
  ILogin,
  TAccountStateType,
  TPR,
} from '../common/interface';
import * as types from '../common/types';
import DB_TABLE from '../common/db_table';

export async function create(email: string, password: string, userId: number): TPR<void> {
  const hashStr = sha256(email + password + userId.toString()).toString();
  const data: ILogin = {
    email: email,
    password: hashStr,
    user_id: userId,
    account_state: types.ACCOUNT_STATE_TYPE.PENDING,
  };
  const result = await knex<ILogin>(DB_TABLE.LOGIN)
    .insert(data)
    .catch((err) => {
      console.log('DB_ERROR: login create', err);
      return [null, err];
    });
  return [null, null];
}

export async function updatePassword(email: string, newPassword: string, userId: number): TPR<void> {
  const hashStr = sha256(email + newPassword + userId.toString());
  const updatedData: Pick<ILogin, 'password'> = {
    password: hashStr
  };
  const result = await knex<ILogin>(DB_TABLE.LOGIN)
    .update(updatedData)
    .where({ email })
    .catch((err) => {
      console.log('DB_ERROR: login update', err);
      return [null, err];
    });
  return [null, null];
}

export async function updateState(email: string, newState: TAccountStateType): TPR<void> {
  const updatedData: Pick<ILogin, 'account_state'> = {
    account_state: newState
  };
  const result = await knex<ILogin>(DB_TABLE.LOGIN)
    .update(updatedData)
    .where({ email })
    .catch((err) => {
      console.log('DB_ERROR: login update', err);
      return [null, err];
    });
  return [null, null];
}

export async function get(email: string): TPR<ILogin> {
  const result = await knex<ILogin>(DB_TABLE.LOGIN)
    .where({ email })
    .first()
    .catch((err) => {
      console.log('DB_ERROR: login get', err);
      return [null, err];
    })
  return [result as ILogin, null];
}
