import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5171/api/product'; //==> localhost

  constructor() {}

  // GET - listar todos os produtos
  listarProdutos(): Promise<Product[]> {
    return this.request<Product[]>(this.apiUrl);
  }

  // GET - buscar produto por ID
  buscarProduto(id: number): Promise<Product> {
    return this.request<Product>(`${this.apiUrl}/getProduct/${id}`);
  }

  // POST - criar novo produto
  criarProduto(produto: Product): Promise<Product> {
    return this.request<Product>(`${this.apiUrl}/registerProduct`, 'POST', produto);
  }

  // PUT - atualizar produto existente
  atualizarProduto(id: number, produto: Product): Promise<Product> {
    return this.request<Product>(`${this.apiUrl}/changeProduct/${id}`, 'PUT', produto);
  }

  // DELETE - remover produto
  deletarProduto(id: number): Promise<void> {
    return this.request<void>(`${this.apiUrl}/deleteProduct/${id}`, 'DELETE');
  }

  // Função genérica de requisição
  private request<T>(url: string, method: string = 'GET', body?: any): Promise<T> {
    const options: RequestInit = {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined
    };

    return fetch(url, options).then(async res => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      // Se não houver conteúdo, retorna undefined
      if (res.status === 204) return undefined as unknown as T;
      return res.json() as Promise<T>;
    });
  }
}
