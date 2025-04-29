import { Component } from '@angular/core';
import { StudentFormComponent } from './student-form/student-form.component';  // Import the student form component

@Component({
  selector: 'app-root',
  standalone: true,  // Mark AppComponent as standalone
  imports: [StudentFormComponent],  // Import the StudentFormComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
