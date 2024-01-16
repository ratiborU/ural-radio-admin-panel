import React, { useState } from 'react';
import IssueService from '../api/IssueService';
import { useFetching } from '../hooks/useFetching';

const FilesPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');


  const [fetchLogin, isLoginLoading, loginError] = useFetching( async () => {
    const loginResponse = await IssueService.postAuth(login, password);
    window.localStorage.setItem('token', loginResponse["Token"]);
    console.log(loginResponse);
    if (loginResponse.message == "success") {
      alert("Вы успешно зарегестрировались");
    } else {
      alert("неверный логин или пароль");
    }
    
  })
  
  // useEffect(() => {
  //   fetchLogin();
  // }, [])


  return (
    <div className='login'>
      <input className='login__login-input' type="text" placeholder='login...' value={login} onChange={(e) => {setLogin(e.target.value)}}/>
      <input className='login__password-input' type="password" placeholder='password...' value={password} onChange={(e) => {setPassword(e.target.value)}}/>

      <button className='login__button' onClick={() => fetchLogin()}>войти</button>
    </div>
  );
};

export default FilesPage;