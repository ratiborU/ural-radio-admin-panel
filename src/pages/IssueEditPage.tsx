import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import IssuesService from '../api/IssueService';
import ArticleComponent from '../components/ArticleComponent';


const IssueEditPage = () => {
  const {id} = useParams();

  const [articles, setArticles] = useState([]);

  const [issue, setIssue] = useState();
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');

  const [filePdf, setFilePdf] = useState('');
  const [fileImage, setFileImage] = useState('');
  const [fileVideo, setFileVideo] = useState('');

  const [fileId, setFileId] = useState('');
  const [imageId, setImageId] = useState('');
  const [videoId, setVideoId] = useState('');

  const [fileName, setFileName] = useState('');
  const [imageName, setImageName] = useState('');
  const [videoName, setVideoName] = useState('');

  const filePicker = useRef(null)
  const imagePicker = useRef(null)
  const videoPicker = useRef(null)




  const [fetchArticles, isArticlesLoading, articlesError] = useFetching( async () => {
    const articlesResponse = await IssuesService.getArticlesByIssueId(id);
    setArticles(articlesResponse);
  })


  const [fetchIssueUpdate, isAIssueUpdateLoading, issueUpdateError] = useFetching( async () => {
    const issueUpdateResponse = await IssuesService.updateIssue(id, fileId, imageId, videoId, title, titleEn);
    // setArticles(issueUpdateResponse);
  })

  const [fetchIssue, isIssueLoading, issueError] = useFetching( async () => {
    const issueResponse = await IssuesService.getIssueById(id);
    console.log(issueResponse);
    setIssue(issueResponse);
    setTitle(issueResponse["title"]["Ru"]);
    setTitleEn(issueResponse["title"]["Eng"]);
    setFileId(issueResponse["filePathId"]);
    setImageId(issueResponse["coverPathId"]);
    setVideoId(issueResponse["videoPathId"]);
  })


  useEffect(() => {
    fetchArticles();
    fetchIssue();
  }, [id]);


  const handleChooseFile = (e) => {
    setFilePdf(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleButtonLoadFile = (e) => {
    filePicker.current.click();
  };

  const handleButtonSendFile = async (e) => {
    const form = new FormData();
    form.append("file", filePdf);
    const res = await IssuesService.postLoadFile(form, "editions");
    const res2 = await IssuesService.deletefile(fileId);
    setFileId(res.id)
    alert("Фийл загружен");
  };





  const handleChooseImage = (e) => {
    setFileImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  const handleButtonLoadImage = (e) => {
    imagePicker.current.click();
  };

  const handleButtonSendImage = async (e) => {
    const form = new FormData();
    form.append("file", fileImage);
    const res = await IssuesService.postLoadFile(form, "avatars");
    const res2 = await IssuesService.deletefile(imageId);
    setImageId(res.id);
    alert("Изображение загружено");
  };



  const handleChooseVideo = (e) => {
    setFileVideo(e.target.files[0]);
    setVideoName(e.target.files[0].name);
  };

  const handleButtonLoadVideo = (e) => {
    videoPicker.current.click();
  };

  const handleButtonSendVideo = async (e) => {
    const form = new FormData();
    form.append("file", fileVideo);
    const res = await IssuesService.postLoadFile(form, "editions");
    const res2 = await IssuesService.deletefile(videoId);
    setVideoId(res.id);
    alert("Видео загружено");
  };


  const handleButtonUpdateIssue = async (e) => {
    const res = await IssuesService.updateIssue(id, fileId, imageId, videoId, title, titleEn);
    alert("Выпуск обновлен");
  };



  return (
    <>
      <input className="issue__input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input className="issue__input" type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)}/>
      <input className='hidden' ref={filePicker} type="file" name="file" accept=".pdf" onChange={handleChooseFile}/>
      <div className="issue__buttons">
        <button className='issue__button' onClick={handleButtonLoadFile}>{fileName == '' ? "выбрать файл" : fileName}</button>
        <button className='issue__button' onClick={handleButtonSendFile}>загрузить</button>
      </div>
      
      <input className='hidden' ref={imagePicker} type="file" name="file" accept=".jpeg" onChange={handleChooseImage}/>
      <div className="issue__buttons">
        <button className='issue__button' onClick={handleButtonLoadImage}>{imageName == '' ? "выбрать обложку" : imageName}</button>
        <button className='issue__button' onClick={handleButtonSendImage}>загрузить</button>
      </div>

      <input className='hidden' ref={videoPicker} type="file" name="file" accept=".mp4" onChange={handleChooseVideo}/>
      <div className="issue__buttons">
        <button className='issue__button' onClick={handleButtonLoadVideo}>{videoName == '' ? "выбрать видео" : videoName}</button>
        <button className='issue__button' onClick={handleButtonSendVideo}>загрузить</button>
      </div>
      
      <p className='issue__title'>Содержание</p>

      {isArticlesLoading 
        ? "загрузка"
        : articles.map(article => <ArticleComponent key={article["id"]} article={article}/>)
      }
      <Link to={`/issues/article/create/${id}`}>
        <button className='catalog__create-issue-button'>Добавить статью</button>
      </Link> 
      <button className='catalog__create-issue-button' onClick={handleButtonUpdateIssue}>Сохранить изменения</button>
    </>
  );
};

export default IssueEditPage;