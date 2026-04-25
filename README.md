# Shoe Customiser

A basic Three.js computer graphics project for viewing and customising a simple 3D shoe scene in the browser.

## Overview

The project creates a WebGL scene with:

- A camera, renderer, lights, and orbit controls
- A rotating display platform
- A placeholder 3D shoe model
- Basic mouse interaction for rotating the shoe
- A GUI for customization

## Files

- `index.html` loads Three.js, OrbitControls, dat.GUI, and the project scripts.
- `setup.js` creates the scene, camera, renderer, lighting, controls, pointer interaction, and resize handling.
- `build.js` defines materials and builds the platform, shoe model, and GUI placeholders.
- `animate.js` contains the animation loop for the shoe and platform.
- `run.js` starts the application.

## Running the Project

Open `index.html` in a browser, or serve the folder with a local web server and visit the page.

Example using Python:

```sh
cd CompGraphicsGroupProject
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```
