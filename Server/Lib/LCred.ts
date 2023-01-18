import * as bcrypt from 'bcryptjs';
import md5 from 'md5';
export class LCred {
  public static async PassCheck(password: string, hash: string): Promise<boolean> {
    const md5Pass = md5(password);
    const SoltedPass = md5Pass.slice(0, 15) + "!%@!((&" + md5Pass.slice(15);
    return bcrypt.compare(SoltedPass, hash.replace("$2y$", "$2a$"));
  }
}