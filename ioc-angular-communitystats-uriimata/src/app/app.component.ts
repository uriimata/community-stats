import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Element } from './models/element.model';
import { DADES_MOCK } from './mocks/dades-mocks';
import { BarraCercaComponent } from './components/barra-cerca/barra-cerca.component';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    BarraCercaComponent,
    LlistaElementsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Community Stats';
  elements: Element[] = DADES_MOCK;
  elementsFiltrats: Element[] = DADES_MOCK;
  constructor() {
    console.log("Community Stats s'ha inciat correctament!");
  }

  filtrarElements(textBusqueda: string) {
    if (!textBusqueda) {
      this.elementsFiltrats = this.elements;
    } else {
      this.elementsFiltrats = this.elements.filter(el => 
        el.nom.toLowerCase().includes(textBusqueda.toLowerCase())
      );
    }
  }
}