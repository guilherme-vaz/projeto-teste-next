export interface IProduct {
    name: string; 
    unitMeasurement: 'Litro' | 'Quilograma' | 'Unidade'; 
    amount: number; 
    price: string; 
    perishable: boolean; 
    expirationDate?: string; 
    dateManufacture: string; 
  }
  