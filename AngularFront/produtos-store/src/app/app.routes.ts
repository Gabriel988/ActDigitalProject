import { Routes } from '@angular/router';
import { ProdutoLista } from '../app/components/produto-lista/produto-lista';
import { ProdutoForm } from '../app/components/produto-form/produto-form';
import { ProdutoEdit } from '../app/components/produto-edit/produto-edit';

export const routes: Routes = [
  { path: '', component: ProdutoLista },
  { path: 'cadastro', component: ProdutoForm },
  { path: 'edicao/:id', component: ProdutoEdit }
];
