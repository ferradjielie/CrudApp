import { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { Colors } from '../constants/Colors';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  const [theme, setTheme] = useState(
    colorScheme === 'dark' ? Colors.dark : Colors.light
  );

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? Colors.dark : Colors.light);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
