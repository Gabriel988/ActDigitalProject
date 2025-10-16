import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrls: ['./toast.css'],
  imports: [CommonModule]
})
export class Toast {

  @Input() mensagem: string = '';
  @Input() tipo: 'erro' | 'sucesso' = 'erro';

  mostrar: boolean = false;

  exibir(mensagem: string, tipo: 'erro' | 'sucesso' = 'erro', duracao: number = 3000) {
    this.mensagem = mensagem;
    this.tipo = tipo;
    this.mostrar = true;

    setTimeout(() => this.mostrar = false, duracao);
  }

}
