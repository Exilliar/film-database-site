import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/auth/userService/user.service';
import { FilmDataService } from 'src/app/services/film-data/film-data.service';

import { Film } from 'src/app/models/film.model';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  testData : Object;

  constructor(
    private filmDataService: FilmDataService,
    private userService: UserService,
  ) {
    this.testData = {
      chart: { },
      data: [
        { value: 500 },
        { value: 600 },
        { value: 700 }
      ]
    };
   }

  watchedResults : any[];

  // data: Film[];

  ngOnInit() {
    this.userService.getCurrentUser()
    .then((user) => {
      const uid = user.uid;
      this.filmDataService.getData(uid)
      .subscribe(res => {
        console.log(res);
        const countTrue = this.countWatched(res);
        const countFalse = res.length-countTrue;

        this.testData['data'] = [
          { value: countTrue },
          { value: countFalse }
        ];

        this.watchedResults = [
          {
            "name": "Watched",
            "value": countTrue
          },
          {
            "name": "Not Watched",
            "value": countFalse
          }
        ]
      }, err => {
        console.log(err);
      })
    })
  }

  countWatched(data : Film[]) : number {
    let count = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].watched === true) count++;
    }

    return count;
  }

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Color Value';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  multi: any[] = [
    {
      name: 'Cyan',
      series: [
        {
          name: 5,
          value: 2650
        },
        {
          name: 10,
          value: 2800      },
        {
          name: 15,
          value: 2000
        }
      ]
    },
    {
      name: 'Yellow',
      series: [
        {
          name: 5,
          value: 2500
        },
        {
          name: 10,
          value: 3100
        },
        {
          name: 15,
          value: 2350
        }
      ]
    }
  ];
}
