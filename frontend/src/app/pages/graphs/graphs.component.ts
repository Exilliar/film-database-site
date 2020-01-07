import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/auth/userService/user.service';
import { FilmDataService } from 'src/app/services/film-data/film-data.service';

import { Film } from 'src/app/models/film.model';
import { ChartData } from 'src/app/models/chartData.model';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  constructor(
    private filmDataService: FilmDataService,
    private userService: UserService,
  ) {  }

  watchedResults : ChartData[];

  allLengths : ChartData[]; // All the lengths of all the films
  lengthResults : ChartData[]; // The lengths of the films that are being show (might only be the top 10)

  limit : number = 10; // The number that the length films graph can be limited to
  lengthLimited : boolean = false; // If true then only the top 10 film lengths will be saved

  ngOnInit() {
    this.userService.getCurrentUser()
    .then((user) => {
      const uid = user.uid;
      this.filmDataService.getData(uid)
      .subscribe(res => {
        console.log(res);

        const countTrue = this.countWatched(res);
        const countFalse = res.length-countTrue;

        this.watchedResults = [
          {
            "name": "Watched",
            "value": countTrue
          },
          {
            "name": "Not Watched",
            "value": countFalse
          }
        ];

        let lengths : ChartData[] = [];

        for (let i = 0; i < res.length; i++) {
          lengths.push({
            "name": res[i].name,
            "value": res[i].length
          });
        }

        lengths = this.sortChartData(lengths);

        this.lengthResults = lengths;
        this.allLengths = lengths;
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

  sortChartData(lengths : ChartData[]) : ChartData[] {
    for (let a = 0; a < lengths.length; a++) {
      for (let b = a; b < lengths.length; b++) {
        if (lengths[a].value < lengths[b].value) {
          const placeholder : ChartData = lengths[a];
          lengths[a] = lengths[b];
          lengths[b] = placeholder;
        }
      }
    }

    return lengths;
  }

  limitLenght() : void {
    this.lengthLimited = !this.lengthLimited;

    if (this.lengthLimited) {
      this.lengthResults = [];
      for (let i = 0; i < this.limit; i++) {
        this.lengthResults.push(this.allLengths[i]);
      }
    } else {
      this.lengthResults = this.allLengths;
    }
  }
}
