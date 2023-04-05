import { CoursesService } from "./../services/courses.service";
import { Course } from './../model/courses';
import { Component} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "src/app/shared/components/error-dialog/error-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent{

  courses$: Observable<Course[]>;
  displayedColumns = ['name','category','actions'];

  constructor(private CoursesService: CoursesService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute ){

    this.courses$ = this.CoursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar Cursos')
        return of([])
      })
    );
  }
  onError(errorMsg: String) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd(): void{
    this.router.navigate(['new'], {relativeTo: this.route} );
  }
}
