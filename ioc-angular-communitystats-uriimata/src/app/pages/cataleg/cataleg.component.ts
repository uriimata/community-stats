import { Component, OnInit, inject } from '@angular/core';
import { ElementService } from '../../services/element.service';

@Component({
  selector: 'app-cataleg',
  standalone: true,
  templateUrl: './cataleg.component.html',
})
export class CatalegPage implements OnInit {
  public elementService = inject(ElementService);

  ngOnInit() {
    this.elementService.obtenirPopulars();
  }
}