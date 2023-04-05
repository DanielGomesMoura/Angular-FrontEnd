import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';


import { CoursesService } from './../services/courses.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(private FormBuilder: FormBuilder,
              private service: CoursesService,
              private snackbar: MatSnackBar){

    this.form = this.FormBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe(result => console.log(result), error => {
      this.snackbar.open("Erro ao salvar curso",'',{duration: 3000});
        });
    }

  onCancel(){

  }

}
