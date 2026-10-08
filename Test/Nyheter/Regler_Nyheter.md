# Regler för IT-Nyheter

Senast uppdaterad: 2026-10-08 01:28

## 1. Olika visning för Tomas och andra användare

Appen ska se olika ut beroende på om Tomas använder appen eller om det är en annan användare.

Knappen **Regler** är privat och ska endast vara synlig för Tomas när **Privat visning** är aktiverad. När Tomas avmarkerar Privat visning ska även Regler-knappen döljas, så att den publika förhandsvisningen motsvarar vad andra användare ser.

### 1a. Tomas

Tomas ska ha alla funktioner. När appen har verifierat Tomas privata GitHub-token kan han använda **Privat visning**.

I privat visning ska Tomas kunna se och använda:
- HämtaNyheter.
- Filter för källa.
- Fullständig/original rubrik för vanliga dokument.
- Exakt datum i formatet YYYY-MM-DD.
- Källa i dokumentinformationen.
- Knappen **Läs originaldokumentet** för vanliga dokument.
- Privat dokumentmetadata som hämtas från det privata repositoryt Data.
- Kryssrutan **Privat visning** för att växla mellan Tomas vy och den publika vyn.
- Knappen **Regler** och innehållet i `Regler_Nyheter.md`. Denna knapp ska endast visas för Tomas när den privata GitHub-token har verifierats **och Privat visning är aktiverad**.

När Tomas avmarkerar **Privat visning** ska han kunna kontrollera hur appen ser ut för andra användare.

### 1b. Andra användare

Andra användare ska ha en mer begränsad visning av vanliga webbdokument av upphovsrättsskäl.

För vanliga dokument ska andra användare:
- inte se källa,
- se en omskriven rubrik i stället för originalrubriken,
- endast se år och månad, YYYY-MM,
- inte få någon knapp eller originallänk till originaldokumentet,
- se en egen omskriven ingress och dokumenttext.

Den publika filen `nyheter.json` ska därför inte innehålla privat dokumentmetadata som källa, exakt datum eller originallänk för vanliga dokument.

Privat dokumentmetadata ligger i `Data/Test/Nyheter/nyheter_privata.json`.

### 1c. PUBLIC/VIP-identitet

Den privata ägarinloggningen med Tomas befintliga GitHub-token ska alltid kontrolleras först. Om tokenen finns och verifieras ska PUBLIC/VIP-rutinerna inte köras på den datorn och Tomas ska komma in i appen på vanligt sätt.

För andra användare används följande tre värden i `localStorage`:
- `ITNyheter_UserId` – ett slumpmässigt permanent ID för den aktuella webbläsarprofilen,
- `ITNyheter_UserName`,
- `ITNyheter_UserRole` – `PUBLIC` eller `VIP`.

Vid första appstarten, när `ITNyheter_UserId` saknas:
- appen skapar ett nytt `ITNyheter_UserId`,
- grundrollen sätts till `PUBLIC`,
- en login-ruta visas automatiskt med texten **Login:** och informationen **Stäng login med ESC eller ENTER**,
- tomt svar eller ESC ger `userName = OKÄND` och `userRole = PUBLIC`,
- ett svar som börjar med **VIP**, oberoende av versaler/gemener, ger `userRole = VIP`,
- VIP-namnet normaliseras till formen **VIP-Namn**, till exempel `vip-Olof` → `VIP-Olof`, `VipAnna` → `VIP-Anna` och `VIP Tomas` → `VIP-Tomas`,
- övriga svar sparas som användarnamn och får rollen `PUBLIC`.

Vid senare appstarter visas ingen automatisk login-ruta om `userId` redan finns.

Högerklick på app-rubriken **IT-Nyheter** ska öppna login-rutan igen för PUBLIC/VIP-användare. `ITNyheter_UserId` ska då behållas, medan `ITNyheter_UserName` och `ITNyheter_UserRole` får ändras.

