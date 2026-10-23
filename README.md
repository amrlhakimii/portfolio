# Portfolio

Personal portfolio and digital garden for Amirul Hakimi, live at [amrlhakimi.my](https://amrlhakimi.my).

Built with React 19, TypeScript, Vite, TailwindCSS v4 and Framer Motion, deployed on Netlify. Two Netlify functions power the live Spotify now-playing widget and top-albums list.

## Scripts

```bash
npm run dev       # local dev server
npm run build     # type-check + production build
npm run lint      # eslint
node generate-resume-design.cjs   # regenerate public/AmirulHakimiCV.pdf
node generate-resume-ats.cjs      # regenerate public/AmirulHakimiCV-ATS.pdf
```

## Where content lives

| Content | File |
|---|---|
| Career timeline | `src/pages/Career.tsx` |
| Projects | `src/pages/Projects.tsx` |
| Profile, skills, fun facts | `src/pages/Profile.tsx` |
| Intro, bio, typed phrases | `src/pages/About.tsx` |
| Top ticker | `src/components/Layout.tsx` |
| Today I learned | `src/pages/TIL.tsx` |
| CV PDFs | `generate-resume-*.cjs` |

Spotify functions need `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` set in the Netlify environment.
