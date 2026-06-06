# Assets — de scroll-scrub frame-sequence

De signature-animatie (`<ScrollScrubSequence />`) tekent een reeks losse frames
op een `<canvas>` en koppelt het framenummer aan de scrollpositie. Hieronder
precies hoe je de **echte** Higgsfield-output erin schuift.

> De site werkt en ziet er goed uit met de meegeleverde **placeholder-frames**,
> dus je kunt direct deployen en de assets later vervangen.

---

## 1. Wat de component verwacht

| Eigenschap   | Waarde                                                        |
| ------------ | ------------------------------------------------------------ |
| Locatie      | `/public/frames/`                                            |
| Naamgeving   | `frame_0001.webp`, `frame_0002.webp`, … (1-based, 4 cijfers) |
| Formaat      | **WebP** (aanbevolen) — JPG werkt ook                        |
| Aantal       | standaard **60** frames                                      |
| Resolutie    | max **1920px** breed; placeholders zijn 1600×900 (16:9)      |
| Aspect ratio | vrij — canvas tekent "cover" (vult, behoudt ratio)           |

Het aantal frames staat in **`lib/content.ts`** → `showcase.frameCount`.
Verander je het aantal, pas dan dat getal aan (de component leest het daarvandaan).

```ts
// lib/content.ts
export const showcase = {
  frameCount: 60, // ← zet hier jouw werkelijke aantal frames
  // ...
};
```

## 2. Higgsfield → frames (werkwijze)

1. Genereer in Higgsfield een **korte, naadloos loopbare** abstracte animatie:
   donkere tinten + de accentkleur (`#6E5BFF` / cyaan `#3DD6F5`). Denk aan een
   langzaam roterend vloeibaar/metaalachtig object, een morphende gradient-blob
   of flowing particles. **Loopbaar** is belangrijk: bij terugscrollen moet het
   begin naadloos op het eind aansluiten.
2. Exporteer als video (MP4/MOV), 16:9, liefst 1920×1080.
3. Knip de video in losse frames. Mik op **60–120 frames** voor vloeiendheid
   zonder de preload te zwaar te maken.

   Met **ffmpeg** (60 frames, geschaald naar 1600 breed, als WebP):

   ```bash
   ffmpeg -i jouw-animatie.mp4 -vf "scale=1600:-1,fps=20" -qscale 80 \
     public/frames/frame_%04d.webp
   ```

   - `fps=20` × 3 sec ≈ 60 frames. Pas `fps`/lengte aan naar wens.
   - `%04d` geeft de juiste `0001`-nummering.
4. Controleer dat de nummering bij `0001` begint en aaneengesloten is.
5. Zet `showcase.frameCount` gelijk aan het aantal bestanden.

## 3. Optimalisatie-tips

- Houd elk frame **< ~150 KB**. WebP quality ~80 is meestal genoeg.
- Meer frames = vloeiender maar zwaardere preload. 60–90 is een goede balans.
- Alle frames worden vooraf geladen (met progress-loader) vóór het scrubben
  start — vandaar dat bestandsgrootte telt voor de laadtijd.

## 4. Placeholder regenereren

De meegeleverde placeholder-frames (roterende orb + ringen) zijn met een script
gemaakt. Opnieuw genereren:

```bash
npm run frames
```

Dat script staat in `scripts/generate-frames.mjs` (gebruikt `sharp`). Verwijder
het gerust zodra je echte frames hebt.

## 5. Project-previews & portret

- `/public/images/terra.jpg` en `victor.jpg` zijn placeholder-previews —
  vervang door echte screenshots (16:10 ziet er het beste uit).
- `/public/images/jayden.jpg` — plaats hier je portretfoto en vervang in
  `components/sections/About.tsx` de gradient-placeholder door een `<Image>`.
- Placeholder-previews opnieuw genereren: `npm run previews`.
