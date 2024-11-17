import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';


@Component({
  selector: 'app-change-agent',
  templateUrl: './change-agent.component.html',
  styleUrls: ['./change-agent.component.scss']
})
export class ChangeAgentComponent {
  constructor(@Inject(DIALOG_DATA) public data:any, public dialogRef: DialogRef<string>) { }
  selectedValue:any;
  agents:any[] = this.data.agents;

  submit(){
    this.dialogRef.close(this.selectedValue);
  }
}
