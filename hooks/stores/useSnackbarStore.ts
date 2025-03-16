import { create } from 'zustand';

const useSnackbarStore = create<{
    visible: boolean;
    message: string;
    duration: number;
    showSnackbar: (message: string, duration?: number) => void;
    hideSnackbar: () => void;
}>((set) => ({
  visible: false,
  message: '',
  duration: 3000, // Default duration
  showSnackbar: (message:string, duration = 3000) =>
    set({ visible: true, message, duration }),
  hideSnackbar: () => set({ visible: false }),
}));

export default useSnackbarStore;
