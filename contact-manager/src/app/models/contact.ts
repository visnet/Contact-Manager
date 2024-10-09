// src/app/models/contact.model.ts

export interface Contact {
    id: number;             // Auto-incrementing integer
    firstName: string;       // First name, required
    lastName: string;        // Last name, required
    email: string;           // Email, required, must be a valid email format
  }
  