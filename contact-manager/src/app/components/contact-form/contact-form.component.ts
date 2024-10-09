import { Component, EventEmitter, Output , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService} from '../../services/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
[x: string]: any;
  contactForm: FormGroup;
  contactId: number | null = null;
  @Output() contactCreated = new EventEmitter<Contact>();

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.params['id'];
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe((contact: Contact) => {
        this.contactForm.patchValue(contact);
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      if (this.contactId) {
        this.contactService.updateContact(this.contactId, this.contactForm.value).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.contactService.createContact(this.contactForm.value).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
