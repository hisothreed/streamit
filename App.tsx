import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import Discover from 'screens/Discover';

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <SafeAreaProvider>
        <Discover />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
