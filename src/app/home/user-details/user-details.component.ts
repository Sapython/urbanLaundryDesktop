import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/services/database/database.service';
import { UserDataService } from 'src/services/user/user-data.service';
import { UserData } from 'src/structures/user.structure';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  panelOpenState = false;
  customersList:UserData[] = [];
  AllBookings:any[] = [];
  userId:any = this.activatedRoute.snapshot.params['id'];
  userData:any;
  
 
  constructor(private users:UserDataService, private database:DatabaseService, public dataProvider:DataProvider, private activatedRoute:ActivatedRoute) { }
 
  
  ngOnInit(): void{

    this.bookings();
    this.user();
  }

  user(){
    this.users.getUser(this.userId).then((res) => {
      console.log(res.data());
      this.userData = res.data();
    })
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

  
}
