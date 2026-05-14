# Shoe Customiser

A Three.js product-viewer project for presenting and customizing a single 3D shoe in the browser.

## Overview

The current project includes:

- A split-screen layout with a left control panel and a right 3D viewport
- A rotating display base for presenting the shoe
- A modular shoe assembled from separate GLB parts: body, laces, and sole
- Real-time customization of shoe colour, lace colour, and sole colour
- Material presets for different finishes such as leather, matte, gloss, and rubber
- Orbit controls plus direct drag rotation on the shoe
- Automatic alignment of the shoe model to the centre of the display base

## Features

### 3D Presentation

- Dedicated viewport for the rendered scene
- Rotating base under the shoe
- Camera movement through `OrbitControls`
- Camera angle limited to avoid showing the underside of the base

### Customization

- Upper colour control
- Lace colour control
- Sole colour control
- Material finish selection
- Auto-rotation toggle
- Rotation speed slider

### Model Handling

- Angelo shoe loaded from three separate GLB files
- Parts grouped into a shared `shoeGroup`
- Bounding-box alignment used to centre the shoe on the base

## File Structure

- `index.html`
  Defines the page layout, custom UI panel, and viewport container.

- `setup.js`
  Creates the scene, camera, renderer, lighting, orbit controls, drag interaction, and resize logic.

- `loadModel.js`
  Loads the Angelo shoe GLB parts and adds them to the assembled shoe group when all assets are ready.

- `build.js`
  Builds the rotating base, stores customization settings, applies colour/material changes, and binds the custom UI controls.

- `animate.js`
  Runs the animation loop for the shoe and the rotating base.

- `run.js`
  Starts the application by initializing the scene, building objects, binding controls, and starting rendering.

## Running the Project

Serve the folder with a local web server and open it in the browser.

Example using Python:

```sh
cd CompGraphicsGroupProject
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```
