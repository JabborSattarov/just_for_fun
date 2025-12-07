import { randomBytes, createCipheriv, createHash, createDecipheriv, } from "crypto";

export class HashingId {

   encryptId(id: string, secretKey: string) {
      const iv = randomBytes(16);
      const hashedKey = createHash('sha256').update(secretKey).digest();
      const cipher = createCipheriv('aes-256-cbc', hashedKey, iv);
      let encrypted = cipher.update(id, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return iv.toString('hex') + ':' + encrypted;
   }


   decryptId(hash: string, secretKey: string) {

      const [ivHex, encrypted] = hash.split(':');
      const iv = Buffer.from(ivHex, 'hex');
      const hashedKey = createHash('sha256').update(secretKey).digest();
      const decipher = createDecipheriv('aes-256-cbc', hashedKey, iv);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
   }

}