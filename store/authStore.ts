import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { BASE_URL } from '@/utils';

interface AuthState {
  userProfile: any;
  allUsers: any[];
  addUser: (user: any) => void;
  removeUser: () => void;
  fetchAllUsers: () => Promise<void>;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      userProfile: null,
      allUsers: [], // Ensure this is initialized as an empty array
      addUser: (user) => set({ userProfile: user }),
      removeUser: () => set({ userProfile: null }),
      fetchAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/api/users`);
        set({ allUsers: response.data }); // Ensure state update is correct
      },
    }),
    {
      name: 'auth', // The key for localStorage
    }
  )
);

export default useAuthStore;
