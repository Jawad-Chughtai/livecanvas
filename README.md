# livecanvas

**Live HTML/CSS/JS canvas — code with live preview**

Live demo: [Click here for live demo](https://livecanvas.jawadchughtai.com)

---

## What it is

A small, focused Angular (v19) portfolio project that provides a browser-based canvas where you can edit HTML, CSS and JavaScript with a real-time preview. Projects are saved to `localStorage` and can be created, renamed and deleted.

## Tech stack

* Angular v19
* TypeScript, SCSS, HTML
* Monaco Editor (for the code editor)
* Built with `yarn`
* MIT License

## Key features

* Live HTML/CSS/JS preview with an output window
* Monaco-based editors for HTML, CSS and JS
* Project CRUD (create / rename / delete) persisted to `localStorage`
* Auto Save and Auto Run toggles (when enabled, changes are saved and preview updates instantly; otherwise use the UI buttons)
* Custom theme and component showcase page
* Responsive homepage with hero section

## Limitations / design notes

* Persistence is `localStorage` only (no authentication) — by design for a lightweight portfolio demo
* No server or backend — everything runs in the browser

## Quick start

```bash
# clone
git clone https://github.com/Jawad-Chughtai/livecanvas.git
cd livecanvas

# install
yarn

# run locally (development server)
yarn start

# build for production
yarn build
```

> If your environment uses `npm` instead of `yarn`, you can run the equivalent `npm install` and `npm start` / `npm run build` commands.


## How to use

1. Open the app (local dev server or the live demo).
2. Create a new project from the editor page.
3. Edit HTML, CSS, and JavaScript in the Monaco editors.
4. Toggle **Auto Save** / **Auto Run** as desired. When enabled, edits are persisted to `localStorage` and the preview updates automatically.
5. Rename or delete projects from the project list.

## Screenshots

<img width="1909" height="903" alt="image" src="https://github.com/user-attachments/assets/d8b7b945-9e6d-4fd6-8cf1-09c7e0a4a6b5" />

<img width="1908" height="905" alt="image" src="https://github.com/user-attachments/assets/03077fd9-ccec-47e0-a18a-00fc4b2ed222" />

<img width="1892" height="884" alt="image" src="https://github.com/user-attachments/assets/3fe9ed4f-aa41-48cc-af87-10e967626a8c" />

<img width="1901" height="905" alt="image" src="https://github.com/user-attachments/assets/2f621d6e-6215-43e8-b830-84ac4183922f" />


## Attribution

Uses Monaco Editor and Angular. See `package.json` for full dependency list.

## License

This project is released under the MIT License. See `LICENSE` for details.
