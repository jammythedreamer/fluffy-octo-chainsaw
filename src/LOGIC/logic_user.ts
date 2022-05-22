import * as db_user from '../DATABASE/db_user';
import { TPR } from '../common/interface';

export async function createUser(email: string): TPR<number> {
  const [userId, err] = await db_user.create(email);
  if (err) {
    return [null, err];
  }
  return [userId, null];
}
