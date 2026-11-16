---
name: CV & Jobb applikasjonsassistent
description: Rolig, redaksjonelt uttrykk – papir og blekk – for en veiviser som går gjennom én CV mot én annonse, ett trinn om gangen.
title: "DESIGN: CV & Jobb applikasjonsassistent"
status: final
created: 2026-11-15
updated: 2026-11-16
sources:
  - ../../prds/prd-G34-remme-2026-11-04/prd.md
  - .working/concept-14-valgt-kombinasjon/concept.md
colors:
  paper: '#F6F1E9'
  field: '#FFFDF9'
  ink: '#2A2420'
  on-ink: '#F6F1E9'
  ink-muted: '#5E544B'
  rule: '#D4C9BA'
  rule-soft: '#E6DDD0'
  field-border: '#8E806F'
  highlight: '#EEDFBF'
  toc-active: '#ECE3D5'
  status-met: '#4A6536'
  status-partial: '#7A5710'
  status-missing: '#8A3B2B'
  clay: '#9A4A2E'
  disabled: '#E4DACB'
  on-disabled: '#62584F'
  demo-band: '#EFE4CC'
  selection: '#D9E2EA'
typography:
  score:
    fontFamily: "Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', serif"
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  display:
    fontFamily: "Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', serif"
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.15'
    letterSpacing: -0.01em
  headline:
    fontFamily: "Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', serif"
    fontSize: 30px
    fontWeight: '400'
    lineHeight: '1.2'
  lede:
    fontFamily: "Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', serif"
    fontSize: 25px
    fontWeight: '400'
    lineHeight: '1.35'
  title:
    fontFamily: "Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', serif"
    fontSize: 22px
    fontWeight: '400'
    lineHeight: '1.3'
  quote:
    fontFamily: "Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', serif"
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.5'
  body:
    fontFamily: "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label:
    fontFamily: "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 15px
    fontWeight: '600'
    lineHeight: '1.4'
  meta:
    fontFamily: "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 3px
  DEFAULT: 4px
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 24px
  '6': 32px
  '7': 48px
  '8': 64px
  page-margin: 120px
  margin-left-width: 240px
  reading-column: 640px
  margin-right-width: 240px
  column-gap: 40px
components:
  button-primary:
    background: '{colors.ink}'
    text: '{colors.on-ink}'
    typography: '{typography.label}'
    height: 48px
    paddingX: '{spacing.5}'
    rounded: '{rounded.DEFAULT}'
  button-secondary:
    background: transparent
    text: '{colors.ink}'
    border: '1.5px solid {colors.ink}'
    typography: '{typography.label}'
    height: 48px
    rounded: '{rounded.DEFAULT}'
  button-disabled:
    background: '{colors.disabled}'
    text: '{colors.on-disabled}'
    rounded: '{rounded.DEFAULT}'
  link-back:
    text: '{colors.clay}'
    typography: '{typography.label}'
    underline: '1px {colors.clay}'
  text-field:
    background: '{colors.field}'
    border: '1px solid {colors.field-border}'
    border-focus: '1.5px solid {colors.ink}'
    border-error: '1.5px solid {colors.status-missing}'
    rounded: '{rounded.DEFAULT}'
    typography: '{typography.body}'
  char-counter:
    text: '{colors.ink-muted}'
    text-error: '{colors.status-missing}'
    typography: '{typography.meta}'
  step-indicator:
    circle-size: 24px
    done: '{colors.ink}'
    active-ring: 'double ring {colors.ink}'
    upcoming: '{colors.rule}'
    rule: '1px {colors.rule}'
  toc-item:
    typography: '{typography.label}'
    active-background: '{colors.toc-active}'
    count-text: '{colors.ink-muted}'
  score-heading:
    typography: '{typography.score}'
    text: '{colors.ink}'
  score-strip:
    height: 12px
    gap: 4px
    met: '{colors.status-met}'
    partial: 'half fill {colors.status-partial}'
    missing: 'dashed 1.5px {colors.status-missing}, no fill'
  type-badge-must:
    background: '{colors.ink}'
    text: '{colors.on-ink}'
    rounded: '{rounded.sm}'
    typography: '{typography.meta}'
  type-badge-should:
    background: transparent
    border: '1px solid {colors.ink}'
    text: '{colors.ink}'
    rounded: '{rounded.sm}'
  quote:
    typography: '{typography.quote}'
    style: italic
    highlight: '{colors.highlight}'
  sidenote:
    typography: '{typography.meta}'
    text: '{colors.ink-muted}'
    rule-above: '1px {colors.ink}'
  message:
    typography: '{typography.title}'
    rule: '1px {colors.rule}'
  demo-banner:
    background: '{colors.demo-band}'
    text: '{colors.ink}'
    height: 52px
  example-badge:
    background: '{colors.demo-band}'
    text: '{colors.ink}'
    rounded: '{rounded.sm}'
    typography: '{typography.meta}'
