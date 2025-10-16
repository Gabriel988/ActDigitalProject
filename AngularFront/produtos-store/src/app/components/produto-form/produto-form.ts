import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ProductService } from '../../services/product.service';
import { ViewChild } from '@angular/core';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.html',
  styleUrls: ['./produto-form.css'],
  imports: [FormsModule,Toast]
})
export class ProdutoForm {

  @ViewChild('toast') toast!: Toast;

  produto = {
    nome: '',
    descricao: '',
    preco: 0.0,
    quantidadeEstoque: 0,
    categoria: '',
    status: true,
    dataCadastro: new Date()
  };

  constructor(private produtoService: ProductService, private router: Router) { }

  salvarProduto() {
    this.produto.dataCadastro = new Date();
    this.produtoService.criarProduto(this.produto).subscribe({
      next: () => {
        this.toast.exibir('Produto cadastrado com sucesso!', 'sucesso');
        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      error: err => {
        const msg = err.error?.message || 'Erro ao cadastrar produto';
        this.toast.exibir(msg, 'erro');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/']);
  }

}
