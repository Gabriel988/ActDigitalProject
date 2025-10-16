import { Component , OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ViewChild } from '@angular/core';
import { Toast } from '../toast/toast';
import { Console } from 'console';

@Component({
  selector: 'app-produto-lista',
  imports: [CommonModule,Toast],
  templateUrl: './produto-lista.html',
  styleUrl: './produto-lista.css'
})

export class ProdutoLista implements OnInit {

   @ViewChild('toast') toast!: Toast;

  produtos: Product[] = [];

  constructor(private router: Router, private produtoService: ProductService) {

    this.carregarProdutos();

  }

  adicionarProduto() {
    this.router.navigate(['/cadastro']);
  }

  carregarProdutos() {
  this.produtoService.listarProdutos().subscribe({
    next: res => {
      this.produtos = [...res];
      this.toast.exibir('Produtos carregados com sucesso!', 'sucesso');
    },
    error: err => {
      const msg = err.error?.message || 'Erro ao carregar produtos';
      this.toast.exibir(msg, 'erro');
    }
  });
}


  deletarProduto(id: number) {
    if(confirm('Tem certeza que deseja deletar este produto?')) {
      this.produtoService.deletarProduto(id).subscribe({
        next: () => this.carregarProdutos(),
        error: err => {
          const msg = err.error?.message || 'Erro ao deletar produto';
          this.toast.exibir(msg, 'erro');
        }
      });
    }
  }

  ngOnInit(): void {
  }

}