---

# CV & Jobb applikasjonsassistent – Design

Visuell identitet. Hvordan appen *virker* (flyt, tilstander, tekster) står i [EXPERIENCE.md](EXPERIENCE.md). Grunnlaget er det godkjente konsept 14, som er utseendet fra konsept 01 «Rolig rådgiver» brukt på flyten fra konsept 09 «Ett steg om gangen». Mockups står i [`mockups/`](mockups/). **Ved konflikt mellom en mockup og dette dokumentet gjelder dokumentet.**

## Brand & Style

Som en rolig studieveileder som har lest CV-en din grundig. Uttrykket er redaksjonelt: papir og blekk, en serif med setninger som overskrifter («Du er på 59 %.», «Dette er bra.»), luft og marger som i en fagbok. Appen skal føles trygg og ærlig, ikke som et dashbord eller et spill. Scoren er et svar i en setning, ikke et tall på en flis.

Det er tre grunnregler. Det positive kommer først, hvert treff vises med beviset (sitatet), og ingenting pyntes for å virke smartere enn det er.

## Colors

- **`{colors.paper}`** er bakgrunnen på alle sider. **`{colors.field}`** brukes bare inni tekstfelt, slik at feltene skiller seg fra papiret uten skygge.
- **`{colors.ink}`** er tekst, primærknapper, stegsirkler og aktive markører. Det finnes ingen egen merkefarge: blekket *er* aksenten. **`{colors.on-ink}`** er tekst på blekk.
- **`{colors.ink-muted}`** er sekundærtekst (ingresser, tegntellere, sidenoter). Den er tonet varmt, ikke grå.
- **`{colors.rule}`** og **`{colors.rule-soft}`** er hårfine skillelinjer. Innhold skilles med linjer, ikke med kort eller bokser.
- **`{colors.field-border}`** er kanten på tekstfelt (3,4:1 mot papir).
- **`{colors.highlight}`** ligger bak sitater, som en markørstrek. Den brukes til sitater og ingenting annet.
- **Statusfarger:** **`{colors.status-met}`** (mose), **`{colors.status-partial}`** (oker) og **`{colors.status-missing}`** (tegl). De brukes bare på statusord, statustegn og poengstripen, aldri som flatefarge bak innhold. Tegl er også feilfargen (for lang tekst).
- **`{colors.clay}`** er lenker og navigasjonslenker, for eksempel «← Endre CV eller annonse» og «Vis alt på én side».
- **`{colors.disabled}`** / **`{colors.on-disabled}`** brukes til deaktivert «Analyser».
- **`{colors.demo-band}`** brukes bare i demomodus: banneret og «Eksempeldata»-merkene.
- **`{colors.selection}`** er markert tekst i et felt.

All tekst har minst 4,5:1 kontrast mot underlaget, og UI-kanter minst 3:1. Status skilles aldri bare med farge (se Shapes og Components).

## Typography

To familier, begge systemfont-stakker. Fontene lastes ikke ned.

- **Serif (Georgia-stakken)** brukes til det som *leses*: scoren (`{typography.score}`), overskrifter som hele setninger (`{typography.display}` og `{typography.headline}`), ingresser (`{typography.lede}`), kravtitler og meldinger (`{typography.title}`) og sitater (`{typography.quote}`, kursiv).
- **Grotesk (Segoe UI-stakken)** brukes til det som *betjenes*: brødtekst og hint (`{typography.body}`), knapper, feltetiketter og innholdsfortegnelse (`{typography.label}`), og tegntellere og sidenoter (`{typography.meta}`).
- Minste tekst er 13 px. Prosent skrives med hardt mellomrom («59 %»).
- Overskrifter er hele setninger med punktum. Det brukes ingen versaler, unntatt den loddrette marglinjen «EKSEMPELDATA · IKKE DIN EGEN TEKST».

## Layout & Spacing

Bare desktop, med et artboard på 1440 px og sidemarg `{spacing.page-margin}`.

- **Inputsiden** har to spalter. Til venstre (ca. 400 px) står presentasjonen av appen med fire prinsipper. Til høyre (ca. 680 px) står veiviseren.
- **Resultatsiden** har tre marger som i en fagbok. Venstre marg (`{spacing.margin-left-width}`) har innholdsfortegnelsen og «Endre CV eller annonse». I midten står lesekolonnen (`{spacing.reading-column}`, ca. 70 tegn), der ett trinn vises om gangen. Høyre marg (`{spacing.margin-right-width}`) har sidenoter, som «Slik er scoren regnet» og «Sitatkontrollen».
- Avstander går etter skalaen `{spacing.1}`–`{spacing.8}`. Det er mer luft over overskrifter enn under dem.
- Under ca. 1280 px flyttes sidenotene inn under kravet de hører til. [ASSUMPTION: bruddpunktet er ikke tegnet]

