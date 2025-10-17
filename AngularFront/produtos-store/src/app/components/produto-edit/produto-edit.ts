import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-edit',
  imports: [FormsModule,CommonModule],
  templateUrl: './produto-edit.html',
  styleUrl: './produto-edit.css'
})
export class ProdutoEdit {

 produto: Product ={
    id: 0,
    nome: '',
    descricao: '',
    preco: 0.0,
    quantidadeEstoque: 0,
    categoria: '',
    status: true,
    dataCadastro: new Date()

  };
  constructor(private produtoService: ProductService, 
    private router: Router, 
    private route : ActivatedRoute, 
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar) { }

  cancelar() {
    this.router.navigate(['/']);
  }

  salvarProduto() {
    var id = this.route.snapshot.paramMap.get('id');
    if (id){ 
      this.produtoService.atualizarProduto(parseInt(id),this.produto)
      .then(response=> {

        this.mostrarMensagem(response?.message, 'success');    
        this.router.navigate(['/']);

      }).catch(err => {
        this.mostrarMensagem(err, 'error');
      });
  }
  }

  carregarProduto(id: number) {
    this.produtoService.buscarProduto(id)
    .then(produto => {
      this.produto = produto;
      this.cdr.detectChanges();

    }).catch(err => {
      this.mostrarMensagem(err, 'error');
      this.cdr.detectChanges();
    });
  }


  ngOnInit() { 
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarProduto(Number(id));
    }
  
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
