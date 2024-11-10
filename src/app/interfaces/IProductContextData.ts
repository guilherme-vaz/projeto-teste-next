import { IProduct } from "./IProduct";

export interface IProductContextData {
    products: IProduct[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    addProduct: (product: IProduct) => Promise<void>;
    editingProduct: (id: string, product: IProduct) => Promise<void>;
    gettingProductPage: (page: number, elements: number) => Promise<void>;
    gettingProduct: (id: string) => Promise<void>;
  }