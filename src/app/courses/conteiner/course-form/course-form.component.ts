import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/courses';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form = this.FormBuilder.group({
    _id: [''],
    name: ['',[Validators.required, Validators.minLength(5),Validators.maxLength(100)]],
    category: ['',[Validators.required]]
  });

  constructor(private FormBuilder: NonNullableFormBuilder,
              private service: CoursesService,
              private snackbar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute){


    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({_id: course._id,
                        name: course.name,
                        category: course.category})
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

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo obrigatório'
    }

    if(field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

}
