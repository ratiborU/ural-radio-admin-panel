// import { useState} from 'react'
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import IssuesPage from './pages/IssuesPage';
import IssueEditPage from './pages/IssueEditPage';
import IssueCreatePage from './pages/IssueCreatePage';

import ArticleEditPage from './pages/ArticleEditPage';
import ArticleCreatePage from './pages/ArticleCreatePage';

import EditorsPage from './pages/ReductorsPage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IssuesPage/>} />
          <Route path="issues" element={<IssuesPage/>} />
          <Route path="issues/:id" element={<IssueEditPage/>} />
          <Route path="issues/create" element={<IssueCreatePage/>} />
          <Route path="issues/article/:id" element={<ArticleEditPage/>} />
          <Route path="issues/article/create" element={<ArticleCreatePage/>} />
          <Route path="reductors" element={<EditorsPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App

