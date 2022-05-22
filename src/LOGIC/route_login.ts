import ApiError from '../common/api_error';
import * as logic_login from './logic_login';
import * as assert from '../common/assert';

export async function signUp(req) {
  const email: string = req.body.email;
  const password: string = req.body.password;

  // TODO: validation parameters

  const [result, err] = await logic_login.signUp(email, password);
  if (err) {
    // TODO handling
    return err;
  }
  const retValue = {
    error: ApiError.OK
  }
  return retValue;
}

export async function confirmEmail(req) {
  const email: string = req.query.email;
  const token: string = req.query.token;
  console.log(email, token)
  // TODO: validation parameters

  const [result, err] = await logic_login.confirmEmail(email, token);
  if (err) {
    // TODO handling
    return err;
  }
  const retValue = {
    error: ApiError.OK
  }
  return retValue
}

export async function login(req) {
  const email: string = req.body.email;
  const password: string = req.body.password;

  const [result, err] = await logic_login.login(email, password);
  if (err) {
    return err;
  }
  const retValue = {
    error: ApiError.OK,
    token: result.token,
  }
}