## Elevation & Depth

Flatt. Det brukes ingen skygger, glass eller gradienter. Dybde lages bare med papir mot felt (`{colors.paper}` / `{colors.field}`) og hårfine linjer.

## Shapes

- Knapper, felt og merker har lite avrundede hjørner (`{rounded.DEFAULT}`, merker `{rounded.sm}`). Sirkler brukes bare til statustegn og stegsirkler.
- **Statustegn:** truffet er en fylt sirkel, delvis truffet er en halvfylt sirkel og mangler er en tom sirkel. De brukes i innholdsfortegnelsen, ved hvert krav og i fordelingen.
- **Må/bør:** må-krav har et fylt blekkmerke, og bør-krav har et merke med bare omriss. Typen skilles på form, ikke bare på farge.
- Ikonene er tegnet med én strektykkelse (1,5 px). Det brukes ingen emoji.

## Components

| Komponent | Visuell spesifikasjon |
|---|---|
| Primærknapp | `button-primary`: blekk og papirtekst, 48 px høy og så bred som innholdet. Brukes til «Analyser», «Neste: …» og «Ja». |
| Sekundærknapp | `button-secondary`: blekkramme uten fyll. Brukes til «Nei», «Forrige: …», «Tilbake til oversikten» og «Bruk eksempel». |
| Deaktivert knapp | `button-disabled`: flat, uten ramme. |
| Tilbakelenke | `link-back`: leire med pil til venstre og understrek, for eksempel «← Endre CV eller annonse». I avslutningen av «Dette mangler» er samme handling en primærknapp. |
| Tekstfelt | `text-field`: tegnteller nederst til høyre («357 / 15 000 tegn»). Ved for lang tekst får feltet teglkant og telleren blir tegl. |
| Sammenslått steg | En rad mellom hårfine linjer: hake, etikett, første linje av teksten, tegnteller og «Endre». |
| Stegindikator | `step-indicator`: venstrejustert, med sirkel, etikett og hårfin linje mellom stegene (CV – Annonse – Analyser). Ferdig steg er en fylt sirkel med hake, og aktivt steg har dobbel ring. |
| Innholdsfortegnelse | `toc-item`: «Gjennomgang» med statustegn, navn og antall per trinn. Oversikten viser scoren. Det aktive trinnet har bakgrunnen `{colors.toc-active}`. |
| Score | `score-heading`: «Du er på 59 %.» med FR-8-setningen som ingress (`{typography.lede}`) og «Match-score mot …» i `{typography.meta}`. |
| Poengstripe | `score-strip`: én bit per krav, der må-krav er dobbelt så brede. Truffet er fylt, delvis er halvfylt og mangler er en stiplet ramme. Under stripen står «6,5 av 11 poeng». |
| Krav | Typemerke + statustegn + statusord, deretter kravtittel i serif, så sitat og/eller «Forbedringshint» (etikett i statusfarge, hint i `{typography.body}`). Kravene skilles med hårfine linjer. |
| Sitat | `quote`: kursiv serif i «guillemets» med markørstrek bak. |
| Sidenote | `sidenote`: i høyre marg, med blekklinje over og tekst i `{typography.meta}`. |
| Melding | `message`: en rolig serif-setning mellom to hårfine linjer, der resultatet ellers ville stått. Den står ikke i en farget boks. |
| Godt treff | Spørsmålet i serif mellom to blekklinjer, med «Ja» som primærknapp og «Nei» som sekundærknapp. |
| Demobanner | `demo-banner`: helt bånd under toppen med infoikon, «Demomodus – ingen API-nøkkel funnet» og README-lenke. |
| Eksempeldata-merke | `example-badge`: på feltene og over scoren. Resultatsiden har i tillegg en loddrett marglinje. |

Visuelle referanser: [inputside](mockups/01-landingsside.svg), [analyserer](mockups/02-analyserer.svg), [resultat](mockups/03-resultat-debrief.svg), [tilstander](mockups/04-tilstander.svg), [demomodus](mockups/05-demomodus.svg).

## Do's and Don'ts

| Gjør | Ikke gjør |
|---|---|
| Skill innhold med hårfine linjer og luft | Kort i kort, paneler med skygge, glass, gradienter |
| La scoren være en setning: «Du er på 59 %.» | Et stort tall med etikett og støttetall (hero-metric-flis) |
| Bruk statusfarge bare på statusord, tegn og stripe | Fargede bakgrunner eller fargede venstrekanter per status |
| Vis status med både tegn, ord og farge | Status som bare farge |
| Bruk markørstrek bare bak sitater | Markørstrek som generell utheving |
| Skriv overskrifter som hele setninger | Eyebrows, kickers eller etiketter i versaler over overskrifter |
| Tegn ikoner med én strektykkelse | Emoji eller blandede ikonstiler |
