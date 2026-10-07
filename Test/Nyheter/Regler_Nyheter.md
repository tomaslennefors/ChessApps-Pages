# Regler för IT-Nyheter

Senast uppdaterad: 2026-10-07 16:31

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
- **Innehållstyp** så att det framgår om innehållsposten är **IT-Fakta**, **IT-Nyheter** eller **IT-YouTube**,
- kategorier,
- ingress,
- hela den längre omskrivna nyhetstexten.

Ingressen visas som första fetstilade stycke. Orden "Ingress" och "Nyheten" ska inte användas som extra mellanrubriker.

### 2b. Flera nyheter samtidigt

När flera nyheter visas samtidigt ska varje vanlig artikel endast visa ingressen, inte den längre artikeltexten.


## 2c. Innehållstyper

Alla poster ska ha en av följande typer:
- **IT-Fakta** – beständiga faktabaserade referens- och sammanställningsartiklar som GPT skapar.
- **IT-Nyheter** – vanliga tidsbundna nyhetsartiklar.
- **IT-YouTube** – innehåll som bygger på en YouTube-video.

Samma tre typnamn ska användas både som **Innehållstyp** i varje innehållspost och som alternativ i appens filter **Innehållstyp**.

Filtret **Innehållstyp** ska visa antal poster inom parentes för samtliga val:
- **Alla (antal)**
- **IT-Fakta (antal)**
- **IT-Nyheter (antal)**
- **IT-YouTube (antal)**

Antalen ska räknas från den aktuella nyhetsfilen när appen läser in innehållet och räknas därför om automatiskt vid **Uppdatera filtrering** eller F5.

För **IT-Fakta** gäller dessutom:
- både den publika rubriken `titel` och den privata fullständiga rubriken `fullständig_rubrik` ska alltid börja med tecknet **!** när innehållet är en beständig referens,
- tecknet **!** markerar att innehållet är en beständig referens/sammanställning och inte hårt knutet till ett enskilt publiceringsdatum,
- fältet `datum` ska ange när just den aktuella versionen av IT-Fakta-posten skapades eller publicerades,
- varje IT-Fakta-post ska ha ett versionsnummer i formen **V1, V2, V3 ...**,
- första versionen är **V1**,
- när innehållet ändras ska den befintliga posten inte skrivas över; en ny innehållspost med nytt ID, dagens datum och nästa versionsnummer ska skapas,
- tidigare versioner ska ligga kvar oförändrade tills Tomas själv väljer att arkivera dem,
- versionen ska visas i innehållspostens metadata och i rubriklistan så att olika versioner kan skiljas åt och jämföras.

De 13 befintliga IT-Fakta-posterna, ID 46–58, är **V1** med datum **2026-10-06**.

Exempel på IT-Fakta:
- **!IT-året ...**
- **!AI-historik ...**
- **!AI-begrepp ...**

## 3. HämtaNyheter och dataflöde

Tomas skriver sina önskemål i klartext i appens privata del **HämtaNyheter**.

Önskemålen sparas i repositoryt **Data**, i:
`Data/Test/Nyheter/HamtaNyheter.json`

GPT läser önskemålen därifrån och hämtar eller bearbetar relevanta nyheter.

De publika, bearbetade nyheterna sparas i repositoryt **ChessApps-Pages**, i:
`Test/Nyheter/nyheter.json`

Appen läser sedan in nyheterna från den publika JSON-filen.

Privat metadata för vanliga artiklar sparas separat i repositoryt **Data** och ska bara läsas när Tomas är verifierad.

### 3a. Status för aktuellt önskemål

Det aktuella önskemålet i `Data/Test/Nyheter/HamtaNyheter.json` ska ha en behandlingsstatus.

Två statusvärden används:
- **Nytt önskemål** – önskemålet får behandlas av GPT.
- **Färdigbehandlat** – önskemålet får inte behandlas igen.

I appens privata del **HämtaNyheter** finns en kryssruta för status:
- tom kryssruta betyder **Nytt önskemål**,
- ikryssad ruta betyder **Färdigbehandlat**.

När GPT får kommandot **HämtaNyheter** i chatten ska GPT alltid läsa statusen först. GPT får bara hämta eller bearbeta nyheter från det aktuella önskemålet om status är **Nytt önskemål**.

När hela önskemålet har genomförts utan fel ska GPT uppdatera `HamtaNyheter.json` och sätta status till **Färdigbehandlat**. Appens kryssruta ska då visas ikryssad efter att den privata datan har lästs in på nytt.

Om Tomas vill köra exakt samma önskemål igen ska han först ta bort krysset. Då sparas statusen **Nytt önskemål** i Data och önskemålet får behandlas igen.

Om Tomas ändrar själva önskemålet och sparar den ändrade texten eller lägger till nya länkar ska det ändrade önskemålet få status **Nytt önskemål**. Att bara trycka på **Spara önskemål** utan att ändra det färdigbehandlade önskemålet ska inte återaktivera det.

