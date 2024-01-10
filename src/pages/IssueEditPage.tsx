import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import IssuesService from '../api/IssueService';
import ArticleComponent from '../components/ArticleComponent';


const IssueEditPage = () => {
  const {id} = useParams();

  const [articles, setArticles] = useState();
  const [issue, setIssue] = useState();
  const [issuePdf, setIssuePdf] = useState();
  const [title, setTitle] = useState('');


  const [fetchArticles, isArticlesLoading, articlesError] = useFetching( async () => {
    const articlesResponse = await IssuesService.getArticlesByIssueId(id);
    setArticles(articlesResponse);
  })

  const [fetchIssue, isIssueLoading, issueError] = useFetching( async () => {
    const issueResponse = await IssuesService.getIssueById(id);
    setIssue(issueResponse);
    setTitle(issueResponse["title"]["Ru"])
  })

  const [fetchIssuePdf, isIssuePdfLoading, issuePdfError] = useFetching( async () => {
    const issueResponse = await IssuesService.getFileLinkById(issue["filePathId"]);
    setIssuePdf(issueResponse);
  })

  useEffect(() => {
    fetchArticles();
    fetchIssue();
  }, [id]);

  useEffect(() => {
    fetchIssuePdf();
  }, [issue]);

  return (
    <>
      <input className="issue__input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      {/* <p className='issue__title'>{isIssueLoading ? "загрузка" : issue["title"]["Ru"]}</p> */}
      {/* <a href={issuePdf}>
        <button className='issue__button'>
          Скачать выпуск
        </button>
      </a> */}
      <form method='post' action="">
        <div className="issue__load">
        <label className="issue__load-file">
          <input type="file" name="file"/>		
          <span>Выберите файл</span>
        </label>
        </div>
      </form>
      
      <p className='issue__title'>Содержание</p>

      {isArticlesLoading 
        ? "загрузка"
        : articles.map(article => <ArticleComponent key={article["id"]} article={article}/>)
      }
      <button className='catalog__create-issue-button'>Добавить статью</button>
      <button className='catalog__create-issue-button'>Сохранить изменения</button>
    </>
  );
};

export default IssueEditPage;