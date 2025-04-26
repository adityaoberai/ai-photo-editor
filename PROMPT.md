# Windsurf Prompt: AI Photo Editor Web App (SvelteKit + PixiJS)

---

## Overview

I want to build a **web-based AI-powered photo editor** for photographers.  
The app should combine **AI-driven photo analysis** with **manual professional-grade editing tools**, powered by **GPU-accelerated WebGL rendering** via **PixiJS**.

The editing experience must be **fast, mobile-optimized**, and support **high-resolution images** from day one.

AI should be used **only** for **photo analysis** and **text-to-edit translation** — **not** for directly modifying pixels.

All backend logic must live inside **SvelteKit server-only modules**.  
No Dockerization is needed — the app should be deployable easily to platforms like Vercel, Netlify, or Node.js servers.

---

## Core Features

### 1. Photo Upload & Display
- Upload high-resolution images (JPEG, PNG; optional RAW support later).
- Load uploaded images as **PixiJS sprites** inside a WebGL canvas.
- Enable zooming, panning, and fit-to-screen viewing.
- Extract and display EXIF metadata (ISO, aperture, shutter speed, camera model).

### 2. AI-Powered Photo Analysis (Advisory Only)
- Users can input free-text prompts like:
  > "How can I improve this photo?"
- AI analyzes the uploaded image and/or prompt and returns:
  - A description of the photo's issues (e.g., underexposed, low contrast).
  - A structured list of recommended edits (e.g., "Increase exposure by 20", "Add warmth by 10").
- Users manually review and apply suggested edits via sliders.

### 3. Manual Photo Editing Tools (WebGL Filters)
Provide real-time, GPU-accelerated adjustments using PixiJS filters:
- **Basic Adjustments**: Exposure, brightness, contrast, highlights, shadows, whites, blacks.
- **Color Controls**: Temperature, tint, vibrance, saturation, HSL adjustments.
- **Tone Curve Editor** (optional later).
- **Details & Effects**: Texture, clarity, sharpening, noise reduction, vignette, grain.
- **Transform Tools**: Crop, rotate, flip, straighten.
- **Before/After Preview**: Toggle to view original versus edited versions.

Each adjustment directly updates WebGL shader uniforms for live feedback.

### 4. Text-to-Edit Translation (Auto-Apply AI Suggestions)
- Users input creative descriptions like:
  > "Make this look like an early morning beach shot."
- AI backend translates the description into a structured set of filter adjustments.
- App automatically applies the edits via WebGL shaders.
- Users retain full control to tweak or undo auto-applied edits.

### 5. Edit History (Undo/Redo)
- Track a full history of user actions.
- Enable undo and redo operations seamlessly.
- Support optional "snapshots" to allow branching edits.

### 6. Export & Save
- Export the final edited photo from the WebGL canvas as:
  - High-resolution JPEG or PNG.
- Allow export of applied settings as:
  - A JSON file for future reuse or sharing.

---

## Mobile Editing UI

Mobile-first, touch-optimized editing experience:
- Large, responsive sliders and buttons.
- Swipe gestures for Before/After comparisons.
- Bottom-drawer interface for editing tools.
- Single-column layout focused on image editing.
- PWA-ready (Progressive Web App) for home-screen installation and offline editing.

---

## Tech Architecture

### Frontend
- Framework: **SvelteKit**
- Rendering: **PixiJS** (WebGL)
- Real-time edits applied through WebGL shaders
- Responsive and mobile-optimized

### Backend
- Built into **SvelteKit server-only modules** (`+server.ts` or `+server.js`).
- Responsibilities:
  - Process AI analysis requests and text-to-edit translations.
  - Manage upload metadata extraction (optional).

### AI Integration
- Use external AI APIs (OpenAI Vision, Replicate, or similar) for:
  - Descriptive image analysis and improvement suggestions.
  - Text-to-edit translation (mapping creative prompts to structured edits).
- Important:  
  AI only **generates settings**. Pixel editing is done locally via WebGL.

### Image Processing
- Apply all edits using GPU-accelerated WebGL shaders through PixiJS.
- No server-side image manipulation.

---

## Deployment
- Standard full-stack SvelteKit app.
- No Dockerization.
- Deployable to Vercel, Netlify, or traditional Node.js hosting.

---

# Suggested Project Structure

