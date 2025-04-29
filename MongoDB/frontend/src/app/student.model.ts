// src/app/student.model.ts

export interface Student {
    _id?: string;  // Optional property for the ID (especially if using MongoDB or another database that generates IDs automatically)
    name: string;
    prn: string;
    mobile: string;
    branch: string;
  }
  