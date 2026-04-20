import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraCercaComponent } from './components/barra-cerca/barra-cerca.component';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';
import { ElementService } from './services/element.service';

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
export class AppComponent implements OnInit {
  title = 'Community Stats';

  public elementService = inject(ElementService);

  ngOnInit() {
    this.elementService.obtenirPopulars();
  }

  filtrar(textBusqueda: string) {
    this.elementService.cercar(textBusqueda);
  }
}