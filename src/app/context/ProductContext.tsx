"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IProduct } from "../interfaces/IProduct";
import { getProductList, createProduct, editProduct, getProductPage, getOneProduct } from "../services/api";
import { IProductContextData } from "../interfaces/IProductContextData";

interface ProductProviderProps {
  children: ReactNode;
}

const ProductContext = createContext<IProductContextData | undefined>(
  undefined
);

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProductList();
      setProducts(response.data);
    } catch (err) {
      setError("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: IProduct) => {
    await createProduct(product);
    fetchProducts();
  };

  const editingProduct = async (id: string, product: IProduct) => {
    await editProduct(id, product);
    fetchProducts();
  };

  const gettingProductPage = async (page: number, elements: number) => {
    await getProductPage(page, elements);
    fetchProducts();
  };

  const gettingProduct = async (id: string) => {
    await getOneProduct(id);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, fetchProducts, addProduct, editingProduct, gettingProduct, gettingProductPage}}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);

  //Retirar depois
  if (!context) {
    throw new Error("Erro no Context");
  }

  return context;
};
