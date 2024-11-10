"use client"
import Link from 'next/link';
import ProductForm from './components/formulario/AddProductForm';
import { useState } from 'react';
import { IProduct } from '@/app/interfaces/IProduct';
import Modal from './components/modal/Modal';

export default function Page() {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Link href="/productList" className="text-blue-500 underline mb-4">
        Ir para a Lista de Produtos
      </Link>
      <button onClick={() => setModalOpen(true)} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Cadastrar Produto
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProductForm />
      </Modal>
    </div>
  );
}
