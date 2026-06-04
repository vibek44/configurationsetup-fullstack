import { create } from "zustand";
import usersService from "../services/users";

const useUsersStore = create((set) => ({
  users: [],
  actions: {
    initializeUsers: async () => {
      const users = await usersService.getUsers();
      set((state) => ({ users }));
    },
  },
}));

export const useUsers = () => useUsersStore((state) => state.users);
export const useUsersActions = () => useUsersStore((state) => state.actions);
