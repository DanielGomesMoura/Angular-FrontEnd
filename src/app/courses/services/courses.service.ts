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

  loadById(id: String){
    return this.httpCliente.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>){
    if(record._id){
      return this.update(record);
    }
    else{
      return this.create(record);
    }
  }

  private create(record: Partial<Course>){
    return this.httpCliente.post<Course>(this.API,record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.httpCliente.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

   Delete(id: String){
    return this.httpCliente.delete(`${this.API}/${id}`).pipe(first());
  }
}
