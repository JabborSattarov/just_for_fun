import mongoose from "mongoose"

export interface CustomeRequestInterface extends Request {
   decode: { 
      id: mongoose.Types.ObjectId,
      role: string,
      expiryTime?: string
   }
}