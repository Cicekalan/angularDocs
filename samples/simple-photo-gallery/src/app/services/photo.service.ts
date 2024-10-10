import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private jsonUrl = 'assets/photos.json';

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<any[]> {
    console.log(this.jsonUrl);
    return this.http.get<any[]>(this.jsonUrl);
  }
}
