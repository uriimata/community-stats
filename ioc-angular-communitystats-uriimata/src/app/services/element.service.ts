import { Injectable, signal } from '@angular/core';
import { ElementCataleg } from '../models/element.model';
import { DADES_MOCK } from '../mocks/dades-mocks';
import { delay, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private _elements = signal<ElementCataleg[]>([]);
  private _carregant = signal<boolean>(false);
  private _error = signal<string | null>(null);

  public elements = this._elements.asReadonly();
  public carregant = this._carregant.asReadonly();
  public error = this._error.asReadonly();

  obtenirPopulars(): void {
  this._carregant.set(true);
  this._error.set(null);

  of(DADES_MOCK) 
    .pipe(
      delay(2000), 
    )
    .subscribe({
      next: (data) => {
        this._elements.set(data);
        this._carregant.set(false);
      },
      error: () => {
        this._error.set('Error al cargar los datos');
        this._carregant.set(false);
      }
    });
}

  cercar(terme: string): void {
    this._carregant.set(true);
    this._error.set(null);

    const filtrats = DADES_MOCK.filter(el => 
      el.nom.toLowerCase().includes(terme.toLowerCase())
    );

    of(filtrats)
      .pipe(delay(1000))
      .subscribe({
        next: (data) => {
          this._elements.set(data);
          this._carregant.set(false);
        }
      });
  }
}