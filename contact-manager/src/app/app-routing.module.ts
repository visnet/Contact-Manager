import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';


const routes: Routes = [
  { path: '', component: ContactManagerComponent }, // Default route
  { path: 'contact-form', component: ContactManagerComponent }, // Alternatively, you can still keep a separate form route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
