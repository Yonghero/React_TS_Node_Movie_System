import React from 'react';
import store from './redux/store'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
const App:React.FC = () => {
  return (
      <Provider store={store}>
        <BrowserRouter
            basename='/'
            children={<Layout/>}
        />
      </Provider>

  );
}
export default App;
