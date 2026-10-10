# Regler för IT-Nyheter

Senast uppdaterad: 2026-10-10 02:52 (kompletterad efter jämförelse med originalreglerna)

Detta dokument ersätter tidigare, motstridiga regler om PUBLIC-användare, omskrivna rubriker, originalknappar, filteråterställning och omladdning. Det finns **en ägare och ett antal VIP-användare**, inte en separat publik användargrupp.

## 1. Originalrubrik och dokumentvisning

1. **Samma originalrubrik** ska visas för ägaren i **1. Originaltext** och **2. AI-text för vuxna**, och originalrubriken får även visas för VIP.
2. GPT får inte ersätta originalrubriken med en ny, omskriven rubrik i AI-versionen.
3. Om första Markdown-huvudrubriken (`# Rubrik`) finns i originaltexten ska den inte visas en gång till i brödtexten.
4. Om Markdown-huvudrubriken skiljer sig från tidigare lagrad originalrubrik ska Markdown-rubriken få företräde i visningen. Den ska därefter utelämnas ur den renderade originaltexten.
5. IT-nyheters rubrik ska ha prefixet **N:** exakt en gång. IT-Fakta har **!** och IT-YouTube **Y:**.
6. Originaltext i Markdown ska alltid renderas med korrekt formatering.
7. Knapp 1 och 2 ska ha samma kolumnbredd, marginaler, rubriktypografi och ikonplacering. Inga extra inre ramar i knapp 2.
8. Båda vyerna har favorit-, kopiera- och döljikon. Döljikonen blir **röd** när dokumentet är dolt. Dolda dokument kan tas fram via arkivfiltret.
9. Den klickbara **webbadressen** visas under rubriken i båda vyerna. Ingen separat knapp **Läs webb-sidan** ska finnas.
10. Klick eller tryck på dokumentrubriken visar eller döljer metadata och kategorier.

## 2. Ingress – gemensam för original och AI-text

1. GPT ska läsa originaltexten och skriva en **gemensam ingress** för knapp 1 och knapp 2.
2. Ingressen ska vara en **självständig, korrekt sammanfattning** av originalnyheten, inte en kopia av AI-brödtexten.
3. Riktlinjen är **cirka 100 ord**.
4. Språket ska vara tydligt, lättbegripligt och använda **lagom korta meningar**.
5. Ta med nyhetens huvudbudskap och relevanta fakta: viktiga siffror, risker, vem som säger vad, tidsperioder, konsekvenser, slutsatser och nödvändiga reservationer.
6. Bevara viktiga nyanser. Förenkling får inte ändra innebörden.
7. Skriv med egna ord. Lägg inte till obekräftade fakta.
8. Ingressen visas i **fetstil**, utan en extra rubrik ”Ingress”.
9. GPT ska ta fram ingressen **innan** AI-brödtexten skapas.

## 3. AI-brödtext för vuxna

1. AI-brödtexten ska återge originalnyhetens **viktigaste fakta och sammanhang** med ett enklare, mer pedagogiskt språk än originalet.
2. **Undvik långa meningar.** Dela upp komplicerade resonemang i kortare, tydliga meningar. Använd gärna korta stycken.
3. Förklara svåra ord och begrepp när det behövs.
4. Texten får bli **längre än originaltexten** om det förbättrar förståelsen.
5. Använd vid behov **mellanrubriker, pedagogiska punktlistor, numrerade listor och relevanta extralänkar**.
6. Skilj tydligt på fakta som originalartikeln rapporterar och GPT:s kompletterande förklaringar eller slutsatser.
7. Hitta inte på fakta eller citat och kopiera inte längre formuleringar från nyhetskällan.
8. Upprepa inte bara ingressen. Brödtexten ska ge fördjupning och förklara **varför** och **hur**.
9. Brödtexten ska formateras med fungerande rubriker, listor, länkar och stycken.
10. Arbetsordning: **läs original → kontrollera originalrubrik → skriv ingress → skriv AI-brödtext → kontrollera saklighet, begriplighet och formatering**.

## VIP-inloggning – användarnamn, inte lösenord

- VIP-inloggningen är ett **inloggningsnamn**, inte ett lösenord. Den kräver inte lösenord eller e-postadress.
- Formatet är `VIP-` följt av **1–50 valfria tecken**. Bindestreck, siffror, mellanslag och andra tecken får användas i namnet.
- Prefixet `VIP-` är obligatoriskt och får skrivas med stora eller små bokstäver.
- Exempel på godkänd inloggning: `VIP-TomasL-Edge`.
- Appen får inte införa ytterligare teckenbegränsningar utan Tomas godkännande. Alla inloggningsregler ska finnas i detta dokument.
- VIP-namnet identifierar användaren men innebär ingen säker lösenordsautentisering.

