import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/services/database/database.service';
import { Bookings } from 'src/structures/booking.structure';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss']
})
export class InProgressComponent implements OnInit {
  panelOpenState = false;
  AllBookings:any[] = [];
  constructor(private database:DatabaseService) { }

  ngOnInit(): void {
    this.bookings();
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
