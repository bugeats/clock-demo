// Theme context sets the main color theme for all app drawings.

import React from 'react';

interface ThemeContextData {
  readonly colorFg: string;
  readonly colorBg: string;
}

export const ThemeContext = React.createContext<ThemeContextData>({
  colorFg: '#ffffff',
  colorBg: '#000000',
});
