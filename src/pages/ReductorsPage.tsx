import React, { useEffect, useState } from 'react';
import BoardEditor from '../components/BoardEditor';
// import reductors from '../api/ReductorsApi';
import MainEditor from '../components/MainEditor';
import IssuesService from '../api/IssueService';
import { useFetching } from '../hooks/useFetching';



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
    <div>
      <div className="editors">
        {/* {!isReductorsLoading ? <MainEditor reductor={mainReductor}/> : <p>загрузка</p>} */}
        {/* {!isReductorsLoading ? <MainEditor reductor={subReductor}/> : <p>загрузка</p>} */}
        {/* {!isReductorsLoading ? <MainEditor reductor={menagerReductor}/> : <p>загрузка</p>} */}
        
        {
          !isReductorsLoading
            ?  <div className="editors__board">
                <div className="editors__board-title title"><p>Редакционный совет</p></div>
                <div className="editors__board-container">
                  {reductors.map(reductor => {
                    return <BoardEditor key={reductor["id"]} reductor={reductor}/>
                  })}
                </div>
              </div>

            : <p>загрузка</p>
        }
        {
          !isReductorsLoading
            ? <div className="editors__list">
                <div className="editors__item">
                  <div className="editors__item-image">
                    <img src="" alt="" />
                  </div>
                  <div className="editors__item-description">
                    <div className="editors__item-name">Князев Мергей Тихонович</div>
                    <div className="editors__itm-ediucation">Урфу им. первого президента России Б. Н. Ельцина</div>
                  </div>
                  <div className="editors__item-button">Редактировать</div>
                  <div className="editors__item-button">Удалить</div>
                </div>
              </div>

            : <p>загрузка</p>
        }
      </div>
    </div>
  );
};

export default ReductorsPage;