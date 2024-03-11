import React from 'react';
import Home from './pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, GochiHand_400Regular } from '@expo-google-fonts/gochi-hand';

export default () => {
  let [fontsLoaded] = useFonts({
    GochiHand_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}

