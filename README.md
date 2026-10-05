# BLS Workout App
### A mobile-first strength-training tracker

A React application for following a Bigger Leaner Stronger workout split, logging training, and tracking food, cardio, and body measurements.

## Features

- A five-day workout split with exercise, set, rep, and rest guidance.
- Workout logging and training streaks.
- Exercise guides with setup, execution, and common mistakes.
- Food and macro tracking.
- Cardio logs and body-progress tracking.
- Profile settings and browser-local persistence.

## Stack

React · Vite · Tailwind CSS · Lucide React

## Run locally

```bash
git clone https://github.com/msehgal001/BLS_Workout_App.git
cd BLS_Workout_App
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build and deploy

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host. For Vercel, use the Vite preset, `npm run build` as the build command, and `dist` as the output directory.

On iPhone, open the deployed app in Safari and choose **Share → Add to Home Screen**.

## Source guide

| Path | Responsibility |
| --- | --- |
| `src/App.jsx` | Workouts, guides, logs, dashboard, and profile |
| `src/index.css` | Application styling |
| `src/main.jsx` | React entry point |
| `public/` | Static assets |
| `vite.config.js` | Build configuration |

Logs are saved in the current browser's localStorage. They do not automatically sync across devices.

Built by [Madhav Sehgal](https://msehgal.net).
