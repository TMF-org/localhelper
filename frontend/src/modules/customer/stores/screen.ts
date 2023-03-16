import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { create } from 'zustand';

interface ScreenState {
  animate: boolean;
  activeScreens: string[];

  hideScreen: (name: string, options?: { delay?: number }) => void;
  showScreen: (name: string) => void;
  toggleScreen: (name: string) => void;
  switchScreen: (from: string, to: string) => void;
  isActive: (name: string) => boolean;
  isScreenLast: (name: string) => boolean;
  getLastScreen: () => string | undefined;
}

export const useScreenStore = create<ScreenState>()((set, get) => ({
  animate: false,
  activeScreens: [],

  hideScreen(name: string, { delay = 0 } = {}) {
    if (delay) {
      set(() => ({ animate: true }));
      setTimeout(() => {
        set(({ activeScreens }) => ({
          animate: false,
          activeScreens: activeScreens.filter((screen) => screen !== name),
        }));
      }, delay);
      return;
    }
    set(({ activeScreens }) => ({
      activeScreens: activeScreens.filter((screen) => screen !== name),
    }));
  },

  showScreen(name: string) {
    history.pushState({ screen: name }, '', null);

    set(({ activeScreens }) => ({
      activeScreens: [...activeScreens, name],
    }));
  },

  toggleScreen(name: string) {
    const { isActive, hideScreen, showScreen } = get();
    if (isActive(name)) {
      hideScreen(name);
    } else {
      showScreen(name);
    }
  },

  switchScreen(from: string, to: string) {
    set(({ activeScreens }) => ({
      activeScreens: [...activeScreens.filter((screen) => screen !== from), to],
    }));
  },

  isActive(name: string) {
    const { activeScreens } = get();
    return activeScreens.includes(name);
  },

  isScreenLast(name: string) {
    const { activeScreens } = get();
    return activeScreens[activeScreens.length - 1] === name;
  },

  getLastScreen() {
    const { activeScreens } = get();
    if (activeScreens.length > 0) {
      return activeScreens[activeScreens.length - 1];
    }
  },
}));

export const useSyncHistoryWithScreenStore = () => {
  const { getLastScreen, hideScreen } = useScreenStore((store) => ({
    getLastScreen: store.getLastScreen,
    hideScreen: store.hideScreen,
  }));
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', (url) => {
      let screen = getLastScreen();
      if (screen) {
        hideScreen(screen, { delay: 400 });
      }
    });
  }, []);
};
