import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  constructor(private produtoService: ProductService, private router: Router, private route : ActivatedRoute) { }

  cancelar() {
    this.router.navigate(['/']);
  }

  salvarProduto() {
    var id = this.route.snapshot.paramMap.get('id');
    if (id){ 
      this.produtoService.atualizarProduto(parseInt(id),this.produto).then(() => {
        this.router.navigate(['/']);
      });
  }
  }

  carregarProduto(id: number) {
    this.produtoService.buscarProduto(id).then(produto => {
      this.produto = produto;
    });
  }


  ngOnInit() { 
    const id = this.route.snapshot.paramMap.get('id');
    //console.log(id);
    if (id) {
      this.carregarProduto(Number(id));
    }
  
  }
}
