import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BadRequestException } from "src/exceptions";
import { CreateProductDto } from "src/modules/products/dto/createProduct.dto";
import { formatErrors } from "src/utils/error.formater";

@Injectable()
export class ProductValidationPipe implements PipeTransform {
   async transform(value: CreateProductDto, metadata: ArgumentMetadata) {
      if (metadata.type !== "body") {
         throw new BadRequestException("Validation Error", "this validation validate only body")
      }
      if (value.product_type == "variant" && !Object.keys(value).includes("product_child")) {
         throw new BadRequestException({
            errors: [
               {
                  field: "product_child",
                  errors: [
                     "product child required if product type is variant"
                  ]
               }
            ],
         }, "Bad Request");
      }
      if (value.product_type !== "variant" && Object.keys(value).includes("product_child")) {
         throw new BadRequestException({
            errors: [
               {
                  field: "product_child",
                  errors: [
                     "product child not required if product type is variant"
                  ]
               }
            ],
         }, "Bad Request");
      }
      const instanceDto = plainToInstance(CreateProductDto, value);


      const errors = await validate(instanceDto, {
         whitelist: true,
         forbidNonWhitelisted: true,

      });

      if (errors.length > 0) {
         throw new BadRequestException({
            errors: formatErrors(errors),
         });
      }

      return instanceDto;
   }

}