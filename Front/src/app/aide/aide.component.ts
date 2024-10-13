import { Component } from '@angular/core';
import { OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-aide',
  standalone: true,
  imports: [],
  templateUrl: './aide.component.html',
  styleUrl: './aide.component.css'
})
export class AideComponent implements AfterViewInit {
 // Render2 est utilisé pour l'accés securisé au element du DOM , ElementRef est utilisé pour donner l'accés direct a un element
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const items = this.elementRef.nativeElement.querySelectorAll('.accordion button');
    items.forEach((item: Element) => this.renderer.listen(item, 'click', () => this.toggleAccordion(item)));
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