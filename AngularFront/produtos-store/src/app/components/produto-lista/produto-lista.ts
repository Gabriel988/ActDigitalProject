import { Component, OnInit , ChangeDetectorRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms'; 
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-lista',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './produto-lista.html',
  styleUrls: ['./produto-lista.css']
})
export class ProdutoLista implements OnInit {

  produtos: Product[] = [];

  searchBarText = {
    input: ''
  };

  constructor(
    private router: Router,
    private produtoService: ProductService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
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
      this.mostrarMensagem(err?.message, 'error');
      this.cdr.detectChanges();
    });
  }

  buscarProdutos(): void {
      var nome = this.searchBarText.input.trim();
      this.produtoService.listarProdutosFiltro(nome)
      .then(data => {
        this.produtos = data;
        this.cdr.detectChanges();
      }).catch(err => {
        this.mostrarMensagem(err, 'error');
        this.cdr.detectChanges();
      });   
  }

  deletarProduto(produto: Product): void {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      var id = Number(produto.id);
      this.produtoService.deletarProduto(id)
      .then(response => {      
        const msg = response?.message;
        this.mostrarMensagem(msg, 'success');
        this.carregarProdutos();

      }).catch(err => {
        this.mostrarMensagem(err, 'error');
      });
    }
  }

  editarProduto(produto: Product) {
    this.router.navigate(['/edicao', produto.id]);
  }

  mostrarMensagem(msg: string, tipo: 'success' | 'error' = 'success') {
    this.snackBar.open(msg, 'Fechar', {
    duration: 4000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    panelClass: tipo === 'success'
        ? 'snack-success'
        : tipo === 'error'
          ? 'snack-error'
          : 'snack-info'
    });
  }

}
