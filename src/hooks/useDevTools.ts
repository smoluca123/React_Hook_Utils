import { useState, useEffect } from 'react';
import {
  addListener,
  isLaunch,
  launch,
  setDetectDelay,
} from 'devtools-detector';

/**
 *
 * @param detectDelayMs Delay in milliseconds to wait for DevTools to open before checking. Default is 300ms.
 * @returns True if DevTools are open, false otherwise.
 */

export const useDevTools = (detectDelayMs: number | string = 300): boolean => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState<boolean>(false);

  useEffect(() => {
    addListener((isOpen) => {
      setIsDevToolsOpen(isOpen);
      return;
    });
    if (!isLaunch()) {
      setDetectDelay(+detectDelayMs);
      launch();
    }
  }, []);

  return isDevToolsOpen;
};
