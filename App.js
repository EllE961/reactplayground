import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import NavigationOverviewScreen from './screens/NavigationOverviewScreen';
import FlexboxDemoScreen from './screens/FlexboxDemoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#FAFAFA' },
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'ReactPlayground' }}
        />
        <Stack.Screen
          name="NavigationOverview"
          component={NavigationOverviewScreen}
          options={{ title: 'Navigation Overview' }}
        />
        <Stack.Screen
          name="FlexboxDemo"
          component={FlexboxDemoScreen}
          options={{ title: 'Flexbox Demo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
