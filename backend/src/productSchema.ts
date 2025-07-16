//Validação com Zod.
//Este arquivo define o esquema de validação do produto, utilizando zod (biblioteca). Ele protege o bd de entradas invalidas, reduz bugs.

//importa a função principal do zod, o (Z). Para descrever como os dados devem ser.
import { z } from 'zod';

//exporta e cria um esquema (antes de qualquer dado ir pro banco, ele passa por esse filtro).
export const productSchema = z.object({
  name: z.string().min(1), //deve ser uma string, com no minimo 1 caractere
  description: z.string().min(1), 
  price: z.number().positive(), //deve ser um numero positivo 
});

//cria um tipo TS com base no schema do zod para garantir que os dados estejam sicronizados com a validação
export type ProductInput = z.infer<typeof productSchema>;
