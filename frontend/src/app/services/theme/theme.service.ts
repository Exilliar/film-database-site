import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ThemeService{
  theme: boolean = localStorage.getItem("theme") === "true";

  private _darkTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.theme !== undefined ? this.theme : false);
  isDarkTheme: Observable<boolean> = this._darkTheme.asObservable();

  setDarkTheme(isDarkTheme: boolean): void {
    localStorage.setItem("theme", String(isDarkTheme));
    this._darkTheme.next(isDarkTheme);
  }
}
