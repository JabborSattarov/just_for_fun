import { randomBytes } from 'crypto';
type arg = 32 | 64 | 4
export class OneTimeCode {
   generateOneTimeCode(lenght: arg) {
      return randomBytes(lenght).toString("base64");
   }
   generateAuthCode(length: arg) {
      let digits = '';
      for (let i = 0; i < length; i++) {
         digits += Math.floor(Math.random() * 10);
      }
      return digits;
   }
}