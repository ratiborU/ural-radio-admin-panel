import React, { useEffect, useState } from 'react';
import IssuseComponent from '../components/IssueComponent';
import IssuesService from '../api/IssueService';
import { useFetching } from '../hooks/useFetching';
import { Link } from 'react-router-dom';

const IssuesPage = () => {
  const [issues, setIssues] = useState();


  const [fetchIssues, isIssuesLoading, issuesError] = useFetching( async () => {
    const issuesResponse = await IssuesService.getAllIssues();
    // console.log(issuesResponse);
    issuesResponse.sort((a, b) => a["title"]["Ru"] < b["title"]["Ru"] ? 1 : -1);
    setIssues(issuesResponse);
  })

  useEffect(() => {
    fetchIssues();
  }, []);

  
  return (
    <>
      {isIssuesLoading 
        ? <p>загрузка</p>
        : <div className="catalog">
          <Link to={`/issues/create`}>
            <button className='catalog__create-issue-button'>Создать статью</button>
          </Link>
          
            <div className="catalog__container">
              {issues.map((item, id) => {
                return <IssuseComponent key={id} item={item}/>
              })}
            </div>
            
          </div>
      }
      выпуски
    </>
  );
};

export default IssuesPage;