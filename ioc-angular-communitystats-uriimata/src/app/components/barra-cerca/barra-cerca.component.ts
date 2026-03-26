import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-cerca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './barra-cerca.component.html',
  styleUrls: ['./barra-cerca.component.scss']
})
export class BarraCercaComponent {
  @Output() textCercat = new EventEmitter<string>();
  terminiCerca: string = '';
  enviarCerca() {
    this.textCercat.emit(this.terminiCerca);
  }
}
