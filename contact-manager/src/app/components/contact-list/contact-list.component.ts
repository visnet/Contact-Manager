import { Component, OnInit,Input } from '@angular/core';
import { ContactService} from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  //contacts: Contact[] = [];
  @Input() contacts: Contact[] = []; // Ensure this is defined as an @Input

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts(): void {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe(() => {
      this.contacts = this.contacts.filter(contact => contact.id !== id);
    });
  }
}
