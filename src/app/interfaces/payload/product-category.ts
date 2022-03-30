import { Product } from "@/interfaces/payload/product";

export interface ProductCategory {
  id: string;
  name: string;
  products: Product[];
}