Två filer används i privata repot **Data**:
- `Test/Nyheter/Users.json` – en unik post per `userId` med `userId`, `userName` och `userRole`,
- `Test/Nyheter/UserLog.json` – en loggrad vid varje appstart med `userId`, `userName`, `userRole` och datum/tid i formen `YYYY-MM-DD  HH:MM:SS`.

Den separata begränsade GitHub-tokenen lagras som Repository Secret med namnet `ITNYHETER_LOG_TOKEN` i `ChessApps-Pages`. Workflow-filen `.github/workflows/itnyheter-check-token.yml` kontrollerar att Secret-värdet fungerar mot privata repot Data och loggfilerna.

Appen har en förberedd skyddad token-payload för PUBLIC/VIP-loggning. Så länge den payloaden är tom fungerar lokal identitet och login, men ingen PUBLIC/VIP-logg skrivs till Data.

### YouTube är ett undantag

YouTube-klipp behandlas inte som vanliga webbdokument i denna upphovsrättsregel.

För YouTube får följande vara synligt även för andra användare:
- originalrubrik,
- exakt publiceringsdatum när det är känt,
- källa YouTube,
- kanal och utgivare när de är kända,
- original-/YouTube-länk,
- inbäddad YouTube-spelare.

## 2. Rubrik, ingress och fullt dokument

**Terminologi i appen:** Det gemensamma användarordet är **Dokument**. Dokumenttypen är **IT-Fakta**, **IT-Nyhet** eller **IT-YouTube**. Filtret heter **Dokumenttyp**. Appens huvudrubrik **IT-Nyheter** samt tekniska filnamn och kommandot `HämtaNyheter` behålls.

Ingressen ska vara cirka **100 ord** och ge en korrekt sammanfattning av det viktigaste i nyheten.

Ingressen ska prioritera:
- huvudbudskapet,
- viktiga siffror och riskbedömningar,
- vem som säger vad,
- viktiga tidsperioder,
- viktiga konsekvenser och slutsatser,
- centrala reservationer och osäkerheter.

Språket ska vara lätt att förstå. Viktig innebörd får inte tas bort bara för att texten förenklas.

### 2a. Ett dokument valt via rubriklistan

När användaren väljer en bestämt dokument i listan **Fullständig rubrik** eller **Omskriven rubrik** ska appen visa:
- rubrik,
- synligt **ID-nummer** för dokumentposten,
- metadata enligt användarens behörighet,
- **Dokumenttyp** så att det framgår om dokumentet är **IT-Fakta**, **IT-Nyhet** eller **IT-YouTube**,
- kategorier,
- ingress,
- hela den längre omskrivna dokumenttexten.

Ingressen visas som första fetstilade stycke. Orden "Ingress" och "Dokumentet" ska inte användas som extra mellanrubriker.

### 2b. Flera dokument samtidigt

När flera dokument visas samtidigt ska varje vanlig dokument endast visa ingressen, inte den längre dokumenttexten.

ID-numret ska vara synligt i informationsraden för varje dokumentpost, oavsett dokumenttyp.


## 2c. Dokumenttyper

Alla poster ska ha en av följande typer:
- **IT-Fakta** – beständiga faktabaserade referens- och sammanställningsdokument som GPT skapar.
- **IT-Nyhet** – vanliga tidsbundna nyhetsdokument.
- **IT-YouTube** – dokument som bygger på en YouTube-video.

Dokumentnamnets prefix ska göra dokumenttypen synlig direkt:
- **!** = IT-Fakta.
- **N:** = IT-Nyhet.
- **Y:** = IT-YouTube.

För IT-Nyhet och IT-YouTube ska prefixet lagras i den publika rubriken `titel`. En privat `fullständig_rubrik` som återger källans originalrubrik ska däremot inte skrivas om; appen lägger till rätt prefix när den visar dokumentnamnet.

Samma tre typnamn ska användas både som **Dokumenttyp** i varje dokument och som alternativ i appens filter **Dokumenttyp**.

Filtret **Dokumenttyp** ska visa antal poster inom parentes för samtliga val:
- **Alla (antal)**
- **IT-Fakta (antal)**
- **IT-Nyhet (antal)**
- **IT-YouTube (antal)**