### 3b. Fritextrutan ägs av Tomas

Texten i **Önskemål i fritext** får bara ändras av Tomas.

Appen och GPT får aldrig ändra texten i själva textrutan.

När appen eller GPT behöver bearbeta, kontrollera, trimma, dela upp, omformatera eller på annat sätt förändra texten ska en **kopia** av texten användas. Originaltexten i textrutan ska alltid lämnas orörd.

Texten i textrutan ska bevaras lokalt medan Tomas skriver. Om sidan uppdateras med **F5** eller **Uppdatera filtrering** ska exakt samma text visas igen, även om Tomas ännu inte har tryckt **Spara önskemål**.

**Spara önskemål** betyder att texten skickas till den privata Data-filen. Det är inte samma sak som att appen får ändra innehållet i textrutan.

Önskemål-rutan ska använda webbläsarens inbyggda storleksändring via draghandtaget nere till höger. Rutan ska kunna minskas till ungefär en textrad och förstoras efter behov. Kontrollerna under rutan ska ligga i normalt dokumentflöde och därför följa med när rutan görs högre eller lägre.
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

En diskret **appversion** ska visas intill rubriken **IT-Nyheter**. Versionsvärdet avser versionen av appens HTML-kod och används för att kontrollera att webbläsaren verkligen har laddat den senaste GitHub Pages-versionen.

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

## 6. IT-Fakta och appbeteende

### 6a. Innehållstypen IT-Fakta

Beständiga faktabaserade referens- och sammanställningsartiklar som GPT skapar ska ha **Innehållstyp = IT-Fakta**. De ska inte använda **!AI-sammanställningar** som kategori.

Följande befintliga sammanställningar ska ha **Innehållstyp = IT-Fakta**:
- **!IT-året ...**
- **!AI-historik ...**
- **!AI-begrepp ...**
- **!AI och schack ...**
- **!AI-bolag och AI-modeller ...**
- **!ChatGPT - Idag ...**
- **!ChatGPT - Historiken**
- **!ChatGPT - Begreppen**
- **!ChatGPT - OpenAI**

### 6b. Utbrytningar från !AI-historik

Detaljerad information om AI och schack ska ligga i den separata artikeln **!AI och schack**.

Detaljerad information om AI-bolag, deras modellfamiljer och verktyg ska ligga i den separata artikeln **!AI-bolag och AI-modeller**.

I **!AI-historik** ska däremot korta årtalsnotiser finnas kvar så att den historiska tidslinjen fortfarande visar när viktiga händelser inom AI-schack och AI-bolag/modeller inträffade.

### 6c. Markering av aktiva filter och knappar

Alla aktiva filtervillkor ska markeras tydligt med **röd bakgrundsfärg** i appen.

När ett filtervillkor inte längre är aktivt ska den röda markeringen försvinna.

När användaren trycker på **Rensa filter** ska samtliga filter återställas och alla röda filtermarkeringar försvinna. För filtret **Arkiv** betyder rensat läge **Alla**.

När appen startas utan ett tidigare sparat val ska filtret **Arkiv** som standard vara **Ej arkiverade**. När **Uppdatera filtrering** eller F5 används ska det aktuella valet i Arkiv-filtret bevaras, även om valet är **Alla** efter att Rensa filter har använts.

De tre alternativen i Arkiv-filtret ska alltid visa antal inom parentes:
- **Alla (antal)**
- **Ej arkiverade (antal)**
- **Endast arkiverade (antal)**

Antalen ska uppdateras direkt när en innehållspost arkiveras eller återställs från arkivet.

Vanliga knappar som annars saknar egen specialfärg ska ha **blå bakgrund med vit text**. Knappar eller kontroller som redan har en särskild betydelsefärg, exempelvis den röda **Uppdatera filtrering**, ska behålla sin specialfärg.

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

### 6g. Datumfilter

Datumfiltret ska kunna användas på tre nivåer:
- **År**, till exempel `2026`.
- **År–månad**, till exempel `2026-10`.
- **År–månad–dag**, till exempel `2026-10-07`.

När bara år anges ska alla nyheter under året matcha. När år och månad anges ska alla nyheter under månaden matcha. När fullständigt datum anges ska nyheter från just det datumet matcha, när exakt datum finns tillgängligt i användarens visningsläge.

Alla datumvärden som finns tillgängliga för den aktuella användaren ska byggas upp som valbara sökvillkor i datumfältet. År och år–månad ska också skapas från de fullständiga datumen.

Det valda datumvillkoret och övriga filtervillkor ska sparas lokalt och ligga kvar synliga efter **Uppdatera filtrering** och den fullständiga siduppdateringen. Filtervillkor får inte återställas automatiskt bara för att de för tillfället ger 0 träffar.

Alla aktiva filtervillkor ska markeras med **röd bakgrund**. **Rensa filter** ska ta bort både filtervärdena och den röda markeringen.
