
export interface ProductBehavioursInterface {
   product_model: string,
   product_size: string,
   product_with: string,
   product_height: string,
   product_weight: string,
   product_manufacture_date: string,
   product_expiration_date: string,
   product_made_in: string,
   product_color: string,
   product_count: string
}

export interface CreateProductInterface {
   product_name: string,
   product_type: string,
   product_behaviours: ProductBehavioursInterface
}