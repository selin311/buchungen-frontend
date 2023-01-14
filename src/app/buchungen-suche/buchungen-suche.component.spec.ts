import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuchungenSucheComponent } from './buchungen-suche.component';

describe('BuchungenSucheComponent', () => {
  let component: BuchungenSucheComponent;
  let fixture: ComponentFixture<BuchungenSucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuchungenSucheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuchungenSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
