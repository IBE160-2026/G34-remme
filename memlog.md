---
topic: G34-remme product idea
updated: 2026-09-17T16:32
---

- (idea by user) Nettside for CV/soknad: bruker skriver en CV/soknad, siden hjelper med a tilpasse den til konkrete stillingsannonser slik at man slipper a skrive helt nye soknader for hver jobb
- (decision by user) Kjernemekanikk: KI analyserer stillingsannonse (tekst/lenke) og foreslar konkrete endringer i bruker CV/soknad (ordlyd, rekkefolge, hva som fremheves) - ikke helt nytt utkast, ikke bare manuell sammenligning
- (decision by user) Malgruppe: alle jobbsokere generelt (bred malgruppe), ikke avgrenset til nyutdannede eller en bransje
- (decision by user) Omfang for skoleprosjekt: enklere prototype/demo - en okt uten lagring/innlogging (lim inn CV+annonse, fa tilpasset resultat), ikke fullverdig nettside med kontoer
- (note) Web-research digest: konkurrenter (Jobscan, Teal, Rezi, Enhancv/Kickresume, LinkedIn/ChatGPT ad-hoc) bruker to-stegs monster: parse jobbannonse+CV, sa match/gap-score + LLM omskrivning. Ingen lukker helt loopen fra en master-CV til ferdig skreddersydd resultat - krever manuell etterredigering. Kjente svakheter: generisk/robotisk tekst, overdrivelse/oppdiktede tall fra LLM, arbeidsgivere flagger/avviser KI-generert soknadstekst (~62% i en undersokelse, kilde usikker), nokkelord-stapping regnes i 2026 som mindre viktig enn ATS-parsing/formattering
- (decision by user) Differensiering vs konkurrenter: fokus pa match-score + gap-analyse (ligner Jobscan) - mer om a vise hvor godt CV treffer annonsen og hva som mangler, mindre om at KI skriver om teksten selv
- (decision by user) Tillit/sannhet: KI skal kun bruke/omformulere/omprioritere innhold som allerede star i brukerens CV - aldri legge til nye pastander, tall eller erfaring som ikke finnes i kildeteksten
- (decision by user) Teknologivalg: ingen krav fra kurset - fritt valg av stack for gruppa
- (gap) Spenning: tidligere valgt kjernemekanikk var 'KI foreslar konkrete tekstendringer', men differensiering-svar peker mer mot match-score+gap-analyse (a la Jobscan). Ma avklares med bruker om KI fortsatt skal foresla konkret ny tekst, eller om hovedleveransen er score+gap uten tekstforslag
- (decision by user) Spenning lost: gap-analyse/match-score er hovedleveransen. Konkrete tekstforslag (ferdig omskrevne setninger) er ute av scope na, men vurderes som fremtidig utvidelse
- (decision by user) Sprak: nettsiden/appen skal vaere pa norsk
- (gap) Ukjent: konkret innleveringsfrist og gruppestorrelse - bruker svarte ikke pa dette sporsmalet. Apent punkt for scope-realisme
- (event) Bruker valgte veilederspor (coaching path) - gar seksjon for seksjon
- (insight by user) Problem, to feilmodus hos jobbsokere i dag: (1) generisk soknad/CV som sendes til alle - for uspesifikk til a fore til intervju. (2) De prover a tilpasse manuelt, men rekker ikke skrive om delen om seg selv innen fristen, eller klarer ikke se hvilke punkter i CV-en som faktisk er viktige a fremheve opp mot stillingsannonsens kvalifikasjonskrav
- (decision by user) Losning/MVP avklart: resultatside viser (1) samlet match-score, (2) liste over krav fra annonsen delt i ma-krav/bor-krav med treff/mangler, (3) henvisning til hvor i CV-teksten et treff kommer fra, (4) forbedringshint per gap-punkt (f.eks. 'nevn X tydeligere / flytt opp') - IKKE ferdig omskrevne setninger. Ferdig omskrevet tekst (fullstendige setninger a lime inn) er eksplisitt utsatt til fremtidig utvidelse, ikke MVP
- (decision by user) Differensiering bekreftet: mellom Jobscan (kun score) og Teal/Rezi (full omskriving, risiko for generisk/oppdiktet) - ma/bor-prioritert gap-liste koblet til hvor i CV-en et treff kommer fra, med streng regel om a aldri finne pa noe som ikke star i brukerens egen tekst
- (decision by user) Suksesskriterier: losningen trekker korrekt ut de viktigste punktene fra annonsen og formulerer det slik at bruker forstar hva som kreves for en god soknad, nok informasjon til at bruker selv kan rette CV/soknad opp mot 90-100% match
- (decision by user) Scope: en stillingsannonse om gangen. CV kan lastes opp som tekst eller PDF. Stillingsannonse kan gis som lenke (beste), limt inn tekst, eller bilde/skjermutklipp
- (note by user) Visjon utover kurset: innlogging slik at tidligere CV/soknadsinformasjon lagres og huskes, for lettere a generere bedre svar over tid (bygger videre pa dagens okt-uten-lagring MVP)
- (note) Bruker ba om a ikke blande engelsk og norsk i samme svar under samtalen - hold ett sprak konsekvent (norsk er valgt for denne samtalen og for produktet)
- (decision by user) Produktnavn: CV & Jobb applikasjonsassistent
- (event) Forste fullstendige utkast av brief.md og addendum.md skrevet, basert pa samtalens beslutninger. Klar for brukergjennomgang for finalize/polish
- (decision by user) Apent sporsmal avklart delvis: soloprosjekt (en person). Product brief skal leveres innen 20.09.2026. Endelig frist for selve applikasjonen/kursprosjektet fortsatt uklar
- (event) Kvalitetsgjennomgang (struktur+sprak) kjort og anvendt pa brief.md: fjernet duplisert 90-100%-setning i Losningen, rettet pronomen-inkonsekvens i Problemet, naturligere formulering i Visjon, delt opp en lang setning i Sammendrag. Addendum.md vurdert ren, ingen endringer. Brief status fortsatt draft - klar for bruker a sette til final
