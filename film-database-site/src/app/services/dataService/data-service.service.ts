import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Film } from '../../models/film.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  baseurl = "https://api.film-database.co.uk";
  // baseurl = "http://localhost:8081";

  getData(): Observable<Film[]> {
    return this.http.get<Film[]>(
      this.baseurl + '/api/getData'
    );
  }

  getUser(uid) {
    const headerDict = {
      'user': uid,
      'Access-Control-Allow-Origin': origin,
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    }

    const url = this.baseurl + '/api/getUser'

    return this.http.get(url, requestOptions);
  }

  addFilm(film) {
    const data = {
      'film': film,
      'Access-Control-Allow-Origin': origin,
    }

    const url = this.baseurl + '/api/addFilm';

    return this.http.post(url, data, {responseType: 'text'});
  }

  removeFilm(filmid) {
    const data = {
      'filmid': filmid,
      'Access-Control-Allow-Origin': origin,
    };

    const url = this.baseurl + '/api/removeFilm';

    return this.http.post(url, data, {responseType: 'text'});
  }

  updateWatched(film: string) {
    const data = {
      'film': film
    };

    const url = this.baseurl + '/api/updateWatched';

    return this.http.post(url,data, {responseType: 'text'});
  }
}
