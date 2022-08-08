import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PostList from './page/PostList/PostList';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
