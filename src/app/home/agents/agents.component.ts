import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';

import { Dialog } from '@angular/cdk/dialog';

import { ViewAgentComponent } from './view-agent/view-agent.component';
import { DeleteAgentComponent } from './delete-agent/delete-agent.component';
import { ChangeAgentComponent } from './change-agent/change-agent.component';
import { AlertsAndNotificationsService } from 'src/services/alerts-and-notification/alerts-and-notifications.service';
import { DatabaseService } from 'src/services/database/database.service';
import { UserDataService } from 'src/services/user/user-data.service';
declare const UIkit: any;
@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  type: string = 'edit';
  states: string[] = [];
  agents:any[] = [{
    displayName: 'Agent 1',
    email: ''
  },
  {
    displayName: 'Agent 2',
    email: ''
  }];
  panelOpenState = false;
  customersList: any[] = [];
  AllBookings: any[] = [];
  constructor(private users:UserDataService, private database:DatabaseService, public dataProvider:DataProvider,private dialog:Dialog,private alertService:AlertsAndNotificationsService) { }
 
  
  ngOnInit(): void{
    this.customers()
    this.bookings()
  }


   customers(){
    this.users.getAllUsers().then((res) => {
      res.forEach((element: any) => {
        this.customersList.push({
          ...element.data(),
          id: element.id,
        });
        console.log(this.customersList);
      });
    });
   }

   bookings(){
    
    this.database.bookings().then((res) => {
      res.forEach((element: any) => {
        this.AllBookings.push({
          ...element.data(),
          id: element.id,
        });
        console.log(this.bookings);
      });
    });
  }
  changeAgent(id:string){
    
    
    const dialog = this.dialog.open(ChangeAgentComponent, {data:{mode:'assign',agents:this.agents}})
    dialog.closed.subscribe((data:any)=>{
      console.log("data",data);
     
    })
  }
  deleteAgent(){
    const dialog = this.dialog.open(DeleteAgentComponent);
   
    dialog.closed.subscribe((data:any)=>{
      console.log(data);
      
    })
  }

  viewUser(id:string){
   
    const dialog = this.dialog.open(ViewAgentComponent);
   
    dialog.closed.subscribe((data:any)=>{
      console.log(data);
      
    })
  }
  validatePhotos(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      const file = files[0];
      var fileIsValid = false;
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        this.alertService.presentToast(
          'Only png, jpeg and jpg images are allowed',
          'error'
        );
      } else if (file.size >= 1_000_000) {
        this.alertService.presentToast(
          "Each image's size must be less than 1 MB",
          'error'
        );
      } else {
        fileIsValid = true;
      }
      if (!fileIsValid) {
        target.value = '';
        return;
      }
    }
  }
  async submit() {
  }

}
