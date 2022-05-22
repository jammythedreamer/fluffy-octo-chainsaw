import knex from './knex';
import {
  IUser,
  TPR,
} from '../common/interface';
import * as types from '../common/types';
import DB_TABLE from '../common/db_table';

export async function create(email: string): TPR<number> {
  const data: Omit<IUser, 'id'> = {
    email: email,
  };
  const result = await knex(DB_TABLE.USER)
    .insert(data)
    .catch((err) => {
      console.log('DB_ERROR: login create', err);
      return [null, err];
    });

  return [result[0], null];
}

export async function update(id: number, updatedData: Partial<IUser>, userId: number): TPR<void> {
  const result = await knex<IUser>(DB_TABLE.USER)
    .update(updatedData)
    .where({ id })
    .catch((err) => {
      console.log('DB_ERROR: login update', err);
      return [null, err];
    });
  return [null, null];
}

export async function get(id: number): TPR<IUser> {
  const result = await knex<IUser>(DB_TABLE.USER)
    .where({ id })
    .first()
    .catch((err) => {
      console.log('DB_ERROR: login get', err);
      return [null, err];
    })
  return [result as IUser, null];
}