Antalen ska räknas från den aktuella dokumentfilen när appen läser in dokumenten och räknas därför om automatiskt vid **Uppdatera filtrering** eller F5.

För **IT-Fakta** gäller dessutom:
- både den publika rubriken `titel` och den privata fullständiga rubriken `fullständig_rubrik` ska alltid börja med tecknet **!** när dokumentet är en beständig referens,
- tecknet **!** markerar att innehållet är en beständig referens/sammanställning och inte hårt knutet till ett enskilt publiceringsdatum,
- fältet `datum` ska ange när just den aktuella versionen av IT-Fakta-posten skapades eller publicerades,
- varje IT-Fakta-post ska ha ett versionsnummer i formen **V1, V2, V3 ...**,
- första versionen är **V1**,
- när innehållet ändras ska den befintliga posten inte skrivas över; en ny dokument med nytt ID, dagens datum och nästa versionsnummer ska skapas,
- tidigare versioner ska ligga kvar oförändrade tills Tomas själv väljer att arkivera dem,
- versionen ska visas i dokumentets metadata och i rubriklistan så att olika versioner kan skiljas åt och jämföras.

De 13 befintliga IT-Fakta-posterna, ID 46–58, är **V1** med datum **2026-10-06**.

Exempel på IT-Fakta:
- **!IT-året ...**
- **!AI-historik ...**
- **!AI-begrepp ...**

## 3. HämtaNyheter och dataflöde

Tomas skriver sina önskemål i klartext i appens privata del **HämtaNyheter**.

Önskemålen sparas i repositoryt **Data**, i:
`Data/Test/Nyheter/HamtaNyheter.json`

GPT läser önskemålen därifrån och hämtar eller bearbetar relevanta dokument.

De publika, bearbetade dokumenten sparas i repositoryt **ChessApps-Pages**, i:
`Test/Nyheter/nyheter.json`

Appen läser sedan in dokumenten från den publika JSON-filen.

Privat metadata för vanliga dokument sparas separat i repositoryt **Data** och ska bara läsas när Tomas är verifierad.

### 3a. Status för aktuellt önskemål

Det aktuella önskemålet i `Data/Test/Nyheter/HamtaNyheter.json` ska ha en behandlingsstatus.

Två statusvärden används:
- **Nytt önskemål** – önskemålet får behandlas av GPT.
- **Färdigbehandlat** – önskemålet får inte behandlas igen.

I appens privata del **HämtaNyheter** finns en kryssruta för status:
- tom kryssruta betyder **Nytt önskemål**,
- ikryssad ruta betyder **Färdigbehandlat**.

När GPT får kommandot **HämtaNyheter** i chatten ska GPT alltid läsa statusen först. GPT får bara hämta eller bearbeta dokument från det aktuella önskemålet om status är **Nytt önskemål**.

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

För vanliga webbdokument ska den publika texten skrivas med egna ord.

GPT ska:
- skriva om rubriken så att den tydligt skiljer sig från originalrubriken,
- skriva en ingress på cirka 100 ord,
- skriva en längre lättläst text som behåller den viktiga innebörden,
- behålla centrala fakta, siffror, namn, riskbedömningar, tidsperioder och slutsatser,
- undvika att kopiera längre formuleringar ordagrant från originaldokumentet.

Målet är att ge en sakligt korrekt och lättläst återgivning utan att återpublicera originaldokumentet.

## 5. Appens visning, storleksändring och lokal lagring

En diskret **appversion** ska visas intill rubriken **IT-Nyheter**. Versionsvärdet avser versionen av appens HTML-kod och används för att kontrollera att webbläsaren verkligen har laddat den senaste GitHub Pages-versionen.

### 5a. Statistik för markerad text

När användaren markerar text i en detaljerad nyhetsdokument ska appen visa statistik för:
- ingressens antal ord och bokstäver,
- dokumentets antal ord och bokstäver,
- den markerade textens antal ord och bokstäver.

Statistiken visas i en flytande textruta **ovanför dokumentets rubrik**. Rutan ska följa med vid rullning i den detaljerade dokumentrutan så att statistiken förblir synlig.

