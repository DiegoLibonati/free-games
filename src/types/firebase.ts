interface FirebaseOkTrue {
  ok: true;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

interface FirebaseOkFalse {
  ok: false;
  errorCode: string;
  errorMessage: string;
}

export type SignInWithGoogle = FirebaseOkTrue | FirebaseOkFalse;
export type RegisterUserWithEmail = FirebaseOkTrue | FirebaseOkFalse;
export type LoginWithEmailPassword = FirebaseOkTrue | FirebaseOkFalse;
