import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { setTheme } from '../store/slices/uiSlice';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.ui.theme);
  const isInitialThemeSet = useRef(false);

  useEffect(() => {
    if (isInitialThemeSet.current) {
      return;
    }
    
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    if (initialTheme !== theme) {
      dispatch(setTheme(initialTheme));
    }
    
    isInitialThemeSet.current = true;
  }, [dispatch, theme]);

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  return theme;
};