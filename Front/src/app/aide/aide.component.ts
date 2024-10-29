import { Component } from '@angular/core';
import { OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-aide',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './aide.component.html',
  styleUrl: './aide.component.css'
})
export class AideComponent implements AfterViewInit {
 // Render2 est utilisé pour l'accés securisé au element du DOM , ElementRef est utilisé pour donner l'accés direct a un element
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  // ngAfterViewInit est un hook du cycle de vie d'Angular qui est appelé après l'initialisation de la vue du composant. Cela signifie qu'une fois que le DOM est prêt et que les éléments sont disponibles, cette méthode est appelée
  ngAfterViewInit() {
    const items = this.elementRef.nativeElement.querySelectorAll('.accordion button'); // récupere tt les buttons 
    items.forEach((item: Element) => this.renderer.listen(item, 'click', () => this.toggleAccordion(item))); // une fois un des button est cliqué , il appelle la methode toggleAccordion
  }

  toggleAccordion(item: Element) {
    const itemToggle = item.getAttribute('aria-expanded');
    const items = this.elementRef.nativeElement.querySelectorAll('.accordion button');
    items.forEach((item: { setAttribute: (arg0: string, arg1: string) => any; }) => item.setAttribute('aria-expanded', 'false'));
    if (itemToggle === 'false') {
      item.setAttribute('aria-expanded', 'true');
    }
  }
}