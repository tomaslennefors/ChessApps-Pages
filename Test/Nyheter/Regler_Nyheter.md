# Regler för IT-Nyheter

Senast uppdaterad: 2026-10-07 01:07

## 1. Olika visning för Tomas och andra användare

Appen ska se olika ut beroende på om Tomas använder appen eller om det är en annan användare.

Knappen **Regler** är privat och ska endast vara synlig för Tomas när **Privat visning** är aktiverad. När Tomas avmarkerar Privat visning ska även Regler-knappen döljas, så att den publika förhandsvisningen motsvarar vad andra användare ser.

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
- Knappen **Regler** och innehållet i `Regler_Nyheter.md`. Denna knapp ska endast visas för Tomas när den privata GitHub-token har verifierats **och Privat visning är aktiverad**.

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


## 2c. Beständiga AI-sammanställningar

Följande typer av innehåll är beständiga sammanställningar och inte vanliga datumstyrda nyheter:
- **!IT-året ...**
- **!AI-historik ...**
- **!AI-begrepp ...**

Regler:
- både den publika rubriken `titel` och den privata fullständiga rubriken `fullständig_rubrik` ska alltid börja med tecknet **!**,
- dessa poster ska alltid tillhöra kategorin **!AI-sammanställningar**,
- tecknet **!** markerar att innehållet är en beständig referens/sammanställning och inte hårt knutet till ett enskilt publiceringsdatum.

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

## 5. Appens visning, storleksändring och lokal lagring

### 5a. Statistik för markerad text

När användaren markerar text i en detaljerad nyhetsartikel ska appen visa statistik för:
- ingressens antal ord och bokstäver,
- artikelns antal ord och bokstäver,
- den markerade textens antal ord och bokstäver.

Statistiken visas i en flytande textruta **ovanför artikelns rubrik**. Rutan ska följa med vid rullning i den detaljerade nyhetsrutan så att statistiken förblir synlig.

### 5b. Storleken på den detaljerade nyhetsrutan

Den stora nyhetsrutan som visar både ingress och den fullständiga detaljerade nyhetstexten ska kunna ändras i höjd genom att användaren drar i rutans nederkant.

Detta ska fungera:
- med mus på dator,
- med pekning/touch på mobil och surfplatta.

Användaren ska kunna göra rutan högre för att se fler rader samtidigt eller lägre för att spara skärmutrymme.

Den senast valda höjden sparas lokalt i den aktuella webbläsaren.

### 5c. Publik nyhetsfil, lokala inställningar och privat ägardel

- Nyhetsfilen ligger publikt tillsammans med appen på GitHub Pages.
- Filter, sorteringsordning, favoriter och arkivering sparas bara lokalt i respektive webbläsare.
- Ägardelen **HämtaNyheter** visas endast för en webbläsare vars GitHub-token har åtkomst till det privata Data-repot.

Dessa uppgifter ska finnas i regeldokumentet men **inte visas som en förklarande text längst ner under nyheterna i appen**.

## 6. AI-sammanställningar och appbeteende

### 6a. Kategorin för beständiga AI-sammanställningar

Kategorin ska heta **!AI-sammanställningar**. Utropstecknet markerar att innehållet är en beständig sammanställning och inte en vanlig tidsbunden nyhetsartikel.

Följande sammanställningar ska tillhöra kategorin **!AI-sammanställningar**:
- **!IT-året ...**
- **!AI-historik ...**
- **!AI-begrepp ...**
- **!AI och schack ...**
- **!AI-bolag och AI-modeller ...**

### 6b. Utbrytningar från !AI-historik

Detaljerad information om AI och schack ska ligga i den separata artikeln **!AI och schack**.

Detaljerad information om AI-bolag, deras modellfamiljer och verktyg ska ligga i den separata artikeln **!AI-bolag och AI-modeller**.

I **!AI-historik** ska däremot korta årtalsnotiser finnas kvar så att den historiska tidslinjen fortfarande visar när viktiga händelser inom AI-schack och AI-bolag/modeller inträffade.

### 6c. Markering av aktiva filter

Alla aktiva filtervillkor ska markeras tydligt med blå färg i appen.

När ett filtervillkor inte längre är aktivt ska den blå markeringen försvinna.

När användaren trycker på **Rensa filter** ska samtliga filter återställas och alla blå filtermarkeringar försvinna.

### 6d. Meddelande efter Spara önskemål

När användaren trycker på **Spara önskemål** och sparningen har lyckats ska appen visa meddelandet:

**Önskemålen är hämtade.**

Meddelandet ska försvinna automatiskt så fort användaren klickar eller trycker någon annanstans i appen.

### 6f. Tangentbordsscrollning i detaljerad artikel

När en detaljerad artikel är öppen gäller:
- **Pil upp / Pil ned** byter fortfarande mellan artiklar.
- **Shift + Pil upp / Shift + Pil ned** scrollar inne i den öppna artikeln.
- Varje tryck på Shift + pil ska flytta texten ungefär **två textrader** uppåt eller nedåt, beräknat från artikeltextens faktiska radavstånd.

### 6e. Uppdatera filtrering laddar om appen

Knappen **Uppdatera filtrering** ska vara tydligt **röd** så att Tomas lättare kommer ihåg att använda den.

När användaren trycker på **Uppdatera filtrering** ska appen göra en fullständig siduppdatering motsvarande **F5**. Därmed läses den senaste versionen av appens HTML/JavaScript och den senaste nyhetsfilen in.

Efter en lyckad **Spara önskemål** ska meddelandet även påminna:

**Önskemålen är hämtade. Kom ihåg att trycka på Uppdatera filtrering.**

Den tidigare regeln gäller fortfarande att meddelandet försvinner när användaren klickar eller trycker någon annanstans i appen.

