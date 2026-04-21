import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementCataleg, ElementApiResponse } from '../models/element.model';
import { DADES_MOCK } from '../mocks/dades-mocks';
import { adaptarElementsApi } from '../adaptadors/element.adaptador';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private http = inject(HttpClient);

  private _elements = signal<ElementCataleg[]>([]);
  private _carregant = signal<boolean>(false);
  private _error = signal<string | null>(null);

  elements = this._elements.asReadonly();
  carregant = this._carregant.asReadonly();
  error = this._error.asReadonly();

  obtenirPopulars(): void {
    this._carregant.set(true);
    this._error.set(null);
    setTimeout(() => {
      this._elements.set(DADES_MOCK); 
      this._carregant.set(false);
    }, 500);
  }
  cercar(terme: string): void {
    if (!terme || terme.trim()==='') {
      this._elements.set(DADES_MOCK);
      return;
    }

    this._carregant.set(true);
    this._error.set(null);
    console.log('Text rebut al servei:', terme);
    const filtrats = DADES_MOCK.filter(joc => joc.nom.toLowerCase().includes(terme.toLowerCase()));
    console.log('Jocs trobats:', filtrats.length);
    this._elements.set(filtrats);
    
    this._elements.set(filtrats);
    this._carregant.set(false);
    
  }
  
}