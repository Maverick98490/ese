import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule here
import { provideHttpClient } from '@angular/common/http';  // Provide the HTTP client

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()  // This will provide the HttpClientModule globally
  ]
}).catch(err => console.error(err));
