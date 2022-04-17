import './App.css';
import React from 'react';
const Board = React.lazy(() => import('./components/Board'));

function App() {
  return (
    <>
      <div className='main'>
        <React.Suspense fallback='loading...'>
          <Board />
        </React.Suspense>
      </div>
    </>
  );
}

export default App;
