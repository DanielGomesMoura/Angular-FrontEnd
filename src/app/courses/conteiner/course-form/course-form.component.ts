import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form = this.FormBuilder.group({
    name: [''],
    category: ['']
  });

  constructor(private FormBuilder: NonNullableFormBuilder,
              private service: CoursesService,
              private snackbar: MatSnackBar,
              private location: Location){

  }


  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());

    }

    onSuccess(){
      this.snackbar.open("Curso salvo com sucesso!",'',{duration: 3000});
      this.onCancel();
    }

    onError(){
      this.snackbar.open("Erro ao salvar curso",'',{duration: 3000});
    }

  onCancel(){
    this.location.back();
  }

}
