import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'film-database-site';

  data = [{name:'film 1',length:100,watched:'true'},
          {name:'film 2',length:100,watched:'true'},
          {name:'film 3',length:100,watched:'true'},
          {name:'film 4',length:100,watched:'true'},
          {name:'film 5',length:100,watched:'true'},
          {name:'film 6',length:100,watched:'true'}]
}
