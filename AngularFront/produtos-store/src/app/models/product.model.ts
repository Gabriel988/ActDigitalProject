export interface Product {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidadeEstoque: number;
  categoria: string;
  status: boolean;
  dataCadastro: Date;
}
