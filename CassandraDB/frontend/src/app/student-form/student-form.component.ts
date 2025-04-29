import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  imports: [FormsModule, CommonModule],
})
export class StudentFormComponent implements OnInit {
  student: Student = {
    name: '',
    prn: '',
    mobile: '',
    branch: ''
  };

  students: Student[] = [];
  message: string = '';
  messageType: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe(
      (response: any) => {
        console.log("Backend Response = ", response); 
        this.students = response;  // <-- Direct assign response
      },
      (error) => {
        console.error('Error fetching students', error);
        this.message = 'Error fetching student data!';
        this.messageType = 'error';
      }
    );
  }
  
  
  

  onSubmit(): void {
    this.studentService.addStudent(this.student).subscribe(
      (response) => {
        console.log('Student added successfully', response);
        this.getStudents();
        this.message = 'Student added successfully!';
        this.messageType = 'success';
        this.student = { name: '', prn: '', mobile: '', branch: '' };
      },
      (error) => {
        console.error('There was an error adding the student', error);
        this.message = 'There was an error adding the student.';
        this.messageType = 'error';
      }
    );
  }

  deleteStudent(prn: string) {
    if (!prn) {
      console.error('Invalid student PRN');
      return;
    }
  
    this.studentService.deleteStudent(prn).subscribe(
      () => {
        this.message = 'Student deleted successfully!';
        this.messageType = 'success';
        this.getStudents(); // Refresh after delete
      },
      (error) => {
        console.error('Error deleting student', error);
        this.message = 'Error deleting student!';
        this.messageType = 'error';
      }
    );
  }
  
  
}
