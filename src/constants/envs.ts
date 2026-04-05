import type { Envs } from "@/types/envs";

const envs: Envs = {
  xRapid: {
    apiUrl: import.meta.env.VITE_API_URL_XRAPID as string,
    apiKey: import.meta.env.VITE_API_KEY_XRAPID as string,
    apiHost: import.meta.env.VITE_API_HOST_XRAPID as string,
  },
  firebase: {
    apiKey: import.meta.env.VITE_API_KEY_FIREBASE as string,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN_FIREBASE as string,
    projectId: import.meta.env.VITE_PROJECT_ID_FIREBASE as string,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET_FIREBASE as string,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_FIREBASE as string,
    appId: import.meta.env.VITE_APP_ID_FIREBASE as string,
  },
};

export default envs;
