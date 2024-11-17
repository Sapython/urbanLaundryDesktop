import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewClothComponent } from './add-new-cloth.component';

describe('AddNewClothComponent', () => {
  let component: AddNewClothComponent;
  let fixture: ComponentFixture<AddNewClothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewClothComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewClothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
