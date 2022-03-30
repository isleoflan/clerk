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
    const productCategoriesMap: string[] = [];
    const productCategories: ProductCategory[] = [];

    products.forEach((product) => {
      const category = product.category || '';
      if(productCategoriesMap.includes(category)){
        const categoryIndex = productCategoriesMap.indexOf(category);
        productCategories[categoryIndex].products.push(product);
      }else{
        productCategories.push({id: category, name: category, products: [product]});
        productCategoriesMap.push(category);
      }
    });

    return productCategories;
  }
)
