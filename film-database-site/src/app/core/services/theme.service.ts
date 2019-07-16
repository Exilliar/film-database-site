import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';

@Injectable()
export class ThemeService{
  theme = localStorage.getItem("theme") === "true";

  private _darkTheme = new BehaviorSubject<boolean>(this.theme !== undefined ? this.theme : false);
  isDarkTheme = this._darkTheme.asObservable(); 

  setDarkTheme(isDarkTheme: boolean): void {
    localStorage.setItem("theme", String(isDarkTheme));
    this._darkTheme.next(isDarkTheme);
  }
}
