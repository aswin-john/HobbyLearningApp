import { useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEBOUNCE_DELAY } from '../constants';

export const useDebouncedAsyncStorage = (key, value) => {
  const timer = useRef(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error(`❌ Failed to save data for ${key}`, e);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer.current);
  }, [value, key]);
};
