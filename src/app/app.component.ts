import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student } from './student/student';
import { StudentService } from './student/student.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public students: Student[];
  public deleteStudent: Student;
  public editStudent: Student;

  constructor(private studentService: StudentService){}

  ngOnInit(): void {
    this.getStudents();
  }

  public getStudents(): void {
    this.studentService.getStudents().subscribe(
      (response: Student[]) => {
        this.students = response;
      },
      (error: HttpErrorResponse) => {

      }      
    );
  }

  public onAddStudent(addForm: NgForm): void {
    document.getElementById('add-student-form')?.click();
    
    this.studentService.addStudent(addForm.value).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
      },
  
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onDeleteStudent(studentId: number): void {
    document.getElementById('delete-student-form')?.click(); 
    
    this.studentService.deleteStudent(studentId).subscribe(
      (response: void) => {
        console.log(response);
        this.getStudents();
      },
  
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onUpdateStudent(editForm: NgForm): void {
    console.log("ok");
    
    document.getElementById('update-student-form')?.click();
    
    this.studentService.updateStudent(editForm.value).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
      },
  
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onOpenModal(student: Student, mode: String): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if(mode == 'add') {
      button.setAttribute('data-bs-target', '#addStudentModal');
    }
    
    if(mode == 'delete') {
      this.deleteStudent = student;
      button.setAttribute('data-bs-target', '#deleteStudentModal');
    }

    if(mode == 'edit') {
      this.editStudent = student;
      button.setAttribute('data-bs-target', '#updateStudentModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
