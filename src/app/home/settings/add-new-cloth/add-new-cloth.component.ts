import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-new-cloth',
  templateUrl: './add-new-cloth.component.html',
  styleUrls: ['./add-new-cloth.component.scss']
})
export class AddNewClothComponent {
  constructor(public dialogRef: DialogRef<AddNewClothComponent>,@Inject(DIALOG_DATA) public title: string){}
  clothForm:FormGroup = new FormGroup({
    name: new FormControl(''),
  })
}
