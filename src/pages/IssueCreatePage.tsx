import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import IssuesService from '../api/IssueService';
import ArticleComponent from '../components/ArticleComponent';


const IssueCreatePage = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [issue, setIssue] = useState('');

  const [cookie, setCookie] = useState('');

  // let formData = new FormData([form]);

  const [fetchIssue, isIssueLoading, issueError] = useFetching( async () => {
    const issueResponse = await IssuesService.postLoadFile(file);
    // console.log(issueResponse["body"]["message"]);
    setIssue(issueResponse);
  })

  const [fetchLogin, isLoginLoading, loginError] = useFetching( async () => {
    const issueResponse = await IssuesService.postAuth();

    // const cookies = issueResponse.headers.getSetCookie();

  // Сохранить куки в браузере
  // for (const cookie of cookies.split(";")) {
  //   document.cookie = cookie;
  // }
  })

  return (
    <>
      <input className="issue__input" type="text" placeholder='Введите название...' value={title} onChange={(e) => setTitle(e.target.value)}/>
      


      {/* форма которая должна работать */}
      <form method='post' action="" onSubmit={ async (e) => {
        e.preventDefault();
        const response = await fetch('https://journal-8xii.onrender.com/admin/files/upload/editions', {
          method: 'POST',
          headers: {
            "Content-Type": 'multipart/form-data'
          },
          body: new FormData()
        });
        const result = await response.json();
        alert(result.message);
      }}>

        <div className="issue__load">
        <label className="issue__load-file">
          <input type="file" name="file" onChange={(e) => setFile(e.target.value)}/>		
          <span>Выберите файл</span>
        </label>
        </div>
        <input type="submit" />
      </form>






      <input type="file" />
      <p className='issue__title'>Содержание</p>postAuth
      {/* кнопки входа и создания выпуска */}
      <button className='catalog__create-issue-button' onClick={() => fetchLogin()}>войти</button>
      <button className='catalog__create-issue-button' onClick={() => fetchIssue()}>Создать выпуск</button>



      {/* <button className='catalog__create-issue-button' onClick={() => console.log()}>войти</button> */}
      {/* <button className='catalog__create-issue-button' onClick={() => {
        fetch("http://localhost:8000/admin/auth/login", { 
          method : 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
              "username":"admin",
              "password":"admin"
          })}).then(response => {
            return response;
          })
      }}>куки куки</button> */}
      {/* <button className='catalog__create-issue-button' onClick={() => {document.cookie="admin=MTcwNDgzNDIzNXxEWDhFQVFMX2dBQUJFQUVRQUFBa180QUFBUVp6ZEhKcGJtY01Cd0FGWVdSdGFXNEdjM1J5YVc1bkRBY0FCV0ZrYldsdXwNE_iJIp3vCIghoH-BLRMB0uwFQu1TTlXIpeZ7Uzwp2A==; Path=/; Domain=127.0.0.1; Expires=Tue, 09 Jan 2024 22:03:55 GMT; Max-Age=3600; SameSite=None";}}>alert</button> */}
    </>
  );
};

export default IssueCreatePage;