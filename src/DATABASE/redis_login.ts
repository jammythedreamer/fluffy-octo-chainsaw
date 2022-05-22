import * as redis from './redis';
import { v4 as uuidv4 } from 'uuid';
import { TPR } from '../common/interface';

const EMAIL_TOKEN_EXPIRY = 1 * 3600; // 1 hour
const LOGIN_TOKEN_EXPIRY = 1 * 3600; // 1 hour

function getEmailTokenKey(email: string) {
  return `email_token::${email}`;
}

function getLoginTokenKey(userId: number) {
  return `login_token::${userId};`
}

export async function setEmailToken(email: string): TPR<string> {
  const key = getEmailTokenKey(email);
  const token = uuidv4();
  const [, err] = await redis.setDataWithExpiry(key, token, EMAIL_TOKEN_EXPIRY);
  if (err) {
    return [null, err];
  }
  return [token, null];
}

export async function getEmailToken(email: string): TPR<string> {
  const key = getEmailTokenKey(email);
  return await redis.getData(key);
}

export async function setLoginToken(userId: number): TPR<string> {
  const key = getLoginTokenKey(userId);
  const token = uuidv4()
  const [, err] = await redis.setDataWithExpiry(key, token, LOGIN_TOKEN_EXPIRY);
  if (err) {
    return [null, err];
  }
  return [token, null];
}

export async function getLoginToken(userId: number): TPR<string> {
  const key = getLoginTokenKey(userId);
  return await redis.getData(key);
}

export async function removeLoginToken(userId: number): TPR<void> {
  const key = getLoginTokenKey(userId);
  return await redis.removeData(key);
}

// TODO: optimize
export async function extendLoginToken(userId: number): TPR<void> {
  const key = getLoginTokenKey(userId);
  const [token, err] = await getLoginToken(userId);
  return await redis.setDataWithExpiry(key, token, LOGIN_TOKEN_EXPIRY);
}
