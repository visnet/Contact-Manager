import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService} from '../../services/contact.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact | undefined;

  constructor(private route: ActivatedRoute, private contactService: ContactService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.contactService.getContact(id).subscribe((data: Contact) => {
      this.contact = data;
    });
  }
}
