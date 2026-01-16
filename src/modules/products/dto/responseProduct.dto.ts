import { Exclude, Expose, Transform, Type } from "class-transformer";
import { ResponseForCreateProductInterface, ResponseInterface } from "src/interfaces";

@Exclude()
export class ResponseForCreateProductDto implements ResponseForCreateProductInterface {
   @Expose()
   @Transform(({ value }) => value?.trim() ? String(value) : undefined)
   id: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_name: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_type: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_brand: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_size: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_with: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_height: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_weight: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_manufacture: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_expiration: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_made_in: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_color: string;

   @Expose()
   @Transform(({ value }) => value?.trim() ? value : undefined)
   product_description: string;

   @Expose()
   @Type(() => ResponseForCreateProductDto)
   product_child?: ResponseForCreateProductDto[];
}
export class ResponseProductDto implements ResponseInterface {
   @Expose()
   status: number

   @Expose()
   message: string

   @Expose()
   data: ResponseForCreateProductDto

   @Expose()
   access_token: string;

   @Expose()
   hash: string
}