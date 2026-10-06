# Regler för IT-Nyheter

Senast uppdaterad: 2026-10-06 10:12

## 1. Olika visning för Tomas och andra användare

Appen ska se olika ut beroende på om Tomas använder appen eller om det är en annan användare.

### 1a. Tomas

Tomas ska ha alla funktioner. När appen har verifierat Tomas privata GitHub-token kan han använda **Privat visning**.

I privat visning ska Tomas kunna se och använda:
- HämtaNyheter.
- Filter för källa.
- Fullständig/original rubrik för vanliga artiklar.
- Exakt datum i formatet YYYY-MM-DD.
- Källa i nyhetsinformationen.
- Knappen **Läs originalnyheten** för vanliga artiklar.
- Privat artikelmetadata som hämtas från det privata repositoryt Data.
- Kryssrutan **Privat visning** för att växla mellan Tomas vy och den publika vyn.

När Tomas avmarkerar **Privat visning** ska han kunna kontrollera hur appen ser ut för andra användare.

### 1b. Andra användare

Andra användare ska ha en mer begränsad visning av vanliga webbartiklar av upphovsrättsskäl.

För vanliga artiklar ska andra användare:
- inte se källa,
- se en omskriven rubrik i stället för originalrubriken,
- endast se år och månad, YYYY-MM,
- inte få någon knapp eller originallänk till originalnyheten,
- se en egen omskriven ingress och artikeltext.

Den publika filen `nyheter.json` ska därför inte innehålla privat artikelmetadata som källa, exakt datum eller originallänk för vanliga artiklar.

Privat artikelmetadata ligger i `Data/Test/Nyheter/nyheter_privata.json`.

### YouTube är ett undantag

YouTube-klipp behandlas inte som vanliga webbartiklar i denna upphovsrättsregel.

För YouTube får följande vara synligt även för andra användare:
- originalrubrik,
- exakt publiceringsdatum när det är känt,
- källa YouTube,
- kanal och utgivare när de är kända,
- original-/YouTube-länk,
- inbäddad YouTube-spelare.

## 2. Rubrik, ingress och full nyhet

Ingressen ska vara cirka **100 ord** och ge en korrekt sammanfattning av det viktigaste i nyheten.

Ingressen ska prioritera:
- huvudbudskapet,
- viktiga siffror och riskbedömningar,
- vem som säger vad,
- viktiga tidsperioder,
- viktiga konsekvenser och slutsatser,
- centrala reservationer och osäkerheter.

Språket ska vara lätt att förstå. Viktig innebörd får inte tas bort bara för att texten förenklas.

### 2a. En nyhet vald via rubriklistan

När användaren väljer en bestämd nyhet i listan **Fullständig rubrik** eller **Omskriven rubrik** ska appen visa:
- rubrik,
- metadata enligt användarens behörighet,
- kategorier,
- ingress,
- hela den längre omskrivna nyhetstexten.

Ingressen visas som första fetstilade stycke. Orden "Ingress" och "Nyheten" ska inte användas som extra mellanrubriker.

### 2b. Flera nyheter samtidigt

När flera nyheter visas samtidigt ska varje vanlig artikel endast visa ingressen, inte den längre artikeltexten.

## 3. HämtaNyheter och dataflöde

Tomas skriver sina önskemål i klartext i appens privata del **HämtaNyheter**.

Önskemålen sparas i repositoryt **Data**, i:
`Data/Test/Nyheter/HamtaNyheter.json`

GPT läser önskemålen därifrån och hämtar eller bearbetar relevanta nyheter.

De publika, bearbetade nyheterna sparas i repositoryt **ChessApps-Pages**, i:
`Test/Nyheter/nyheter.json`

Appen läser sedan in nyheterna från den publika JSON-filen.

Privat metadata för vanliga artiklar sparas separat i repositoryt **Data** och ska bara läsas när Tomas är verifierad.

## 4. Upphovsrätt och omskrivning

För vanliga webbartiklar ska den publika texten skrivas med egna ord.

GPT ska:
- skriva om rubriken så att den tydligt skiljer sig från originalrubriken,
- skriva en ingress på cirka 100 ord,
- skriva en längre lättläst text som behåller den viktiga innebörden,
- behålla centrala fakta, siffror, namn, riskbedömningar, tidsperioder och slutsatser,
- undvika att kopiera längre formuleringar ordagrant från originalartikeln.

Målet är att ge en sakligt korrekt och lättläst återgivning utan att återpublicera originalartikeln.
