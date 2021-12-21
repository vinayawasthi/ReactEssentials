import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './shared/Layout'
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import ArticleList from './pages/ArticleList';
import ArticlePage from './pages/ArticlePage';
import NoPage from './pages/NoPage';
import './styles/App.css';

import { createBrowserHistory } from "history";
// Enable Browser History for Back and Forward Button
export const appHistory = createBrowserHistory();

function App() {
  return (
    <Router history={appHistory}>
      <Routes>       
        <Route exact  path="/" element={<Layout />}>
          <Route exact  path="home" element={<Home/>} />
          <Route exact  path="about-me" element={<AboutMe/>} />
          <Route exact  path="articles" element={<ArticleList/>} />
          <Route path="/article/:name" element={<ArticlePage/>} />
          <Route exact  path="*" element={<NoPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
