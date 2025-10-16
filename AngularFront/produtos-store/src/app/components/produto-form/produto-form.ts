import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ProductService } from '../../services/product.service';

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

  constructor(private produtoService: ProductService, private router: Router) { }

  salvarProduto() {
    this.produto.dataCadastro = new Date();
    this.produtoService.criarProduto(this.produto).then(() => {
      console.log('Produto salvo com sucesso!', 'success');
      this.router.navigate(['/']);
    }).catch((error) => {
      console.log(`Erro ao salvar produto: ${error.message}`, 'error');
    });
  }

  cancelar() {
    this.router.navigate(['/']);
  }

}
