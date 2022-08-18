import { Product } from "@/interfaces/payload/product";
import { ProductCategory } from "@/interfaces/payload/product-category";
import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import {AppState} from '../app.state';
import {productEntityAdapter, productFeatureKey, State} from './product.reducer';


export const selectProductState: MemoizedSelector<AppState, State> = createFeatureSelector(productFeatureKey);
export const {selectAll, selectEntities} = productEntityAdapter.getSelectors(selectProductState);

export const selectProductsByCategories: MemoizedSelector<AppState, ProductCategory[]> = createSelector(
  selectProductState,
  selectAll,
  (state, products) => {
    const productCategoriesMap: number[] = [];
    const productCategories: ProductCategory[] = [];

    products.forEach((product) => {
      const categoryName = product.category || '';
      const categoryId = product.categoryId || 0;
      if(productCategoriesMap.includes(categoryId)){
        const categoryIndex = productCategoriesMap.indexOf(categoryId);
        productCategories[categoryIndex].products.push(product);
      }else{
        productCategories.push({id: categoryId, name: categoryName, products: [product]});
        productCategoriesMap.push(categoryId);
      }
    });

    return productCategories;
  }
)

export const selectProductByGtin = (gtin: string) => createSelector(
  selectProductState,
  selectAll,
  (state, products) => {
    return products.find((product) => product.gtin === gtin) || null;
  }
);