```plaintext
src/
├── lib/
│   ├── filters/                 # PixiJS shader filters (brightness, contrast, etc.)
│   ├── ai/
│   │   ├── analyze.ts            # Functions to handle photo analysis requests
│   │   └── textToEdit.ts         # Functions to handle text-to-edit translation
│   └── utils/
│       ├── exif.ts               # Helper to extract EXIF metadata from uploaded images
│       └── export.ts             # Functions to export edited images
│
├── routes/
│   ├── upload/
│   │   ├── +page.svelte          # Photo upload and EXIF extraction UI
│   ├── editor/
│   │   ├── +page.svelte          # Main editing interface (WebGL canvas + UI controls)
│   │   ├── editorStore.ts        # Svelte store to manage current edits, undo/redo history
│   └── api/
│       ├── analyze/
│       │   └── +server.ts        # Server module for AI analysis
│       └── text-to-edit/
│           └── +server.ts        # Server module for text-to-edit translation
│
├── components/
│   ├── Slider.svelte             # Reusable slider component
│   ├── ToolPanel.svelte          # Bottom sheet / side panel for editing tools
│   └── MobileToolbar.svelte      # Mobile optimized toolbar (Undo, Redo, Export)
│
├── app.d.ts                      # Type definitions
└── styles/
    ├── editor.css                # Styles specific to the editor
    └── global.css                # Global styles
```

---

# 🛠 Build Plan

## Phase 1: MVP - Manual Editing Flow

**Goal:**  
Get the core photo editing experience working with manual controls and WebGL rendering.

**Scope:**
- SvelteKit app setup
- Upload high-res images
- Load image into PixiJS WebGL canvas
- Basic editing tools:
  - Brightness
  - Contrast
  - Exposure
  - Temperature
  - Vibrance
- Undo/redo stack
- Export edited photo (JPEG/PNG)
- Mobile-optimized UI (responsive design)

**Deliverable:**  
Working photo editor: Upload → Edit → Export.

---

## Phase 1.5: AI Analysis Integration

**Goal:**  
Enable AI-powered *analysis only* — advising on photo improvements.

**Scope:**
- `/api/analyze/+server.ts`
- External AI API integration
- Output:
  - Issue diagnosis
  - Recommended edits
- Manual apply of suggestions.

**Deliverable:**  
Smart AI suggestions without automatic application.

---

## Phase 2: Text-to-Edit Translation

**Goal:**  
Let users describe the photo style they want — auto-apply edits based on their description.

**Scope:**
- `/api/text-to-edit/+server.ts`
- AI translates creative prompts into structured edits
- Auto-apply edits while allowing manual tweaking.

**Deliverable:**  
Natural-language-driven editing flow.

---

## Phase 4: Advanced Color Grading Features

**Goal:**  
Introduce more professional color grading and tone control tools.

**Scope:**
- Add **Tone Curve Editor** (S-curve, RGB channels).
- Add **Split Toning** (different hue for highlights and shadows).
- Add **Color Wheels** for advanced color grading:
  - Lift (shadows)
  - Gamma (midtones)
  - Gain (highlights)
- Add support for uploading and applying **LUTs** (Look-Up Tables) for cinematic styles.

**Deliverable:**  
High-end color grading capabilities comparable to professional tools like Lightroom and Capture One.

---

# Visual Timeline

| Phase | Core Focus | Estimated Time (assuming 1–2 developers) |
|:-|:-|:-|
| Phase 1 | Core photo editor with manual editing | 2–3 weeks |
| Phase 1.5 | AI photo analysis and recommendations | 1–2 weeks |
| Phase 2 | Text-to-edit translation and auto-application | 1–2 weeks |
| Phase 4 | Advanced color grading features | 2–3 weeks |

---

# Milestone Ship Points

✅ End of Phase 1 — MVP Editor ready: Upload → Edit → Export manually.  
✅ End of Phase 1.5 — Smart editing advisor added.  
✅ End of Phase 2 — Natural-language-driven editing complete.  
✅ End of Phase 4 — Advanced professional color grading added.

---

# AI Photo Editor Setup Instructions

```bash
# 1. Create a new SvelteKit project
npx sv create
```
Follow the prompts:
- Choose **Skeleton Project**
- Use **TypeScript** (recommended ✅)
- Enable **ESLint** (yes ✅)
- Enable **Prettier** (yes ✅)

```bash

# 2. Install project dependencies
npm install

# 3. Install PixiJS for WebGL rendering
npm install pixi.js
```

# 4. Set up the Inter font
Add the following line inside the `<head>` tag of `src/app.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

# 5. Set up base CSS styling
Create or edit `src/app.css` or `src/styles/global.css`:

```css
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: #fafafa;
  color: #1a1a1a;
}
```

# 6. Start the development server

```bash
npm run dev -- --open
```
