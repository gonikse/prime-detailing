# PRIME DETAILING — strona demonstracyjna

Responsywna strona typu landing page dla studia detailingu samochodowego. Projekt zbudowany w **HTML, CSS i JavaScript**, bez frameworków i bez konieczności instalacji Node.js.

## Co działa?

- Sticky navbar z mobilnym menu hamburger i oznaczaniem aktywnej sekcji.
- HERO z Twoim zdjęciem Porsche, bocznymi statystykami i linkami społecznościowymi.
- Cztery karty usług.
- Trzy pakiety z przykładowymi cenami; kliknięcie „Wybierz pakiet” ustawia wybór w formularzu i przenosi do sekcji kontaktowej.
- Suwak „przed i po” ze sterowaniem myszą, dotykiem lub klawiaturą.
- Galeria z czterema kadrami z przesłanej fotografii; powiększanie i strzałki w galerii oraz Escape, by zamknąć.
- Formularz z walidacją HTML5, dwoma metodami wysyłki do skonfigurowania i uczciwym trybem demonstracyjnym.
- Animacje przewijania, responsywne sekcje, obsługa preferencji ograniczonych animacji.
- Pliki gotowe do publikacji na GitHub Pages.

## Uruchomienie

1. Rozpakuj `prime-detailing.zip` do folderu `prime-detailing`.
2. Otwórz folder w **Visual Studio Code**.
3. Otwórz `index.html` w przeglądarce albo zainstaluj rozszerzenie **Live Server** i wybierz „Open with Live Server”.
4. Aby testować formularz z serwisem Formspree, używaj Live Server lub normalnego hostingu, a nie `file://`.

## Jak włączyć prawdziwą wysyłkę formularza?

Na początku `script.js` ustaw **jedną** z dwóch opcji:

**Opcja A — e-mail użytkownika:**

```js
const CONTACT_EMAIL = "kontakt@twojafirma.pl";
const FORM_ENDPOINT = "";
```

Kliknięcie przycisku otwiera program pocztowy odwiedzającego z gotową wiadomością. To **nie jest automatyczne przesłanie wiadomości** — użytkownik musi kliknąć Wyślij w programie e-mail.

**Opcja B — formularz online przez Formspree:**

1. Zarejestruj formularz na <https://formspree.io/>.
2. Zweryfikuj adres odbiorcy zgodnie z instrukcją serwisu.
3. Skopiuj endpoint swojego formularza, np. `https://formspree.io/f/XXXXXXXX`.
4. W `script.js` ustaw:

```js
const CONTACT_EMAIL = "";
const FORM_ENDPOINT = "https://formspree.io/f/XXXXXXXX";
```

Ta opcja wysyła żądanie z przeglądarki bez własnego backendu. Zadbaj przed publikacją o politykę prywatności, podstawę przetwarzania danych i ochronę przed spamem zgodnie z rzeczywistą działalnością i konfiguracją dostawcy. Nie umieszczaj w JavaScript prywatnych kluczy API ani haseł.

**Tryb demo:** jeśli obie wartości są puste, formularz **niczego nie wysyła**, lecz pokazuje wiadomość do skopiowania. Nic nie jest zapisywane przez tę stronę na serwerze.

## Co zmienić przed udostępnieniem klientowi?

- `index.html`: zastąp nazwę „PRIME DETAILING” prawdziwą nazwą firmy i zmień opisy.
- `index.html`: zmień **przykładowe ceny**, zakres pakietów i wszelkie deklaracje marketingowe na prawdziwe dane.
- `index.html`: zamień linki Instagram / Facebook / TikTok kierujące obecnie do stron głównych serwisów na **profile firmy**.
- `assets/`: podmień zdjęcie HERO i kadry galerii na materiały, do których masz prawa.
- `index.html` / `assets/`: podmień wizualizację suwaka na **prawdziwe** zdjęcia przed i po (na ten moment są to dwa wizualne warianty tego samego zdjęcia). Bez autentycznych zdjęć nie przedstawiaj dema jako efektu zabiegu.
- `script.js`: skonfiguruj formularz jedną z powyższych metod.
- `index.html`: uzupełnij wymagane dla firmy informacje o ochronie danych i ewentualne dane kontaktowe.

## Publikacja na GitHub Pages

1. Zaloguj się na <https://github.com/> i utwórz nowe **publiczne** repozytorium, np. `prime-detailing`.
2. Prześlij do repozytorium **zawartość folderu** `prime-detailing` (tak, aby `index.html` był bezpośrednio w katalogu głównym repozytorium), a nie ZIP.
3. Otwórz `Settings` → `Pages`.
4. W `Build and deployment` wybierz `Source` → `Deploy from a branch`.
5. Wybierz `Branch` → `main`, folder `/(root)`, następnie kliknij `Save`.
6. Po zakończeniu publikacji adres zwykle wygląda tak:

   `https://TWOJ-LOGIN.github.io/prime-detailing/`

Oficjalna instrukcja GitHub: <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>

## Struktura projektu

```text
prime-detailing/
├── index.html
├── style.css
├── script.js
├── README.md
├── .nojekyll
└── assets/
    ├── hero.jpg
    ├── gallery-01.webp
    ├── gallery-02.webp
    ├── gallery-03.webp
    ├── gallery-04.webp
    └── favicon.svg
```

**Uwaga:** Wszystkie kadry galerii zostały przycięte z jednej fotografii przesłanej do projektu. Projekt prezentuje wygląd i interakcje, nie dokumentuje rzeczywistych usług ani wykonanych realizacji.