import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface AuthState {
    userProfile: any;
    addUser: (user: any) => void;
}

const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            userProfile: null,
            addUser: (user) => set({ userProfile: user }),
            removeUser: () => set({userProfile: null})
        }),
        {
            name: 'auth' // The key for localStorage
        }
    )
);

export default useAuthStore;
