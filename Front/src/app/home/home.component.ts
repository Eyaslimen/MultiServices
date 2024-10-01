import { Component } from '@angular/core';
import { WelcomePageComponent } from "../welcome-page/welcome-page.component";
import { UseComponent } from "../use/use.component";
import { BestServicesComponent } from "../best-services/best-services.component";
import { BestWorkersComponent } from "../best-workers/best-workers.component";
import { TestimonialsComponent } from "../testimonials/testimonials.component";
import { ContactComponent } from "../contact/contact.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomePageComponent, UseComponent, BestServicesComponent, BestWorkersComponent, TestimonialsComponent, ContactComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
