export interface IFormData {
    name: string;
    unitMeasurement: 'kg' | 'liter' | 'unit'; // Ajuste as opções para corresponder à API
    amount: number;
    price: string; // A API espera que o preço seja uma string
    perishable: boolean;
    expirationDate?: string; // Campo opcional, só será enviado se for perecível
    dateManufacture: string;
  }
  