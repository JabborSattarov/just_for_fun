import mongoose from 'mongoose';


export type tokenSignPayloadType = {
   id: mongoose.Types.ObjectId,
   role: string,
   expiryTime?: string
}

export type tokenVerifyPayloadType = string


export function tokenGenericType<T>(arg: T): T {
   return arg;
}