import mongoose, { ObjectId } from 'mongoose';


export type tokenPayloadType = {
   id: mongoose.Types.ObjectId,
   role: string,
   expiryTime?: string
}