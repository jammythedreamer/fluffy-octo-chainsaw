import * as types from '../common/types';
import * as db_login from '../DATABASE/db_login';
import * as redis_login from '../DATABASE/redis_login';
import * as logic_user from './logic_user';
import {
  ILogin,
  TPR,
} from '../common/interface';

export async function signUp(email: string, password: string): TPR<void> {
  const [userId, err] = await logic_user.createUser(email);
  if (err) {
    return [null, err];
  }

  const [, err2] = await db_login.create(email, password, userId);
  if (err2) {
    return [null, err2];
  }

  const [, err3] = await sendConfirmEmail(email);
  if (err3) {
    return [null, err3];
  }
  return [null, null];
}

export async function sendConfirmEmail(email: string): TPR<void> {
  const [, err] = await redis_login.setEmailToken(email);
  if (err) {
    return [null, err];
  }
  // TODO: send email
  return [null, null];
}

export async function confirmEmail(email: string, token: string): TPR<void> {
  const [storedToken, err] = await redis_login.getEmailToken(email);
  const isConfirmed = storedToken === token;
  if (!isConfirmed) {
    const err = new Error();
    return [null, err];
  }
  db_login.updateState(email, types.ACCOUNT_STATE_TYPE.ACTIVE);
  return [null, null];
}

export async function login(email: string, password: string): TPR<{ token: string }> {
  const [loginData, err] = await db_login.get(email);
  if (err) {
    return [null, err];
  }
  if (loginData.password !== password) {
    const loginErr = new Error();
    return [null, loginErr];
  }
  // TODO: 2FA
  const userId = loginData.user_id;
  const [token, err2] = await redis_login.setLoginToken(userId);
  if (err2) {
    return [null, err2];
  }
  const result = {
    token: token,
  };
  return [result, null];
}
