import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ViewChild } from '@angular/core';
import { Toast } from '../components/toast/toast';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7082/api/product'; // URL do seu localhost para a API.NET
   
  @ViewChild('toast') toast!: Toast;

  constructor(private http: HttpClient) {}

   // GET - listar todos os produtos
  listarProdutos(): Observable<Product[]> {
      return this.http.get<Product[]>(this.apiUrl);
  }

  // GET - buscar produto por ID
  buscarProduto(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // POST - criar novo produto
  criarProduto(produto: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl+"/registerProduct", produto);
  }

  // PUT - atualizar produto existente
  atualizarProduto(id: number, produto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, produto);
  }

  // DELETE - remover produto
  deletarProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
