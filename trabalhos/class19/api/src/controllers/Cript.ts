
export class Criptography{

    public dataCryptography = {
      algorithm : "aes256",
      secret : "chaves",
      type : "hex"
    };
  
    cript(password: string): string {
  
      const crypto = require("crypto");
      const cipher = crypto.createCipher(this.dataCryptography.algorithm, this.dataCryptography.secret);
  
      cipher.update(password);
      return cipher.final(this.dataCryptography.type);
    }
  }
  