import React, { useEffect, useState } from 'react';
import BoardEditor from '../components/BoardEditor';
import { Link } from 'react-router-dom';
// import reductors from '../api/ReductorsApi';
import MainEditor from '../components/MainEditor';
import IssuesService from '../api/IssueService';
import { useFetching } from '../hooks/useFetching';
import ReductorComponent from '../components/ReductorComponent';



const ReductorsPage = () => {
  const [reductors, setReductors] = useState([]);

  const [mainReductor, setMainReductor] = useState();
  const [subReductor, setSubReductor] = useState();
  const [menagerReductor, setMenagerReductor] = useState();



  const [fetchReductors, isReductorsLoading, reductorsError] = useFetching( async () => {
    const reductorsResponse = await IssuesService.getAllReductors();
    setReductors(reductorsResponse);
    setMainReductor(reductorsResponse.filter((item) => item["rank"] == "Главный редактор")[0]);
    setSubReductor(reductorsResponse.filter((item) => item["rank"] == "Заместитель главного редактора")[0]);
    setMenagerReductor(reductorsResponse.filter((item) => item["rank"] == "Управляющая редакцией")[0]);
  })

  useEffect(() => {
    fetchReductors();
  }, []);


  return (
    <>
      <div className="editors">
        {
          !isReductorsLoading
            ? <div className="editors__list">
                {reductors.map(reductor => {
                  return <ReductorComponent key={reductor["id"]} reductor={reductor}/>
                })}
              </div>
              

            : <p>загрузка</p>
        }
      </div>
      <Link to={`/reductors/create`}>
      <button className="editors__button">Добавить редактора</button>
      </Link>
      
    </>
  );
};

export default ReductorsPage;