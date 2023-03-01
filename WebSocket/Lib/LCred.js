const bcrypt = require('bcryptjs');
const md5 = require('md5');

Elkaisar.LCred = class LCred {
  static async PassCheck(password, hash){
    const md5Pass = md5(password);
    const SoltedPass = md5Pass.slice(0, 15) + "!%@!((&" + md5Pass.slice(15);
    return bcrypt.compare(SoltedPass, hash.replace("$2y$", "$2a$"));
  }

  static async PassEnc(password){
    const md5Pass = md5(password);
    const SoltedPass = md5Pass.slice(0, 15) + "!%@!((&" + md5Pass.slice(15);
    return bcrypt.hash(SoltedPass, 10);
    //return password_hash(substr_replace(md5($pass), "!%@!((&", 15, 0), PASSWORD_BCRYPT);
  }

};