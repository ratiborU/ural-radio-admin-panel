import React, { useState, useEffect } from 'react';
import { useFetching } from '../hooks/useFetching';
import IssueService from '../api/IssueService';

const Page = ({ children }) => {
  // const [fetchLogin, isLoginLoading, loginError] = useFetching( async () => {
  //   const loginResponse = await IssueService.postAuth();
  //   console.log(loginResponse);
  //   window.localStorage.setItem('token', loginResponse["Token"]);
  // })
  
  // useEffect(() => {
  //   fetchLogin();
  // }, [])

  return (
    <>
      <main className='main'>
        <div className="main__container">
          <div className="main__title">
            <div className="main__title-line">URAL</div>
            <div className="main__title-line">RADIO ENGINEERING</div>
            <div className="main__title-line">JOURNAL</div>
          </div>
            
          {children}
        </div>
      </main>
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="circle3"></div>
    </>
  );
};

export default Page;