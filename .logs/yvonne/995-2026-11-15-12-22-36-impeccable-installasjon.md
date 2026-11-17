# Impeccable-installasjon

## 2026-11-15 kl. 12:22 — Yvonne

### Oppgave
Installere design-skillen Impeccable (Paul Bakaus) for Claude Code før UX-arbeidet starter. Brukeren ba om å søke på nett etter installasjonskommandoen og kjøre den.

### Plan
- Fant den offisielle installasjonen i README-en til npm-pakken `impeccable` (siste versjon 4.9.1): `npx impeccable install`.
- Kjørte den uten spørsmål underveis, bare for Claude Code og bare for dette prosjektet: `npx -y impeccable@4.9.1 install --providers=claude --scope=project`.

### Resultat
- `.claude/skills/impeccable/` (ca. 24 MB, inkludert motoren `impeccable.exe` v0.1.23 for windows-x64).
- `.claude/agents/`: fire subagenter (`impeccable-asset-producer`, `-documenter`, `-finish-reviewer`, `-manual-edit-applier`).
- Hooks i `.claude/settings.local.json` (git-ignorert): SessionStart, PostToolUse på Edit/Write (sjekker UI-filer) og Stop (en grundig designgjennomgang).
- Installasjonen er ikke committet.
- Neste steg: last inn Claude Code på nytt, og kjør `/impeccable init` (skriver `PRODUCT.md`).

### Åpne punkter
- Avklar om `.claude/skills/impeccable/` og `.claude/agents/` skal committes, slik at gruppen får skillen. Mappen inneholder en binærfil på ca. 24 MB. Alternativet er at hvert medlem kjører `npx impeccable install` selv. Hookene ligger i `settings.local.json` og blir uansett ikke delt.
- Kjør `/impeccable init` etter omstart, før `bmad-ux`.

## 2026-11-17 kl. 19:02 — Yvonne

### Oppgave
Bestemme om Impeccable skal ligge i repoet. Gruppen har bare ett medlem, men foreleser og sensor skal kunne se alt.

### Plan
- Committe `.claude/agents/` og `.claude/skills/impeccable/`. `.claude/settings.local.json` med hookene er fortsatt git-ignorert.

### Resultat
- Committet som 30fc14b: 63 filer. Den største er `impeccable.exe` på 21 MB, som er under GitHubs grense på 100 MB.
- Ikke pushet. Brukeren pusher selv.
- Lukket det åpne punktet i issues.md.

### Åpne punkter
- `/impeccable init` er ikke kjørt (punktet står allerede i issues.md).
