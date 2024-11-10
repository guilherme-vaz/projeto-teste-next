import { IProduct } from '@/app/interfaces/IProduct';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-recruitment.sparti.dev/', 
});

export async function getProductList(){
  return await api.get("");
}

export async function createProduct(data: IProduct) {
  try {
    // Envia os dados para a API
    const response = await api.post('https://api-recruitment.sparti.dev/', data);
    console.log('Produto criado:', response.data); // Exibe os dados retornados pela API
    return response.data; // Retorna os dados da resposta, se necessário
  } catch (error) {
    console.error('Erro ao criar produto:', error); // Exibe o erro no console
    throw error; // Lida com o erro
  }
}


export async function editProduct(id: string, data: IProduct) {
  return await api.put(`/${id}`, data);
}

export async function getOneProduct(id: string){
  return await api.get(`/${id}`);
}

export async function getProductPage(page: number, elements: number){
  return await api.get(`page/${page}/${elements}`);
}
 
