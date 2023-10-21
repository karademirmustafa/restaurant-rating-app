import React from 'react';
import Header from './components/Header/Header';
import RouterPage from './router';
const App: React.FC = () => {

  return (
    <>
      <Header />
      <RouterPage />
    </>
  );
};

export default App;
