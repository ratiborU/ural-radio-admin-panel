import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import IssuesService from '../api/IssueService';
import ArticleComponent from '../components/ArticleComponent';


const IssueCreatePage = () => {
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [file, setFile] = useState('');
  const [issue, setIssue] = useState('');
  const filePicker = useRef(null)
  const imagePicker = useRef(null)

  const [fileId, setFileId] = useState('');
  const [imageId, setImageId] = useState('');





  const [fetchIssue, isIssueLoading, issueError] = useFetching( async () => {
    const issue = await IssuesService.createIssue(fileId, imageId, title, titleEn);
    console.log(issue);
  })

  const [fetchLogin, isLoginLoading, loginError] = useFetching( async () => {
    const loginResponse = await IssuesService.postAuth();
    console.log(loginResponse);
    window.localStorage.setItem('token', loginResponse["Token"]);
  })

  




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

  return (
    <>
      <input className="issue__input" type="text" placeholder='Введите название...' value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input className="issue__input" type="text" placeholder='Введите название на английском...' value={titleEn} onChange={(e) => setTitleEn(e.target.value)}/>


      {/* <form className="issue__form" id="form" method='post' action="" onSubmit={ async (e) => {
        e.preventDefault();
        const form = document.querySelector('.issue__form');
        console.log(window.localStorage.getItem('token'));
        const formData = new FormData(form);

        const response = await fetch('https://journa-token.onrender.com/admin/files/upload/editions', {
          method: 'POST',
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": `Bearer ${window.localStorage.getItem('token')}`
          },
          body: formData
        });
        const result = response.json();
        console.log(result);
        
      }}>
        <div className="issue__load">
        <label className="issue__load-file">
          <input type="file" name="file" onChange={(e) => setFile(e.target.value)}/>		
          <span>Выберите файл</span>
        </label>
        </div>
        <input type="file" name="file" accept=".pdf" onChange={(e) => {
          console.log(e.target.files)
        }}/>
        <input type="submit" />
      </form> */}

      
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
      {/* <button className='catalog__create-issue-button' onClick={() => fetchLogin()}>войти</button> */}
      <button className='catalog__create-issue-button' onClick={() => fetchIssue()}>Создать выпуск</button>
      {/* <button className='catalog__create-issue-button' onClick={(e) => {
        const form = new FormData(document.querySelector('.issue__form').files);
        console.log(form);
      }}>Отправить файл</button> */}
      
    </>
  );
};

export default IssueCreatePage;