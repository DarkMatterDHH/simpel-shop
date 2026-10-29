#Simple workshop
##Opgaven

I en gruppe af 2-3, skal I bygge en simpel webshop med følgende sider:

Forside (indeholder link til produktsiden)
Produktside, som viser en liste af produkter fra DummyJSON API’et.
Detaljeside, som viser detaljer om et enkelt produkt.
Fake betalingsside, som viser produkter lagt i kurven (baseret på URL-parametre eller Zustand store).
UX er en central del af opgaven – fokusér på brugervenlighed og visuel sammenhæng.

Læs API-dokumentationen (products), og identificér relevante endpoints til opgaven. Brug wireframes til inspiration (se nedenfor).

##Funktionalitet

Brugere kan tilføje et produkt fra produkter-siden til kurven.
Giv mulighed for at filtrere produkter på baggrund af kategorier (og evt. andre relevante ting).
Brugere kan søge efter produkter og se resultater baseret på søgningen

##Formålet med opgaven er, at I bl.a. bliver mere fortrolige med at:

Arbejde med ekstern API (endpoint, data, osv.)
Routes
State (useState / useStore – Zustand)
Evt. URL-parametre (som state)
Fetching
Event handling (filtrering og søg)

##Hints til opgaven (OBS: Kun hvis I arbejder med URL som state – altså ikke bruger Zustand)

Når I skal navigere fra kurven til betalingsiden og sender data om de valgte produkter, skal I bruge Next.js’ Link-komponent sammen med URL-parametre. Dette kan gøres ved at bygge en URL, som indeholder information om de produkter, brugeren har lagt i kurven (fx ?items=...). Denne URL kan derefter håndteres på betalingssiden, hvor I kan hente items-parametret og bruge fx ID’erne til at vise de valgte produkter.

##Eksempel:

Hvis I har flere produkter i kurven, kan URL’en til betalingssiden se sådan ud:

eksempel: <Link href={`/payment?items=...}`}>Betal nu</Link>
For at gøre dette i Next.js, kan I anvende searchParams. Læs om searchParams i Next-dokumentationen for at få en bedre forståelse af, hvordan I kan tilgå URL-parametre på betalingssiden, eller se løsningen på søg i FamilyFriends

##Husk

• Sørg for, at dataene i URL’en er struktureret, så I nemt kan tilgå navn, pris osv. på betalingssiden.

• Test URL’en for at sikre, at de korrekte data bliver overført og vist på betalingssiden

Wireframes (OBS: KUN til inspiration)
