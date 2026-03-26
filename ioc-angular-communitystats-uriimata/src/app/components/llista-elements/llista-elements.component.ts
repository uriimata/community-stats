import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Element } from '../../models/element.model';
import { TargetaElementComponent } from '../targeta-element/targeta-element.component';

@Component({
  selector: 'app-llista-elements',
  standalone: true,
  imports: [CommonModule, TargetaElementComponent],
  templateUrl: './llista-elements.component.html',
  styleUrls: ['./llista-elements.component.scss']
})
export class LlistaElementsComponent {
  @Input() llista: Element[] = [];
  trackById(index: number, item: Element): number {
    return item.id;
  }
}
