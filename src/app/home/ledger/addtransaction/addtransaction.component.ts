import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addtransaction',
  templateUrl: './addtransaction.component.html',
  styleUrls: ['./addtransaction.component.scss']
})
export class AddtransactionComponent {


  transactionDetailForm = new FormGroup({
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
      if(this.transactionDetailForm.valid) {
        this.dialogRef.close(this.transactionDetailForm.value)
      };
    }
}
