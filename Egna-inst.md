Projektstruktur:

Skapa en mapp för projektet.
Inuti mappen, skapa följande:
En src-mapp för din Typescript-kod.
En dist-mapp där kompilerad kod hamnar.
En tsconfig.json-fil för att konfigurera Typescript.
Installera Typescript:

Kör: npm init -y för att skapa en package.json.
Installera Typescript: npm install typescript --save-dev.
Konfigurera Typescript:

Lägg till en tsconfig.json i roten med exempelvis följande innehåll:
json

{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}
Skapa API-anrop:

Skapa en fil i src, t.ex. api.ts, som hämtar data från API:et.
Definiera en typ eller ett interface för bokdata. Exempel:
typescript
Kopiera kod
export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}
Hämta och Visa Böcker:

I din huvudfil, t.ex. index.ts:
Importera API-anropet och typen.
Hämta böcker från API:et.
Visa böckerna i en lista på en HTML-sida.
Detaljvy för Böcker:

Lägg till en klickhändelse på varje bok i listan.
Vid klick, visa detaljer om boken (t.ex. titel, författare, beskrivning) på sidan.
Lägg till en Sökfunktion:

Lägg till ett inputfält för att söka på en boktitel.
Filtrera och visa böcker baserat på användarens inmatning.
Dela upp Kod i Moduler:

Flytta:
API-logik till en fil, t.ex. api.ts.
Interface till en fil, t.ex. types.ts.
Rendering till en fil, t.ex. ui.ts.
Bygg och Kör Projektet:

Bygg projektet med: npx tsc.
Öppna den kompilerade HTML-filen i en webbläsare.
Validera Kraven:

Kontrollera att:
Alla funktioner fungerar.
Kod är skriven i Typescript.
Du använder statiska typer och interface.
Testa och Leverera:

Testa att listan, detaljvyn och sökfunktionen fungerar.
Leverera projektet som en färdig zip-fil eller genom en länk till en Git-repo.