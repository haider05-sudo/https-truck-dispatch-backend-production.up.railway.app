# Truck Dispatching Management System - Extracted Frontend

This folder contains the React + Tailwind frontend code extracted from the uploaded PDF.

## Install

```bash
npm create vite@latest frontend
cd frontend
npm install
npm install react-router-dom axios
npm install -D tailwindcss @tailwindcss/vite
```

## Tailwind Vite config

Replace `vite.config.js` with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## Run

```bash
npm run dev
```
