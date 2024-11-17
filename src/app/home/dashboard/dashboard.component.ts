import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { DataProvider } from 'src/app/providers/data.provider';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 greet:string ="morning"
  constructor(public dataProvider:DataProvider) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    let date = new Date();
    let time = date.getHours();
    if (time >= 12 && time <= 17) {
      this.greet = 'Afternoon';
    }
    if (time >= 17 && time <= 24) {
      this.greet = 'Evening';
    }
    if (time >= 0 && time <= 12) {
      this.greet = 'Morning';
    }
    const lineChart = document.getElementById(
      'line'
      ) as HTMLCanvasElement;
      if (lineChart) {
        const Charts = new Chart(lineChart, {
          type: 'line',
          data: {
            labels: [
              'Jan',
              'Feb',
              'March',
              'Apr',
              'May',
              'June',
              
            ],
            datasets: [
              {
                label: '',
                data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
                borderColor: '#E88F9F',
                tension: 0.2,
            },
            
          ],
        },
        options: {
          
          maintainAspectRatio: false,
          plugins:{
            legend: {
              display: false
            }
           },
           scales: {
             x: {
               grid: {
                 display: false
                }
              },
              y: {
                grid: {
                  display: false
                  }
                }
              }
            }  
      });
    }
    const barChart = document.getElementById(
      'barChart'
      ) as HTMLCanvasElement;
      if (barChart) {
        const Charts = new Chart(barChart,
          {
            type: 'bar',
            data:  {
              labels: ['jan','feb','mar','apr','may','jun'],
              datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              
               x: {
                  grid: {
                    display: false
                  }
                },
                y: {
                  grid: {
                    display: false
                  }
                }
            }
          },
        }
        )
    }
  }

}
