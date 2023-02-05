import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuchungenDialogComponent } from './buchungen-dialog.component';

describe('BuchungenDialogComponent', () => {
  let component: BuchungenDialogComponent;
  let fixture: ComponentFixture<BuchungenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuchungenDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuchungenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
