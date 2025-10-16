import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
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
    private produtoService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  adicionarProduto(): void {
    this.router.navigate(['/cadastro']);
  }

 carregarProdutos(): void {
  this.produtoService.listarProdutos()
    .then(data => {
      this.produtos = data;
      this.cdr.detectChanges();
    })
    .catch(err => {
      this.produtos = [];
      this.cdr.detectChanges();
    });
}


  deletarProduto(produto: Product): void {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      var id = Number(produto.id);
      this.produtoService.deletarProduto(id)
      .then(data => {   
        console.log(data);
        this.carregarProdutos();

      }).catch(err => {
        console.log('Erro ao deletar produto:', err);
      });
    }
  }

  editarProduto(produto: Product) {
    this.router.navigate(['/edição']);
}

}
