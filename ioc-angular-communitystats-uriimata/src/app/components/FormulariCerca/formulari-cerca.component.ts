import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-formulari-cerca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulari-cerca.component.html',
  styleUrls: ['./formulari-cerca.component.scss']
})
export class FormulariCercaComponent implements OnInit {
  @Output() textCercat = new EventEmitter<string>();
  
  cercaForm: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.cercaForm = this.fb.group({
      termeCerca: ['', 
        [Validators.minLength(2), Validators.maxLength(50)],
        [this.codiDisponibleValidator()] // Validador asíncron
      ]
    });
  }

  ngOnInit(): void {
    this.cercaForm.get('termeCerca')?.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(valor => {
        const esValid = this.cercaForm.valid;
        const estaBuit = valor === '' || valor === null;
        if (valor.length >= 2 || valor === '') {
             console.log('Formulari emetent:', valor);
            this.textCercat.emit(valor); 
         }
        if (esValid || estaBuit) {
          console.log('Emitiendo desde el formulario:', valor);
          this.textCercat.emit(valor ?? ''); 
        }
      });
  }
  get termeCercaControl() {
    return this.cercaForm.get('termeCerca');
  }
  codiDisponibleValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value.length < 2) {
        return of(null);
      }

      return timer(500).pipe(
        map(() => {
          const text = control.value.toLowerCase();
          const senseResultats = text === 'error' || text === 'buit';     
          return senseResultats ? { sensResultats: true } : null;
        })
      );
    };
  }

  netejarCerca() {
    this.cercaForm.reset({ termeCerca: '' });
    this.textCercat.emit('');
  }
}