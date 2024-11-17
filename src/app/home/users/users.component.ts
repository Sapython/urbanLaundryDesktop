import { Component, OnInit, ViewChild } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';

import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Timestamp } from '@angular/fire/firestore';
import { DatabaseService } from 'src/services/database/database.service';
import { AlertsAndNotificationsService } from 'src/services/alerts-and-notification/alerts-and-notifications.service';
import { UserDataService } from 'src/services/user/user-data.service';
import { UserData } from 'src/structures/user.structure';

declare const UIkit: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  panelOpenState = false;
  customersList:UserData[] = [];
  areasList: any[] = [];
  AllBookings:any[] = [];
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
 
  constructor(private users:UserDataService, private database:DatabaseService, public dataProvider:DataProvider) { }
 
  
  ngOnInit(): void{
    this.customers();
    this.bookings();
    this.areas();
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

  areas(){
    this.database.getAreas().then((res) => {
      res.forEach((element: any) => {
        this.areasList.push({
          ...element.data(),
          id: element.id,
        });
        console.log(this.areasList);
      });
    });
  }

}


