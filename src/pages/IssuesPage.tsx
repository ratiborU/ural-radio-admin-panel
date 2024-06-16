import IssuseComponent from '../components/IssueComponent';
import { Link, useNavigate } from 'react-router-dom';
import { getIssues } from '../service/api/IssueService';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const IssuesPage = () => {
  const navigate = useNavigate();
  const { data: issues, isLoading, error } = useQuery({
    queryFn: async () => await getIssues(),
    queryKey: ["issues"],
    staleTime: Infinity,
  });
  

  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      navigate(`/files`);
    }
  }, [navigate]);

  if (error) {
    return <>произошла ошибка</>
  }
  if (isLoading) {
    return <>загрузка...</>
  }

  return (
    <div className="catalog">
      <Link to={`/issues/create`}>
        <button className='catalog__create-issue-button'>Создать выпуск</button>
      </Link>
    
      <div className="catalog__container">
        {issues?.map((item, id) => {
          return <IssuseComponent key={id} item={item}/>
        })}
      </div>
    </div>
  )
};

export default IssuesPage;