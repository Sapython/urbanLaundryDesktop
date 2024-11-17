import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-assign-agent',
  templateUrl: './assign-agent.component.html',
  styleUrls: ['./assign-agent.component.scss']
})
export class AssignAgentComponent {
  constructor(@Inject(DIALOG_DATA) public data:any, public dialogRef: DialogRef<string>) { }
  selectedValue:any;
  agents:any[] = this.data.agents;

  submit(){
    this.dialogRef.close(this.selectedValue);
  }
}
