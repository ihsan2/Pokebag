// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

// import pages
import HomePage from './src/pages/Home';
import DetailPage from './src/pages/Detail';
import PokebagPage from './src/pages/Pokebag';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pokebag"
            component={PokebagPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
