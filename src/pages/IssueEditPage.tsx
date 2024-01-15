import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import IssuesService from '../api/IssueService';
import ArticleComponent from '../components/ArticleComponent';


const IssueEditPage = () => {
  const {id} = useParams();

  const [articles, setArticles] = useState();
  const [issue, setIssue] = useState();
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [fileId, setFileId] = useState('');
  const [imageId, setImageId] = useState('');

  const [file, setFile] = useState('');
  const filePicker = useRef(null)
  const imagePicker = useRef(null)



  const [fetchArticles, isArticlesLoading, articlesError] = useFetching( async () => {
    const articlesResponse = await IssuesService.getArticlesByIssueId(id);
    setArticles(articlesResponse);
    console.log(articlesResponse);
  })

  const [fetchIssueUpdate, isAIssueUpdateLoading, issueUpdateError] = useFetching( async () => {
    const issueUpdateResponse = await IssuesService.updateIssue(id, fileId, imageId, title);
    setArticles(issueUpdateResponse);
  })

  const [fetchIssue, isIssueLoading, issueError] = useFetching( async () => {
    const issueResponse = await IssuesService.getIssueById(id);
    console.log(issueResponse);
    setIssue(issueResponse);
    setTitle(issueResponse["title"]["Ru"]);
    setTitleEn(issueResponse["title"]["Eng"]);
    setFileId(issueResponse["filePathId"]);
    setImageId(issueResponse["coverPathId"]);
  })


  useEffect(() => {
    fetchArticles();
    fetchIssue();
  }, [id]);


  const handleChooseFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleButtonLoadFile = (e) => {
    filePicker.current.click();
  };

  const handleButtonSendFile = async (e) => {
    const form = new FormData();
    form.append("file", file);

    const res = await IssuesService.postLoadFile(form, "editions");
    
    setFileId(res.id)
    console.log(res.id);
  };





  const handleChooseImage = (e) => {
    setFile(e.target.files[0]);
  };

  const handleButtonLoadImage = (e) => {
    imagePicker.current.click();
  };

  const handleButtonSendImage = async (e) => {
    const form = new FormData();
    form.append("file", file);

    const res = await IssuesService.postLoadFile(form, "avatars");

    setImageId(res.id);
    console.log(res.id);
  };


  const handleButtonUpdateIssue = async (e) => {
    const res = await IssuesService.updateIssue(fileId, imageId, title, id);
    console.log(res);
  };



  return (
    <>
      <input className="issue__input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input className="issue__input" type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)}/>
      <input className='hidden' ref={filePicker} type="file" name="file" accept=".pdf" onChange={handleChooseFile}/>
      <div className="issue__buttons">
        <button className='issue__button' onClick={handleButtonLoadFile}>выбрать файл</button>
        <button className='issue__button' onClick={handleButtonSendFile}>загрузить</button>
      </div>
      
      <input className='hidden' ref={imagePicker} type="file" name="file" accept=".jpeg" onChange={handleChooseImage}/>
      <div className="issue__buttons">
        <button className='issue__button' onClick={handleButtonLoadImage}>выбрать обложку</button>
        <button className='issue__button' onClick={handleButtonSendImage}>загрузить</button>
      </div>
      
      <p className='issue__title'>Содержание</p>

      {isArticlesLoading 
        ? "загрузка"
        : articles.map(article => <ArticleComponent key={article["id"]} article={article}/>)
      }
      <Link to={`/issues/article/create/${id}`}>
        <button className='catalog__create-issue-button'>Добавить статью</button>
      </Link> 
      <button className='catalog__create-issue-button' onClick={() => fetchIssueUpdate()}>Сохранить изменения</button>
    </>
  );
};

export default IssueEditPage;