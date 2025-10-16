import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoEdit } from './produto-edit';

describe('ProdutoEdit', () => {
  let component: ProdutoEdit;
  let fixture: ComponentFixture<ProdutoEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
