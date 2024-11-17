import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/services/alerts-and-notification/alerts-and-notifications.service';
import { DatabaseService } from 'src/services/database/database.service';

import { AssignAgentComponent } from './assign-agent/assign-agent.component';
import { CancelBookingComponent } from './cancel-booking/cancel-booking.component';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {
  panelOpenState = false; 
  constructor(private databaseService:DatabaseService,private dialog:Dialog,private alertify:AlertsAndNotificationsService,private dataProvider:DataProvider) { }
  pendingPickups: any[] = [];
  agents:any[] = [];
  incompletePickups:any[] = [];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  ngOnInit(): void {
    this.getAgents()
    this.databaseService.getPickupBookings().then((data)=>{
      console.log(data.docs);
      let unfilteredData:any = data.docs.map((doc)=>{return {...doc.data(),id:doc.id}});
      // categorize pendingPickups by time.start and time.end
      this.incompletePickups = unfilteredData.filter((item:any)=>item.pickupAgentId);
      let categorizedPickups = unfilteredData.reduce((acc:any,curr:any)=>{
        let key =  this.convertDateObjectToAmPm(curr.slot.startTime.toDate()) +' '+ this.convertDateObjectToAmPm(curr.slot.endTime.toDate());
        if(!acc[key]){
          acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
      },{});
      console.log(categorizedPickups);
      this.pendingPickups = []
      for(let key in categorizedPickups){
        this.pendingPickups.push({slot:key,bookings:categorizedPickups[key]});
        console.log("pendingPickups",this.pendingPickups);
      }
      console.log("incompletePickups",this.incompletePickups);
      // group incompletePickups by pickupAgentId
      let groupedIncompletePickups = this.incompletePickups.reduce((acc:any,curr:any)=>{
        let key = curr.pickupAgentId;
        if(!acc[key]){
          acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
      },{});
      console.log("groupedIncompletePickups + 1",groupedIncompletePickups);
      // get agent name from id
      for(let key in groupedIncompletePickups){
        console.log("agent",key);
        // let agent = this.agents.find((item:any)=>item.id == key);
        let agent = this.agents.find((item:any)=>item.id );

        console.log("agent",agent);
        groupedIncompletePickups[key].agentName = agent.displayName;
        groupedIncompletePickups[key].agentImage = agent.photoURL;
        groupedIncompletePickups[key].phone = agent.phone;
      }
      console.log("groupedIncompletePickups + 2",groupedIncompletePickups);
      // this.incompletePickups = groupedIncompletePickups;
      this.incompletePickups = Object.keys(groupedIncompletePickups).map((key)=>{return {pickups:groupedIncompletePickups[key],agent:{id:key,name:groupedIncompletePickups[key].agentName,image:groupedIncompletePickups[key].agentImage,phone:groupedIncompletePickups[key].phone}}})
      console.log("incompletePickups",this.incompletePickups);
    })
  }

  getServiceNames(services:any[]){
    return services.map((item:any)=>item.name).join(', ');
  }

  getAgents(){
    this.databaseService.getAgents().then((data)=>{
      this.agents = data.docs.map((doc)=>{return {...doc.data(),id:doc.id}})
      console.log("agents",this.agents);
    }).catch((err)=>{
      console.log("err",err);
    }).finally(()=>{
      console.log("finally");
    })
  }

  seeInfo(order:any){

  }

  cancelBooking(order:any){
    const dialog = this.dialog.open(CancelBookingComponent, {data:{mode:'cancel',order:order}})
    dialog.closed.subscribe((data:any)=>{
      console.log("data",data);
      if(data.cancelled){
        this.dataProvider.pageSetting.blur = true;
        this.databaseService.cancelBooking(data.user,order.id).then((data)=>{
          this.alertify.presentToast("Booking cancelled successfully");
        }).catch((err)=>{
          this.alertify.presentToast("Booking cancellation failed");
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        })
      } else {
        this.alertify.presentToast("Booking cancellation stopped",'error');
      }
    })
  }

  assignAgent(order:any){
    console.log("order",order);
    
    const dialog = this.dialog.open(AssignAgentComponent, {data:{mode:'assign',order:order,agents:this.agents}})
    dialog.closed.subscribe((data:any)=>{
      console.log("data",data);
      this.databaseService.assignPickupAgent(data.userId,order.id).then((data)=>{
        console.log("data",data);
      })
    })
  }

  convertDateObjectToAmPm(date:Date){
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? Number('0'+minutes) : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  cropChange(text:string){
    if (text){
      return text.length > 8 ? text.substring(0,7)+'...' : text;
    } else {
      return text;
    }
    // crop text to 20 characters
  }

  openContact(){
    // window.open('tel:+919999999999');
  }

}
