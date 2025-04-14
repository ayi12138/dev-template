import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { I18nProvider } from './src/contexts/I18nContext';
import { AuthProvider } from './src/contexts/AuthContext';
import Navigation from './src/navigations';

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
