import { Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BadRequestException } from "src/exceptions";
import { CreateContractInterface, CreateProductInterface } from "src/interfaces";
import { CreateContractDto } from "src/modules/contracts/dto";
import { CreateProductDto } from "src/modules/products/dto/createProduct.dto";
import { formatErrors } from "src/utils/error.formater";

interface ContractValidatonPipeInterface {
   file: Express.Multer.File,
   body: CreateContractInterface
}
interface ContractValidationResponseInterface {
   validatedFile: Express.Multer.File,
   validatedBody: CreateContractInterface
}
@Injectable()
export class CreateContractValidatonPipe implements PipeTransform {

   async transform(value: ContractValidatonPipeInterface): Promise<ContractValidationResponseInterface> {
      const { body, file } = value;
      let errorHandler = false;
      if (!file) {
         throw new BadRequestException("", "File is required");
      }
      if (!file.mimetype.includes("pdf")) {
         throw new BadRequestException("", "File must bu pdf fomat!");
      }
      if (file.size > 5 * 1024 * 1024) {
         throw new BadRequestException("", "File siz is not be large than 5MB");
      }


      // Contract
      const contractDto = plainToInstance(CreateContractDto, body);

      const errors = await validate(contractDto, {
         whitelist: true,
         forbidNonWhitelisted: true,
      })

      if (errors.length) {
         errorHandler = true
         throw new BadRequestException({
            errors: formatErrors(errors),
         }, "Bad Request Excaption");
      }


      // Products

      let products: CreateProductInterface[] = body.products
      if (typeof products === "string") {
         try {
            products = JSON.parse(products)
         } catch (error) {
            throw new BadRequestException("", "Products should be into JSON");
         }
      }
      for (const product of products) {
         const productDto = plainToInstance(CreateProductDto, product)
         const errors = await validate(productDto, {
            whitelist: true,
            forbidNonWhitelisted: true,
         })
         if (errors.length) {
            errorHandler = true
            console.log("error from pipe",errors)
            throw new BadRequestException({
               errors: formatErrors(errors),
            });
         }
         body.products = products;
      }

      if (!errorHandler) {
         console.log("errorHandler",errorHandler)
         return {
            validatedBody: body,
            validatedFile: file
         }
      }

   }
}