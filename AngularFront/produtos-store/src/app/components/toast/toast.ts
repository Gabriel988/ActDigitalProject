import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  template: './toast.html',
  styleUrl: './toast.css',
  imports: [CommonModule] 
})
export class Toast {
  mostrar: boolean = false;
  mensagem: string = '';
  tipo: 'erro' | 'sucesso' = 'erro';

  exibir(mensagem: string, tipo: 'erro' | 'sucesso' = 'erro', duracao: number = 3000) {
    this.mensagem = mensagem;
    this.tipo = tipo;
    this.mostrar = true;
    setTimeout(() => this.mostrar = false, duracao);
  }
}