import { randomBytes } from 'crypto';
type arg = 32 | 64
export class OneTimeCode {
   generateOneTimeCode(lenght: arg) {
      return randomBytes(lenght).toString("base64");
   }
}