import { Injectable, signal, computed } from '@angular/core';
import { ElementCataleg } from '../models/element.model';

@Injectable({
  providedIn: 'root'
})
export class PreferitsService {
  private readonly STORAGE_KEY = 'preferits-cataleg';
  private _preferits = signal<ElementCataleg[]>([]);

  public preferits = this._preferits.asReadonly();
  
  public totalPreferits = computed(() => this._preferits().length);

  constructor() {
    this.carregarDeLocalStorage();
  }

  private carregarDeLocalStorage(): void {
    try {
      const dades = localStorage.getItem(this.STORAGE_KEY);
      if (dades) {
        this._preferits.set(JSON.parse(dades));
      }
    } catch (error) {
        const missatge = error instanceof Error ? error.message : 'Error desconegut';
        console.error('Error guardant a localStorage', missatge);
        }
  }

  private guardarALocalStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._preferits()));
    } catch (error) {
      console.error('Error guardant a localStorage', error);
    }
  }

  afegirPreferit(element: ElementCataleg): void {
  if (!this.esPreferit(element.id)) { 
    this._preferits.update(prev => [...prev, element]);
    this.guardarALocalStorage();
  }
}

  eliminarPreferit(id: number): void {
  this._preferits.update(prev => prev.filter(item => item.id !== id));
  this.guardarALocalStorage();
}

esPreferit(id: number): boolean {
  // Comprovem si el número existeix a la llista de preferits
  return this._preferits().some(item => item.id === id);
}
}