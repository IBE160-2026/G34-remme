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