## 4. Behörigheter – en ägare och VIP

### Placering av ägarens kontroller

- **Privat visning** och de tre knapparna **Regler**, **Sammanhang** och **Användarlogg** ska ligga **inne i området HämtaNyheter**, inte ovanför området i rubrikdelen.
- Dessa kontroller ska vara åtkomliga för den verifierade ägaren. När Privat visning stängs av måste kryssrutan fortfarande kunna nås så att privat visning kan slås på igen.
- VIP ska inte se dessa kontroller eller området HämtaNyheter.

### 4a. Ägaren

- Har tillgång till **originaltext**, **AI-text för vuxna** och tillgängliga övriga textlägen.
- Har tillgång till hela området **HämtaNyheter**, inklusive dess splitterline.
- Får se originalrubrik, källinformation, datum, kategorier och klickbar länk till originalwebbplatsen.
- Vid appstart, F5 och annan omladdning ska **ägarens filtervillkor bevaras**.
- Vid appstart och omladdning ska **alla områden som styrs av splitterlines vara öppna**.
- Endast verifierad ägare får använda ägarfunktionerna och läsa originaltexterna från det privata Data-registret.

### 4b. VIP

- Får **inte läsa originaltexten inne i appen**.
- Får **läsa originalrubriken**, AI-ingressen och AI-brödtexten.
- Får **se och klicka på webbadressen till källans webbplats**.
- Får **inte se området HämtaNyheter**. Hela området och dess splitterline ska vara dolda.
- Vid **varje appstart eller omladdning** ska **alla filter vara rensade**.
- Vid **varje appstart eller omladdning** ska tillgängliga **splitterlines vara stängda**.
- VIP:s tillgång till källans webbsida innebär inte att originaltexten får visas i appens egen originaltextvy.

### 4c. Behörighet och datalagring

- Appen finns på GitHub Pages i **ChessApps-Pages**.
- AI-bearbetade dokument lagras i `Test/Nyheter/nyheter.json`.
- Privat metadata finns i **Data/Test/Nyheter/nyheter_privata.json**.
- Originaltexter finns i **Data/Test/Nyheter/nyheter_originaltexter.json**.
- Det är **behörighetskontrollen och datatillgången**, inte bara dolda knappar, som ska hindra VIP från att läsa originaltexten.
- Det finns **ingen PUBLIC-roll** i den aktuella behörighetsmodellen. Gamla instruktioner för PUBLIC ska inte tillämpas.

## 5. Dokumenttyper och presentation

### Dokumenttyper

Alla poster ska ha en av följande typer:
- **IT-Fakta** – beständiga faktabaserade referens- och sammanställningsdokument som GPT skapar.
- **IT-Nyhet** – vanliga tidsbundna nyhetsdokument.
- **IT-YouTube** – dokument som bygger på en YouTube-video.

Dokumentnamnets prefix ska göra dokumenttypen synlig direkt:
- **!** = IT-Fakta.
- **N:** = IT-Nyhet.
- **Y:** = IT-YouTube.

För IT-Nyhet och IT-YouTube ska prefixet lagras i den rubriken `titel`. En `fullständig_rubrik` som återger källans originalrubrik ska däremot inte skrivas om; appen lägger till rätt prefix när den visar dokumentnamnet.

Samma tre typnamn ska användas både som **Dokumenttyp** i varje dokument och som alternativ i appens filter **Dokumenttyp**.

Filtret **Dokumenttyp** ska visa antal poster inom parentes för samtliga val:
- **Alla (antal)**
- **IT-Fakta (antal)**
- **IT-Nyhet (antal)**
- **IT-YouTube (antal)**

Antalen räknas från inlästa dokument och uppdateras när filtreringen tillämpas. **Uppdatera filtrering** laddar inte om dokumentfilen; **F5** gör en fullständig omladdning.

För **IT-Fakta** gäller dessutom:
- både den rubriken `titel` och den fullständiga rubriken `fullständig_rubrik` ska alltid börja med tecknet **!** när dokumentet är en beständig referens,
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



- När **ett dokument** valts visas originalrubrik, tillåten metadata, kategorier, gemensam ingress och vald brödtext.
- När **flera dokument** visas räcker ingressen i respektive dokumentkort.
- Dokumentens typ och prefix ska vara konsekventa.

## 6. HämtaNyheter och arbetsflöde

### Arbetsflöde

Tomas skriver sina önskemål i klartext i appens privata del **HämtaNyheter**.

Önskemålen sparas i repositoryt **Data**, i:
`Data/Test/Nyheter/HamtaNyheter.json`

GPT läser önskemålen därifrån och hämtar eller bearbetar relevanta dokument.

