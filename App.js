import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from "react-redux";
import Navigation from './src/routes/navigation';
import store from './src/redux/storeConfig';

function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}

export default App;

