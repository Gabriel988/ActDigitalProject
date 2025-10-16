import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.html',
  styleUrls: ['./produto-form.css'],
  imports: [FormsModule]
})
export class ProdutoForm {

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
      alert('Produto cadastrado com sucesso!');
      this.router.navigate(['/']);
    });
  }

  cancelar() {
    this.router.navigate(['/']);
  }

}
