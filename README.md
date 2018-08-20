Job-OffeRz
===
Aplikacja do publikacji ofert pracy w IT. Projekt zaliczeniowy na przedmiot Aplikacje internetowe.

Wykorzystany stos technologiczny to MEAN stack:
- MongoDB
- Express.js
- Angular 4
- Node.js

Quick Start
===
Aplikacja dostępna pod adresem http://jobofferz.pl (W przypadku gdy wygaśnie domena aplikacja dostępna pod adresem https://sleepy-river-80611.herokuapp.com/).

Instalacja
---
Przed uruchomieniem należy zainstalować dependencje. Zarówno te zdefiniowane w pliku `package.json` w głównym katalogu jak i te z katalogu `job-offerz-client`:
```
npm install
```

```
cd job-offerz-client && npm install
```

Jeżeli właśnie sklonowaliśmy repozytorium należy zbudować aplikację kliencką aby serwer posiadał plik `index.html`:
```
npm run build
```

Tryb developerski
---
Aby uruchomić serwer w głównym katalogu należy wykonać polecenie:
```
npm run start-dev
```

Dzięki temu serwer aplikacji udostępniający REST API jest uruchomiony pod adresem `http://localhost:3000`.

Aby uruchomić aplikację kliencką (Angular) należy wykonać następujące polecenie:
```
cd job-offerz-client && npm run start
```

Aplikacja kliencka natomiast widoczna jest pod adresem `http://localhost:4200` i wykorzystuje `WDS` dzięki czemu możemy "na żywo" pracować nad kodem aplikacji.

Tryb produkcyjny
---
Przed uruchomieniem aplikacji należy upewnić się że w katalogu `job-offerz-server/public` znajduje się zbudowana aplikacja Angular. W przeciwnym wypadku w głównym katalogu gdzie znajduje się repozytorium wykonujemy komende.
```
npm run build
```
Następnie uruchamiamy serwer aplikacji za pomocą komendy
```
npm run start
```
Aplikacja w trybie produkcyjnym dostpęna jest pod adresem `http://localhost:3000`. Numer portu może być zdefiniowany za pomocą zmiennej środowiskowej `PORT`. Gdy zmienna nie istnieje to domyślnie aplikacja uruchamia się na porcie `3000`. W tym trybie aplikacja wykorzystuje bazę na zewnętrznym serwerze `mLab`. W trybie produkcyjnym zarówno aplikacja kliencka jak i REST API wystawione są na tym samym porcie.