De AI-bearbetade dokumenten sparas i repositoryt **ChessApps-Pages**, i:
`Test/Nyheter/nyheter.json`

Appen läser sedan in dokumenten från den publika JSON-filen.

Privat metadata och originaltexter sparas separat i **Data**. Originaltexterna får bara visas för den verifierade ägaren. VIP får läsa originalrubrik, metadata och länken till källans webbplats, men inte originaltexten.

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

Texten i textrutan ska bevaras lokalt medan Tomas skriver. Vid **F5** ska exakt samma text visas igen; **Uppdatera filtrering** ska inte ladda om sidan eller ändra texten, även om Tomas ännu inte har tryckt **Spara önskemål**.

**Spara önskemål** betyder att texten skickas till den privata Data-filen. Det är inte samma sak som att appen får ändra innehållet i textrutan.

Önskemål-rutan ska använda webbläsarens inbyggda storleksändring via draghandtaget nere till höger. Rutan ska kunna minskas till ungefär en textrad och förstoras efter behov. Kontrollerna under rutan ska ligga i normalt dokumentflöde och därför följa med när rutan görs högre eller lägre.


## 7. Appens övriga funktioner

- En diskret appversion visas vid rubriken **IT-Nyheter**.
- Filter, sortering, favoriter, döljmarkeringar och inställningar sparas lokalt, men **filteråterställningen skiljer mellan ägare och VIP enligt avsnitt 4**.
- **Uppdatera filtrering** ska endast tillämpa de aktuella filtervillkoren på dokumentlistan, **utan sidomladdning**. **F5** laddar däremot om hela appen. Ägarens filter bevaras vid omladdning; VIP:s filter återställs enligt avsnitt 4.
- **Rensa filter** återställer samtliga filtervillkor; arkivfiltret sätts då till **Alla**.
- Inga inaktuella regler om omskrivna rubriker för PUBLIC eller separata **Läs originaldokumentet/Läs webb-sidan**-knappar gäller.

### IT-Fakta och sammanställningar

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

För ägaren ska alla filterval bevaras vid F5 och omstart. För VIP ska alla filter återställas vid start eller omladdning. **Uppdatera filtrering** ska inte ladda om sidan.

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



### 6f. Tangentbordsscrollning i detaljerad dokument

När en detaljerad dokument är öppen gäller:
- **Pil upp / Pil ned** byter fortfarande mellan dokument.
- **Shift + Pil upp / Shift + Pil ned** scrollar inne i den öppna dokumentet.
- Varje tryck på Shift + pil ska flytta texten ungefär **två textrader** uppåt eller nedåt, beräknat från dokumenttextens faktiska radavstånd.



### 6g. Datumfilter

Datumfiltret ska kunna användas på tre nivåer:
- **År**, till exempel `2026`.
- **År–månad**, till exempel `2026-10`.
- **År–månad–dag**, till exempel `2026-10-07`.

När bara år anges ska alla dokument under året matcha. När år och månad anges ska alla dokument under månaden matcha. När fullständigt datum anges ska dokument från just det datumet matcha, när exakt datum finns tillgängligt i användarens visningsläge.

Alla datumvärden som finns tillgängliga för den aktuella användaren ska byggas upp som valbara sökvillkor i datumfältet. År och år–månad ska också skapas från de fullständiga datumen.

Ägarens datumvillkor och övriga filtervillkor ska sparas lokalt och ligga kvar efter **Uppdatera filtrering** och F5. VIP:s filter återställs vid sidstart och omladdning. Filtervillkor får inte återställas automatiskt bara för att de för tillfället ger 0 träffar.

Alla aktiva filtervillkor ska markeras med **röd bakgrund**. **Rensa filter** ska ta bort både filtervärdena och den röda markeringen.



### 6k. Visa eller dölj metadata i dokument

- Användaren ska kunna dölja metadataområdet mellan dokumentets rubrik och dokumenttexten.
- På mobil/pekskärm växlar ett snabbt tryck på dokumentrubriken mellan **dold** och **visad** metadata.
- På dator gör ett vanligt vänsterklick på dokumentrubriken samma sak. Vänsterklick och snabbt tryck är alltså likvärdiga för denna funktion.
- Valet sparas lokalt på enheten och gäller för alla dokument och framtida besök tills användaren själv ändrar valet igen.
- När metadata döljs ska rubriken och själva dokumenttexten fortfarande visas.


## 8. Jämförelseläge – statistik och höjdjustering

