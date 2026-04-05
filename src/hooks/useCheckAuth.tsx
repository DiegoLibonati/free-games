import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import type { UseCheckAuth } from "@/types/hooks";

import { useAuthStore } from "@/hooks/useAuthStore";
import { FirebaseAuth } from "@/firebase/config";

export const useCheckAuth = (): UseCheckAuth => {
  const { status, handleLogOut, handleLogin } = useAuthStore();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) {
        handleLogOut();
        return;
      }

      handleLogin({
        displayName: user.displayName!,
        email: user.email!,
        photoURL: user.photoURL!,
        uid: user.uid,
      });
    });
  }, []);

  return {
    status: status,
  };
};
