import { useForm } from 'react-hook-form';
import { useProductContext } from '@/app/context/ProductContext';
import { v4 as uuidv4 } from 'uuid';
import { IFormData } from '@/app/interfaces/IFormData';


export function AddProductForm() {
    const { register, handleSubmit, reset } = useForm<IFormData>();
    const { addProduct } = useProductContext();

    const onSubmit = (data: IFormData) => {
      // Adiciona o id e a data de fabricação
      const id = uuidv4();
      data.dateManufacture = new Date().toISOString();
    
      // Mapeia a unidade de medida para um valor válido
      const unitMeasurementMap: Record<string, 'Litro' | 'Quilograma' | 'Unidade'> = {
        liter: 'Litro',
        kg: 'Quilograma',
        unit: 'Unidade',
      };
    
      const productData = {
        id,
        name: data.name,
        unitMeasurement: unitMeasurementMap[data.unitMeasurement] || 'Unidade', // Mapeia corretamente
        amount: data.amount,
        price: data.price.toString(), // Garantir que o preço seja uma string
        perishable: data.perishable,
        expirationDate: data.perishable ? data.expirationDate : undefined, // Só envia se for perecível
        dateManufacture: data.dateManufacture
      };
    
      // Chama a função para adicionar o produto
      addProduct(productData);
      reset(); // Limpa os campos do formulário
    };
    

    const onError = () => {
        // toast({
        //     title: 'Erro ao adicionar produto.',
        //     description: 'Preencha todos os campos obrigatórios',
        //     status: 'error',
        //     duration: 2000,
        //     isClosable: true,
        // });
        alert("Erro ao adicionar produto")
    };

    return (
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="w-4/5 mx-auto my-5 p-5 bg-gray-100 rounded-lg shadow-md"
        >
          <h2 className="mb-5 text-2xl font-semibold text-gray-800">Adicionar Produto</h2>
    
          <input
            {...register('name', { required: true })}
            placeholder="Nome"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            {...register('unitMeasurement', { required: true })}
            placeholder="Unidade de Medida (Litro, Quilograma, Unidade)"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            {...register('amount', { required: true })}
            placeholder="Quantidade"
            type="number"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            {...register('price', { required: true })}
            placeholder="Preço"
            type="number"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <div className="flex items-center mb-4">
            <input
              {...register('perishable')}
              type="checkbox"
              className="mr-2"
            />
            <label htmlFor="perishable" className="text-gray-700">Produto Perecível</label>
          </div>
          <input
            {...register('expirationDate')}
            placeholder="Data de Expiração"
            type="date"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            {...register('dateManufacture', { required: true })}
            placeholder="Data de Fabricação"
            type="date"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
    
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-300"
          >
            Adicionar
          </button>
        </form>
      );
};

export default AddProductForm;