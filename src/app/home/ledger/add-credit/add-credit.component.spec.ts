import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditComponent } from './add-credit.component';

describe('AddCreditComponent', () => {
  let component: AddCreditComponent;
  let fixture: ComponentFixture<AddCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
