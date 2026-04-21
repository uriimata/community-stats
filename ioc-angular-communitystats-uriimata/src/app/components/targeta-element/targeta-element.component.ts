import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementCataleg } from '../../models/element.model';
import { PreferitsService } from '../../services/preferits.service';

@Component({
  selector: 'app-targeta-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './targeta-element.component.html',
  styleUrls: ['./targeta-element.component.scss']
})
export class TargetaElementComponent {
  @Input({ required: true }) element!: ElementCataleg;
  public preferitsService = inject(PreferitsService);

  togglePreferit(): void {
    const id = this.element.id;
    
    if (this.preferitsService.esPreferit(id)) {
      this.preferitsService.eliminarPreferit(id);
    } else {
      this.preferitsService.afegirPreferit(this.element);
    }
  }
}