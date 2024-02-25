import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, GochiHand_400Regular } from '@expo-google-fonts/gochi-hand';
import Home from './pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

export default () => {
  let [fontsLoaded] = useFonts({
    GochiHand_400Regular,
  });

  let fontSize = 24;
  let paddingVertical = 6;

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );
  }
};
