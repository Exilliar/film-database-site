import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Film } from 'src/app/models/film.model';

@Injectable({
  providedIn: 'root'
})
export class FilmDataService {

  constructor(
    private http: HttpClient,
  ) { }

  baseurl: string = "https://api.film-database.co.uk";
  // baseurl: string = "http://localhost:8081";

  getData(uid: string): Observable<Film[]> {
    const headerDict = {
      'uid': uid,
      'Access-Control-Allow-Origin': origin,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    }

    return this.http.get<Film[]>(
      this.baseurl + '/api/getData',
      requestOptions
    );
  }

  getUser(uid: string, email: string): Observable<Object> {
    const headerDict = {
      'email': email,
      'user': uid,
      'Access-Control-Allow-Origin': origin,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    }

    const url: string = this.baseurl + '/api/getUser';

    return this.http.get(url, requestOptions);
  }

  addFilm(film: string, uid: string): Observable<string> {
    const data = {
      'film': film,
      'uid': uid,
      'Access-Control-Allow-Origin': origin,
    }

    const url: string = this.baseurl + '/api/addFilm';

    return this.http.post(url, data, {responseType: 'text'});
  }

  removeFilm(filmid: number): Observable<string> {
    const data = {
      'filmid': filmid,
      'Access-Control-Allow-Origin': origin,
    }

    const url: string = this.baseurl + '/api/removeFilm';

    return this.http.post(url, data, {responseType: 'text'});
  }

  updateWatched(film: object): Observable<string> {
    const data = {
      'film': film
    }

    const url: string = this.baseurl + '/api/updateWatched';

    return this.http.post(url,data, {responseType: 'text'});
  }
}
