import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Community Stats';

  constructor() {
    console.log("Community Stats s'ha iniciat correctament!\n--Registre de jocs activat--");
  }
}