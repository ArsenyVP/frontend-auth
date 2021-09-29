import React from 'react'
import MainSide from './components/MainSide'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainSide />
      </Router>
    </Provider>
  )
}

export default App
