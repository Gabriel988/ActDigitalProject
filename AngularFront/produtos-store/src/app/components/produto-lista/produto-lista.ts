import { Component , OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ViewChild } from '@angular/core';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-produto-lista',
  imports: [CommonModule,Toast],
  templateUrl: './produto-lista.html',
  styleUrl: './produto-lista.css'
})

export class ProdutoLista implements OnInit {

   @ViewChild('toast') toast!: Toast;

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

  constructor(private router: Router, private produtoService: ProductService) {

    this.carregarProdutos();

  }

  adicionarProduto() {
    this.router.navigate(['/cadastro']);
  }

  carregarProdutos() {
    this.produtoService.listarProdutos().subscribe(res => this.produtos = res);
  }

  deletarProduto(id: number) {
    if(confirm('Tem certeza que deseja deletar este produto?')) {
      this.produtoService.deletarProduto(id).subscribe(() => this.carregarProdutos());
    }
  }

  ngOnInit(): void {
  }

}
