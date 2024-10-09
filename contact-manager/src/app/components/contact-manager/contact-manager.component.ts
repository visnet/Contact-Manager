import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact';// Adjust the path as necessary

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent {
  contacts: Contact[] = [];
  
  // Method to add a new contact to the list
  addContact(contact: Contact) {
    this.contacts.push(contact);
  }
}
