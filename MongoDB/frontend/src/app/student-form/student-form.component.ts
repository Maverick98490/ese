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
      (students: Student[]) => {
        this.students = students;
      },
      (error) => {
        console.error('Error fetching students', error);
        this.message = 'Error fetching student data!';
        this.messageType = 'error';
      }
    );
  }

  deleteStudent(id: string | undefined) {
    if (!id) {
      console.error('Invalid student ID');
      this.message = 'Invalid student ID';
      this.messageType = 'error';
      return;
    }

    this.studentService.deleteStudent(id).subscribe(
      (response: { message: string }) => {
        console.log('Student deleted successfully', response);
        this.getStudents();
        this.message = 'Student deleted successfully!';
        this.messageType = 'success';
      },
      (error) => {
        console.error('Error deleting student', error);
        this.message = 'Error deleting student.';
        this.messageType = 'error';
      }
    );
  }

  onSubmit(): void {
    if (!this.student.name || !this.student.prn || !this.student.mobile || !this.student.branch) {
      this.message = 'All fields are required!';
      this.messageType = 'error';
      return;
    }

    this.studentService.addStudent(this.student).subscribe(
      (response: Student) => {
        console.log('Student added successfully', response);
        this.getStudents();
        this.message = 'Student added successfully!';
        this.messageType = 'success';
        this.student = { name: '', prn: '', mobile: '', branch: '' };
      },
      (error) => {
        console.error('Error adding student', error);
        this.message = 'Error adding student.';
        this.messageType = 'error';
      }
    );
  }

  trackById(index: number, student: Student) {
    return student._id;
  }
}
