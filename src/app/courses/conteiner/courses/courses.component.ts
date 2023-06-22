import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../../model/courses';
import { CoursesService } from './../../services/courses.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent{

  courses$: Observable<Course[]> | null = null;

  constructor(private CoursesService: CoursesService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private snackbar: MatSnackBar ){

   this.reload();
  }

  onError(errorMsg: String) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  reload(){
    this.courses$ = this.CoursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar Cursos')
        return of([])
      })
    );
  }

  onAdd(): void{
    this.router.navigate(['new'], {relativeTo: this.route} );
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course._id], {relativeTo: this.route} );
  }

  onDelete(course: Course){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover este curso?",
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.CoursesService.Delete(course._id).subscribe(
          () => {
            this.reload();
            this.snackbar.open("Curso removido com sucesso",'x',{
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Erro ao tentar remover o curso')
        );
      }
    });
  }
}
