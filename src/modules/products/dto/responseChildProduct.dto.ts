import { Exclude, Expose, Transform } from "class-transformer";
import { ResponseForCreateChildProductInterface,  } from "src/interfaces";

@Exclude()
export class ResponseForCreateChildProductDto implements ResponseForCreateChildProductInterface {
   @Expose()
   id: string;

   @Expose()
   @Transform(({ value }) => value ? value : undefined)
   product_name: string;

   @Expose()
   @Transform(({ value }) => value ? value : undefined)
   product_brand: string;
   
   @Expose()
   @Transform(({ value }) => value ? value : undefined)
   product_size: string;

   @Expose()
   @Transform(({ value }) => value ? value : undefined)
   product_with: string;

   @Expose()
   @Transform(({ value }) => value ? value : undefined)
   product_height: string;

   @Expose()
   @Transform(({ value }) => value ? value : undefined)
   product_weight: string;

   @Expose()
   @Transform(({ value }) => value ? value : undefined)
   product_manufacture: string;

   @Expose()
   @Transform(({ value }) => value ? value : undefined)
   product_expiration: string;

   @Expose()
   @Transform(({ value }) => value ? value : undefined)
   product_made_in: string;

   @Expose()
   @Transform(({ value }) => value ? value : undefined)
   product_color: string;

   @Expose()
   @Transform(({ value }) => value ? value : undefined)
   product_description: string;

   parent_id: string;
   
}