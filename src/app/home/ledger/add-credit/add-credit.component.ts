import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.scss']
})
export class AddCreditComponent {
  

debitDetailForm = new FormGroup({
    to: new FormControl('', [Validators.required]),
    narration: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    from: new FormControl('', [Validators.required]),
    transactionId: new FormControl(''),
  });

    constructor(public dialogRef:DialogRef<any>) { }
  
    ngOnInit(): void {
    }
    submitForm() {
      if(this.debitDetailForm.valid) {
        console.log(this.debitDetailForm.value);
      };
      // this.dialogRef.close(this.debitDetailForm.value)
    }
}
