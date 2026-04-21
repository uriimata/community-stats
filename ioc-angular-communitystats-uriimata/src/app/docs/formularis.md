# Documentació: Formulari de Cerca Reactiu
Aquest document descriu l'estratègia de validació implementada al component `FormulariCercaComponent`.
## 1. Validadors Síncrons
Utilitzem les validacions integrades d'Angular per controlar la longitud del terme de cerca abans de consultar l'API:
- **`Validators.minLength(2)`**: Evita que es llancin cerques ineficients d'un sol caràcter.
- **`Validators.maxLength(50)`**: Limita l'entrada per evitar atacs o càrregues innecessàries de cadenes excessivament llargues.
## 2. Validador Asíncron (`codiDisponibleValidator`)
Simulem una comprovació a temps real contra l'API per verificar si el terme de cerca té possibilitat de retornar resultats.
- **Funcionament**: Utilitza l'operador `timer(500)` de RxJS per introduir un retard artificial de 500 ms, emulant la latència de la xarxa.
- **Retorn**: Si se simula que no hi ha resultats (p. ex. escrivint "buit"), retorna l'objecte d'error `{ sensResultats: true }`. Si passa la validació, retorna `null`.
## 3. Comportament del Debounce
Per evitar saturar el servidor (o el servei) amb peticions per cada pulsació de tecla:
- Ens hem subscrit als canvis de l'input mitjançant `valueChanges`.
- L'operador **`debounceTime(400)`** intercepta les pulsacions. Només deixa passar el valor si l'usuari ha deixat d'escriure durant 400 mil·lisegons.
- L'operador **`distinctUntilChanged()`** assegura que si s'esborra i es torna a escriure la mateixa lletra en aquest interval (quedant la mateixa paraula), no es dispari una nova emissió.