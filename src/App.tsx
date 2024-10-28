import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './reducers/store';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ViewTopic from './pages/ViewTopic';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/topic/:id" element={<ViewTopic />} />
          <Route path='/' index element={<Home />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
