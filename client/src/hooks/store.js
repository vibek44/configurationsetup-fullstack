import { create } from "zustand";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setUser, removeUser } from "../services/persistentUser";

const useNotificationStore = create((set, get) => ({
  notification: {
    success: null,
    error: null,
  },
  actions: {
    setError: (error = null) =>
      set((state) => ({ notification: { ...state.notification, error } })),
    setSuccess: (success = null) =>
      set((state) => ({ notification: { ...state.notification, success } })),
  },
}));

export const useNotification = () =>
  useNotificationStore((state) => state.notification);
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);

const useUserStore = create((set, get) => ({
  user: null,
  actions: {
    setUserStore: (user) =>
      set(() => ({
        user,
      })),
    handleLogin: async (userlog) => {
      try {
        const user = await loginService.login(userlog);
        set(() => ({ user }));
        blogService.setToken(user.token);
        setUser(user);
        return user;
      } catch (error) {
        useNotificationStore
          .getState()
          .actions.setError(error?.response?.data?.error);
        setTimeout(() => {
          useNotificationStore.getState().actions.setError();
        }, 3000);
      }
    },
    handleLogout: () => {
      set(() => ({ user: null }));
      blogService.setToken("not-allowed");
      removeUser();
    },
  },
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);

const useBlogStore = create((set, get) => ({
  blogs: [],
  actions: {
    initialize: async () => {
      try {
        const blogs = await blogService.getAll();
        set((state) => ({ blogs }));
      } catch (error) {
        set(() => ({ blogs: undefined }));
      }
    },
    addBlog: async (blog) => {
      try {
        const savedBlog = await blogService.create(blog);
        set((state) => ({ blogs: state.blogs.concat(savedBlog) }));
        useNotificationStore
          .getState()
          .actions.setSuccess(
            `a new blog ${savedBlog.title}! by ${savedBlog.author} added`
          );
        setTimeout(() => {
          useNotificationStore.getState().actions.setSuccess();
        }, 3000);
      } catch (error) {
        useNotificationStore
          .getState()
          .actions.setError(error?.response?.data?.error);
        setTimeout(() => {
          useNotificationStore.getState().actions.setError();
        }, 3000);
      }
    },
    handleLikeUpdate: async (blog) => {
      try {
        const updatedBlog = await blogService.update(blog);
        set((state) => ({
          blogs: state.blogs.map((ele) =>
            ele.id !== updatedBlog.id ? ele : updatedBlog
          ),
        }));
      } catch (error) {
        useNotificationStore
          .getState()
          .actions.setError(error?.response?.data?.error);
        setTimeout(() => {
          useNotificationStore.getState().actions.setError();
        }, 3000);
      }
    },
    removeBlog: async (id) => {
      try {
        await blogService.remove(id);
        set((state) => ({ blogs: state.blogs.filter((ele) => ele.id !== id) }));
      } catch (error) {
        useNotificationStore
          .getState()
          .actions.setError(error?.response?.data?.error);
        setTimeout(() => {
          useNotificationStore.getState().actions.setError();
        }, 3000);
      }
    },
    addComment: async (comment, blogId) => {
      try {
        const blog = await blogService.createComment(comment, blogId);
        set((state) => ({
          blogs: state.blogs.map((ele) => (ele.id !== blog.id ? ele : blog)),
        }));
      } catch (error) {
        useNotificationStore
          .getState()
          .actions.setError(error?.response?.data?.error);
        setTimeout(() => {
          useNotificationStore.getState().actions.setError();
        }, 3000);
      }
    },
  },
}));

export const useBlog = () => useBlogStore((state) => state.blogs);
export const useBlogActions = () => useBlogStore((state) => state.actions);