### 5b. Storleken på den detaljerade dokumentrutan

Den stora dokumentrutan som visar både ingress och den fullständiga detaljerade dokumenttexten ska kunna ändras i höjd genom att användaren drar i rutans nederkant.

Detta ska fungera:
- med mus på dator,
- med pekning/touch på mobil och surfplatta.

Användaren ska kunna göra rutan högre för att se fler rader samtidigt eller lägre för att spara skärmutrymme.

Den senast valda höjden sparas lokalt i den aktuella webbläsaren.

### 5c. Publik nyhetsfil, lokala inställningar och privat ägardel

- Dokumentfilen ligger publikt tillsammans med appen på GitHub Pages.
- Filter, sorteringsordning, favoriter och arkivering sparas bara lokalt i respektive webbläsare.
- Ägardelen **HämtaNyheter** visas endast för en webbläsare vars GitHub-token har åtkomst till det privata Data-repot.

Dessa uppgifter ska finnas i regeldokumentet men **inte visas som en förklarande text längst ner under dokumenten i appen**.

## 6. IT-Fakta och appbeteende

### 6a. Dokumenttypen IT-Fakta

Beständiga faktabaserade referens- och sammanställningsdokument som GPT skapar ska ha **Dokumenttyp = IT-Fakta**. De ska inte använda **!AI-sammanställningar** som kategori.

Följande befintliga sammanställningar ska ha **Dokumenttyp = IT-Fakta**:
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

Detaljerad information om AI och schack ska ligga i den separata dokumentet **!AI och schack**.

Detaljerad information om AI-bolag, deras modellfamiljer och verktyg ska ligga i den separata dokumentet **!AI-bolag och AI-modeller**.

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

Antalen ska uppdateras direkt när en dokument arkiveras eller återställs från arkivet.

Filtret **Favorit** ska på motsvarande sätt alltid visa:
- **Alla (antal)**
- **Endast favoriter (antal)**
- **Ej favoriter (antal)**

Favoritantalen ska uppdateras direkt när en dokument markeras som favorit eller tas bort från favoriter.

Filtret **Kategori** ska visa antal dokumenter inom parentes för varje kategori. Första valet ska visa **Alla kategorier (totalt antal dokumenter)**. Varje övrigt val ska visa kategoriens namn följt av hur många dokumenter som innehåller just den kategorin, till exempel **ChatGPT (7)**.

Om en dokument har flera kategorier ska den räknas en gång i varje kategori som den tillhör. Summan av kategoriernas antal kan därför vara större än det totala antalet dokumenter.

Vanliga knappar som annars saknar egen specialfärg ska ha **blå bakgrund med vit text**. Knappar eller kontroller som redan har en särskild betydelsefärg, exempelvis den röda **Uppdatera filtrering**, ska behålla sin specialfärg.

### 6d. Meddelande efter Spara önskemål

När användaren trycker på **Spara önskemål** och sparningen har lyckats ska appen visa meddelandet:

**Önskemålen är hämtade.**

Meddelandet ska försvinna automatiskt så fort användaren klickar eller trycker någon annanstans i appen.

### 6f. Tangentbordsscrollning i detaljerad dokument

När en detaljerad dokument är öppen gäller:
- **Pil upp / Pil ned** byter fortfarande mellan dokument.
- **Shift + Pil upp / Shift + Pil ned** scrollar inne i den öppna dokumentet.
- Varje tryck på Shift + pil ska flytta texten ungefär **två textrader** uppåt eller nedåt, beräknat från dokumenttextens faktiska radavstånd.

### 6e. Uppdatera filtrering laddar om appen

Knappen **Uppdatera filtrering** ska vara tydligt **röd** så att Tomas lättare kommer ihåg att använda den.

När användaren trycker på **Uppdatera filtrering** ska appen göra en fullständig siduppdatering motsvarande **F5**. Därmed läses den senaste versionen av appens HTML/JavaScript och den senaste dokumentfilen in.

Efter en lyckad **Spara önskemål** ska meddelandet även påminna:

