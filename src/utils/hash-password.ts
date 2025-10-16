import { createHash, randomBytes } from "crypto";

export class HashPassword {
   constructor(private readonly ITERATIONS = 1000) {}
   private generateSalt (length = 16) {
      return randomBytes(length).toString("hex")
   }

   private strongHash (str: string, iterations = this.ITERATIONS): string{
      let hash = str;
      for (let i = 0; i < iterations; i++) {
         const h = createHash('sha256');
         h.update(hash);
         hash = h.digest('hex');
      }
      return hash
   }

   hashPassword (password: string ): string {
      const salt = this.generateSalt(16);
      const hash = this.strongHash(password + salt);
      return `${salt}:${hash}`;
   }

   verifyPassword (storedPassword:string, inputPassword: string): boolean {
   
      const [salt, originalHash] = storedPassword.split(':');
      const hash = this.strongHash(inputPassword + salt);
      return hash === originalHash;
   }
}