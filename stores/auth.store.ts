import create from "zustand";
import { combine } from "zustand/middleware";

import { resetTokenAsync, signIn, signOut } from "../services/auth";

export const useAuthStore = create(
  combine(
    {
      token: null as null | string,
      loading: true,
    },
    (set) => ({
      initialAuth: async () => {
        set({ loading: true });
        const { token } = await resetTokenAsync();
        if (token) {
          set({ token });
        }
        set({ loading: false });
      },
      signIn: async ({
        // These don't do anything.
        // Mocking some user input
        username,
        password,
      }: {
        username: string;
        password: string;
      }) => {
        set({ loading: true });
        const { token } = await signIn();
        set({ loading: false, token });
      },
      signOut: async () => {
        set({ loading: true });
        const { token } = await signOut();
        set({ loading: false, token });
      },
    })
  )
);
