// import { useState} from 'react'
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import IssuesPage from './pages/IssuesPage';
import IssueEditPage from './pages/IssueEditPage';
import IssueCreatePage from './pages/IssueCreatePage';

import ArticleEditPage from './pages/ArticleEditPage';
import ArticleCreatePage from './pages/ArticleCreatePage';

import ReductorsPage from './pages/ReductorsPage';
import ReductorEditPage from './pages/ReductorEditPage';
import ReductorCreatePage from './pages/ReductorCreatePage';

import FilesPage from './pages/FilesPage';

// import IssueService from './api/IssueService';




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
          <Route path="issues/article/create/:id" element={<ArticleCreatePage/>} />
          <Route path="reductors" element={<ReductorsPage/>} />
          <Route path="reductors/:id" element={<ReductorEditPage/>} />
          <Route path="reductors/create" element={<ReductorCreatePage/>} />
          <Route path="files" element={<FilesPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App

