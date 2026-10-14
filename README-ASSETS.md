# Assets

## Signature-animatie

De scroll-sectie ("De scroll bestuurt de beweging") is geen frame-sequence meer
maar een live getekende vectorscène: `components/ui/OrbitScene.tsx`. Er zijn dus
geen frames om te leveren of te laden; de bol, ringen en kometen worden elk
frame uit 3D-wiskunde berekend en als SVG getekend, haarscherp op elk scherm.
Aanpassen: radius, kanteling en kleuren van de ringen staan bovenaan in `RINGS`.

---

## Projectbeelden

- Projectbeelden staan in `/public/images/projecten/<project>/`; welk beeld
  en welke uitsnede per project gebruikt wordt staat in `lib/content.ts`
  (`projects[].image` en `imagePosition`). 16:10 of breder werkt het beste.
- Over Sixtyfold gebruikt bewust geen portretfoto's maar een studiokaart.
- `npm run previews` genereert nog de oude placeholder-previews; die worden
  niet meer gebruikt.
