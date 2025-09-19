import { Config } from "@src/entities/entities";

export const CONFIG: Config = {
  xRapid: {
    apiKey: import.meta.env.VITE_API_KEY_XRAPID!,
    apiHost: import.meta.env.VITE_API_HOST_XRAPID!,
  },
  firebase: {
    apiKey: import.meta.env.VITE_API_KEY_FIREBASE!,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN_FIREBASE!,
    projectId: import.meta.env.VITE_PROJECT_ID_FIREBASE!,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET_FIREBASE!,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_FIREBASE!,
    appId: import.meta.env.VITE_APP_ID_FIREBASE!,
  },
};
