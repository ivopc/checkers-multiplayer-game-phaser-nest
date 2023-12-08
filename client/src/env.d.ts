/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MULTIPLAYER_WS_URL: string;
  readonly VITE_MULTIPLAYER_WS_PATH: string;
  readonly VITE_GAME_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
