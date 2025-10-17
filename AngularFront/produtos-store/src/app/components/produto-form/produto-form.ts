import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.html',
  styleUrls: ['./produto-form.css'],
  imports: [FormsModule],
  standalone: true,
})
export class ProdutoForm {

  produto = {
    nome: '',
    descricao: '',
    preco: 0.0,
    quantidadeEstoque: 0,
    categoria: '',
    status: true,
    dataCadastro: new Date()
  };

  constructor(private produtoService: ProductService, private router: Router, private snackBar: MatSnackBar) { }

  salvarProduto() {
    this.produto.dataCadastro = new Date();
    this.produtoService.criarProduto(this.produto)
    .then(response => {      
        const msg = response?.message;
        this.mostrarMensagem(msg, 'success');  
        this.router.navigate(['/']);
    }).catch((error) => {
        this.mostrarMensagem(error, 'error');
    });
  }

  cancelar() {
    this.router.navigate(['/']);
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
