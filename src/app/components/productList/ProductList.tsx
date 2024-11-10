"use client";

import { useState } from 'react';
import { IProduct } from '@/app/interfaces/IProduct';
import { useProductContext } from '@/app/context/ProductContext';
import Modal from '../modal/Modal';
import AddProductForm from '../formulario/AddProductForm';
import Link from 'next/link';

const ProductList = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const { products, loading, error } = useProductContext();

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error}</p>;

  const handleEditProduct = (product: IProduct) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleOpenModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  // const handleProductSaved = (product: IProduct) => {
  //   if (editingProduct) {
  //     // Atualiza o produto existente
  //     setProducts((prevProducts) =>
  //       prevProducts.map((p) => (p.id === product.id ? product : p))
  //     );
  //   } else {
  //     // Adiciona um novo produto
  //     setProducts((prevProducts) => [...prevProducts, product]);
  //   }
  //   handleCloseModal(); // Fecha o modal após salvar
  // };

  if (error) return <div>Erro: {error}</div>;
  if (!products.length) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Lista de Produtos:</h1>
      <Link href={"/"}>Home</Link>
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="border p-2 mb-2">
            <h2 className="font-bold">{product.name}</h2>
            <p>Preço: R${parseFloat(product.price).toFixed(2)}</p>
            <button onClick={() => handleEditProduct(product)} className="text-blue-500 underline">Editar</button>
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddProductForm />
      </Modal>
    </div>
  );
};

export default ProductList;