**Önskemålen är hämtade. Kom ihåg att trycka på Uppdatera filtrering.**

Den tidigare regeln gäller fortfarande att meddelandet försvinner när användaren klickar eller trycker någon annanstans i appen.

### 6g. Datumfilter

Datumfiltret ska kunna användas på tre nivåer:
- **År**, till exempel `2026`.
- **År–månad**, till exempel `2026-10`.
- **År–månad–dag**, till exempel `2026-10-07`.

När bara år anges ska alla dokument under året matcha. När år och månad anges ska alla dokument under månaden matcha. När fullständigt datum anges ska dokument från just det datumet matcha, när exakt datum finns tillgängligt i användarens visningsläge.

Alla datumvärden som finns tillgängliga för den aktuella användaren ska byggas upp som valbara sökvillkor i datumfältet. År och år–månad ska också skapas från de fullständiga datumen.

Det valda datumvillkoret och övriga filtervillkor ska sparas lokalt och ligga kvar synliga efter **Uppdatera filtrering** och den fullständiga siduppdateringen. Filtervillkor får inte återställas automatiskt bara för att de för tillfället ger 0 träffar.

Alla aktiva filtervillkor ska markeras med **röd bakgrund**. **Rensa filter** ska ta bort både filtervärdena och den röda markeringen.

### 6h. Omskrivna IT-nyheter utan medienamn i dokumenttexten

- Alla dokument av typen **IT-Nyhet** ska skrivas med egna ord, tydligt och lättförståeligt. Skriv så att innehållet står på egna ben utan formuleringar som ”enligt Aftonbladet”, ”DN skriver” eller ”Reuters rapporterar”.
- Ta bort nyhetsmediets namn ur den publika rubriken, ingressen och brödtexten **när namnet bara anger var nyheten hämtats**. Detta gäller även kortformer som DN och SvD.
- Behåll namn på företag, organisationer och personer när de faktiskt är en del av nyhetens sakuppgifter, exempelvis när en artikel handlar om OpenAI, Google eller Wikimedia. Förvanska aldrig vem som uttalat sig eller vem som utfört en åtgärd.
- Källans namn, originalrubrik, länk och exakt publiceringsdatum ska fortsatt bevaras separat i privat metadata enligt gällande behörighetsregler.
- Vid framtida HämtaNyheter ska denna kontroll göras innan nya IT-Nyheter sparas.

### 6i. Hämtdatum – behörighetsstyrd visning

- Dokumentets **Hämtdatum** ska inte visas för användare med rollen **PUBLIC**.
- Hämtdatum får visas för **VIP** och i **privat ägarvisning**.
- Fältet `hämtdatum` behålls i nyhetsdata för sortering och administrativ användning. Denna regel gäller visningen i dokumentet, inte lagring eller sorteringsfunktion.

### 6j. Originalknapp för VIP

- **VIP** ska, liksom privat ägarvisning, kunna öppna originalwebbsidan för ett IT-Nyhetsdokument via knappen **Läs originaldokumentet**.
- **PUBLIC** ska inte se denna knapp för IT-Nyheter.
- För VIP får den nödvändiga originaladressen finnas som separat tekniskt fält i den publikt läsbara datafilen, men appen får inte visa adressen eller knappen för PUBLIC.
- Privat metadata som källa och fullständig originalrubrik ska även fortsättningsvis följa sina separata behörighetsregler.

### 6k. Visa eller dölj metadata i dokument

- Användaren ska kunna dölja metadataområdet mellan dokumentets rubrik och dokumenttexten.
- På mobil/pekskärm växlar ett snabbt tryck på dokumentrubriken mellan **dold** och **visad** metadata.
- På dator gör ett vanligt vänsterklick på dokumentrubriken samma sak. Vänsterklick och snabbt tryck är alltså likvärdiga för denna funktion.
- Valet sparas lokalt på enheten och gäller för alla dokument och framtida besök tills användaren själv ändrar valet igen.
- När metadata döljs ska rubriken och själva dokumenttexten fortfarande visas.
