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
    status: true
  };

  constructor(private produtoService: ProductService, private router: Router) { }

  salvarProduto() {
    this.produtoService.criarProduto(this.produto).subscribe(() => {
      this.toast.exibir('Produto criado com sucesso!', 'sucesso');
      this.router.navigate(['/']);
    });
  }

  cancelar() {
    this.router.navigate(['/']);
  }

}
