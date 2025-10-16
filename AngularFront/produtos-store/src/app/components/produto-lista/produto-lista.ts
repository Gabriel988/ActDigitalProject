import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-produto-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto-lista.html',
  styleUrls: ['./produto-lista.css']
})
export class ProdutoLista implements OnInit {

  produtos: Product[] = [];

  constructor(
    private router: Router,
    private produtoService: ProductService
  ) {this.carregarProdutos();}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  adicionarProduto(): void {
    this.router.navigate(['/cadastro']);
  }

 async carregarProdutos() {
  try {
    this.produtos = await this.produtoService.listarProdutos()
      .catch(err => {
        console.error('Erro na promise listarProdutos:', err);
        return [];
      });

    console.log('Produtos carregados:', this.produtos);
  } catch (err) {
    console.error('Erro ao carregar produtos:', err);
    this.produtos = [];
  }
}


  deletarProduto(id: number): void {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.produtoService.deletarProduto(id).then(() => {
        this.carregarProdutos();         
      });
    }
  }
}