- I jämförelseläge ska **varje dokumentkolumn** ha ett eget reglage i nederkanten för att ändra höjden med mus eller pekskärm.
- Varje kolumn ska kunna rullas separat när innehållet är längre än den valda höjden.
- Vid markering av text ska en **statistikruta visas i den aktuella kolumnen**, med antal ord och bokstäver för ingress, brödtext och markerad text.
- Statistiken ska följa med vid rullning i kolumnen och inte visas i andra kolumner där ingen text är markerad.
- Funktionerna ska fungera både i vanlig detaljvisning och vid jämförelse mellan originaltext och AI-text.
- Kolumnerna ska fortsatt ha **samma bredd och marginaler**.
- Den senast ändrade dokumenthöjden ska lagras lokalt, enligt regeln för vanlig dokumentvisning.

## 9. Bevarade funktioner från originalreglerna

### 9a. YouTube-dokument

- YouTube-dokument får visa originalrubrik, exakt publiceringsdatum när känt, källa YouTube, kanal/utgivare och klickbar YouTube-länk.
- Inbäddad YouTube-spelare ska kunna visas. Behörighetsreglerna i avsnitt 4 gäller fortfarande; det finns ingen PUBLIC-roll.

### 9b. Statistik och storleksändring

#### Statistik: Statistik för markerad text

När användaren markerar text i en detaljerad nyhetsdokument ska appen visa statistik för:
- ingressens antal ord och bokstäver,
- dokumentets antal ord och bokstäver,
- den markerade textens antal ord och bokstäver.

Statistiken visas i en flytande textruta **ovanför dokumentets rubrik**. Rutan ska följa med vid rullning i den detaljerade dokumentrutan så att statistiken förblir synlig.

#### Storlek: Storleken på den detaljerade dokumentrutan

Den stora dokumentrutan som visar både ingress och den fullständiga detaljerade dokumenttexten ska kunna ändras i höjd genom att användaren drar i rutans nederkant.

Detta ska fungera:
- med mus på dator,
- med pekning/touch på mobil och surfplatta.

Användaren ska kunna göra rutan högre för att se fler rader samtidigt eller lägre för att spara skärmutrymme.

Den senast valda höjden sparas lokalt i den aktuella webbläsaren.



### 9c. Meddelanden efter Spara önskemål

- Efter lyckad sparning visas **Önskemålen är hämtade. Kom ihåg att trycka på Uppdatera filtrering.**
- Meddelandet försvinner när användaren klickar eller trycker någon annanstans i appen.
- Den gamla regeln att **Uppdatera filtrering** ska fungera som **F5** är upphävd och får inte återinföras. Knappen filtrerar utan att ladda om appen.

### 9d. Säker lagring och användargränssnitt

- Dokumentfilen finns tillsammans med appen på GitHub Pages.
- Filter, sortering, favoriter och arkivering lagras lokalt; VIP:s filter återställs enligt avsnitt 4.
- HämtaNyheter får bara visas för verifierad ägare och får inte visas för VIP.
- Tekniska upplysningar om lagring ska stå i regeldokumentet, inte som förklarande text under dokumenten i appen.

## 10. Ytterligare detaljer som bevarats vid genomgång av originalfilen

- **YouTube** är ett särskilt dokumentfall: visa kanal/utgivare när de är kända, publiceringsdatum, källa och inbäddad spelare. Originaltextbegränsningen för VIP gäller fortfarande.
- **Statistikrutans placering:** Den ska visas ovanför dokumentrubriken eller i respektive jämförelsekolumn och följa med vid rullning.
- **Höjdreglaget:** Den detaljerade dokumentrutan ska kunna göras både högre och lägre. Reglaget ska fungera på dator, mobil och surfplatta och den valda höjden sparas lokalt.
- **Ägarens inloggning:** Ägarfunktioner kräver verifierad GitHub-token med åtkomst till privata Data-repot. VIP ska inte få originaltext enbart genom att manipulera visningen.
- **Sparmeddelandet:** Efter lyckad sparning av önskemål visas påminnelsen om Uppdatera filtrering. Meddelandet försvinner vid nästa klick eller tryck någon annanstans i appen.
- **Fritexten:** Endast ägaren får ändra önskemålstexten. GPT och appen ska arbeta med en kopia och får inte skriva om originalet i textrutan.
- **Ordval:** Använd **Dokument**, **Dokumenttyp**, **IT-Nyhet**, **IT-Fakta** och **IT-YouTube**. Äldre beteckningar som **IT-Dokument** ska inte återinföras.
- **Dokumentversioner:** För IT-Fakta skapas en ny post och ett nytt versionsnummer när innehållet ändras. Äldre versioner bevaras tills ägaren väljer att arkivera dem.

Originalfilen `Regler_Nyheter_original.md` behålls oförändrad som historisk referens. Tidigare regler om PUBLIC, omskrivna originalrubriker och separata originalknappar ska inte återföras.
