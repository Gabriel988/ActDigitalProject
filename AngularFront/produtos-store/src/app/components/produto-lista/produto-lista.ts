import { Component , OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-produto-lista',
  imports: [],
  templateUrl: './produto-lista.html',
  styleUrl: './produto-lista.css'
})

export class ProdutoLista implements OnInit {

  produtos: Product[] = [
    {
      id: 1,
      nome: 'Mouse Gamer RGB',
      descricao: 'Mouse ergonômico com iluminação RGB e 6 botões programáveis',
      preco: 149.90,
      quantidadeEstoque: 120,
      categoria: 'Periféricos',
      status: true
    },
    {
      id: 2,
      nome: 'Teclado Mecânico',
      descricao: 'Teclado mecânico com switches azuis, retroiluminação LED',
      preco: 299.90,
      quantidadeEstoque: 50,
      categoria: 'Periféricos',
      status: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
