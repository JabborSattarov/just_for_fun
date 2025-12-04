import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { CreateClientInterface } from "src/interfaces";

export class ClientCreateValidationPipe implements PipeTransform{
   transform(value: CreateClientInterface, metadata: ArgumentMetadata) {
      console.log(value);
      return value
   }
}