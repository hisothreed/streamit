import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import Discover from 'screens/Discover';

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <SafeAreaProvider>
        <StatusBar barStyle={'light-content'} />
        <Discover />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
