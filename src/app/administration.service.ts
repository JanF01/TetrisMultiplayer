import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {



  baseUrl: string = 'http://localhost/tetris/api'

  constructor(private http: HttpClient) { }


  getAbilities(): Observable<any>{
     const base = this.http.get(this.baseUrl+"/get_abilities");

     const request = base.pipe(
       map((res)=>{
           return res;
       })
     )

     return request;
  }
}
