import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/services/database/database.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  user!:any;
  constructor(private router:Router,
    private databaseService:DatabaseService
    ,
    private dataProvider:DataProvider) {
    console.log('hii')
    const userId = window.location.pathname.split('/')[3];
    this.dataProvider.pageSetting.blur= true;
    this.databaseService.getUser(userId).then((doc) => {
      this.user = { id: doc.id, ...doc.data() };
      this.dataProvider.pageSetting.blur= false;
      console.log(this.user);
    }
    );

    

   }
 
  
  ngOnInit(): void {
  }

}
