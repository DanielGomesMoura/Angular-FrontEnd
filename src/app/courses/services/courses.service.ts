import { first, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Course } from './../model/courses';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpCliente: HttpClient) { }

  list(){
    return this.httpCliente.get<Course[]>(this.API)
    .pipe(
      first(),
     // delay(5000),
      tap(Course => console.log(Course))
    );
  }

  save(record: Partial<Course>){
    return this.httpCliente.post<Course>(this.API,record);
  }}
