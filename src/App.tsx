import React from 'react';

import { Clock, ClockContainer } from './components';
import { ThemeContext } from './contexts';

export const App: React.FC = () => {
  const themeContextData = {
    colorFg: '#36ff00', // 520nm wavelength of green phosphor displays
    colorBg: '#222b21',
  };

  return (
    <div className='App'>
      <ThemeContext.Provider value={themeContextData}>
        <ClockContainer>
          <Clock />
        </ClockContainer>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
