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

  onSearchChange(valor: string) {
    if (valor.length >= 3) {
      this.textCercat.emit(valor);
    } 
    else if (valor.length === 0) {
      this.textCercat.emit('');
    }
  }

  enviarCerca() {
    if (this.terminiCerca.length >= 3 || this.terminiCerca.length === 0) {
      this.textCercat.emit(this.terminiCerca);
    }
  }
}