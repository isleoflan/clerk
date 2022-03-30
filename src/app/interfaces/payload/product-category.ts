import { Product } from "@/interfaces/payload/product";

export interface ProductCategory {
  id: number;
  name: string;
  products: Product[];
}
