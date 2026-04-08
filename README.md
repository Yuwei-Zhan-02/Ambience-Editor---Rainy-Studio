# Rainy Studio

An immersive writing editor built with React and Vite.

Rainy Studio is a vibe-focused text editor designed to make writing feel like sitting inside a rainy scene. It combines a centered writing panel, scene switching, adjustable typography, and animated rainy background effects to create a calm, atmospheric writing experience.

## Features

- Scene switching for different writing moods
  - Rainy Forest
  - Rainy Room
  - Rainy Lake
- Adjustable rain intensity
- Adjustable font family and font size
- Centered writing panel floating above the background
- Full-screen immersive layout
- Rain-on-glass shader background effect
- Built with React + Vite for fast iteration

## Tech Stack

- React
- Vite
- twgl.js
- WebGL shader-based rain background

## Project Structure

```bash
src/
├── components/
│   ├── Toolbar.jsx
│   ├── ScenePanel.jsx
│   ├── EditorPanel.jsx
│   └── RainBackgroundLayer.jsx
├── App.jsx
└── index.css

public/
└── backgrounds/
    ├── rainy-forest.jpg
    ├── rainy-room.jpg
    └── rainy-lake.jpg
````

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Open in browser

```bash
http://localhost:5173
```

## Current Status

This project is currently an early prototype.

Implemented so far:

* immersive full-screen UI
* floating toolbar and settings panel
* centered writing area
* scene-based background switching
* adjustable rain intensity
* adjustable font controls
* shader-based rainy background effect

Planned improvements:

* local save and file export
* better scene-specific tuning
* refined rain presets for different environments
* smoother transitions between scenes
* optional ambient sound
* further visual polish

## Notes

The project currently uses scene background images placed in `public/backgrounds/`.

To add or replace scenes, update:

* the image files in `public/backgrounds/`
* the scene mapping in `App.jsx`

## Shader Credit

The current rain-on-glass effect is adapted from a ShaderToy rain shader by Martijn Steinrucken (BigWings), licensed under Creative Commons Attribution-NonCommercial-ShareAlike 3.0. 

If you plan to use this project commercially, review the shader license carefully before doing so. 

## Development

This project was bootstrapped with Vite and uses a React-based component structure for UI and scene controls.

For production-ready improvements, future work may include:

* refactoring inline styles into a design system
* adding persistent storage
* improving accessibility
* refining performance for large screens and high-resolution images


