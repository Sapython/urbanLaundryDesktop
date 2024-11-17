import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-agent',
  templateUrl: './delete-agent.component.html',
  styleUrls: ['./delete-agent.component.scss']
})
export class DeleteAgentComponent {
  constructor(@Inject(DIALOG_DATA) public data:any, public dialogRef: DialogRef<string>) { }

}
