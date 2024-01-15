import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import IssuesService from '../api/IssueService';
// import reductors from '../api/ReductorsApi';
// import image1 from "../assets/editors/editor1.jpg";

const ReductorComponent = ({reductor}) => {
  const [reductorImage, setReductorImage] = useState();
  console.log(reductor);


  const [fetchReductorImage, isReductorImageLoading, reductorImageError] = useFetching( async () => {
    const reductorImageResponse = await IssuesService.getImageLinkById(reductor["imagePathId"]);
    // console.log(reductor);
    setReductorImage(reductorImageResponse);
  })

  const [fetchReductorDelete, isReductorDeleteLoading, reductorDeleteError] = useFetching( async () => {
    const reductorImageResponse = await IssuesService.deleteReductor(reductor["id"]);
    // console.log(reductor);
    // setReductorImage(reductorImageResponse);
  })


  useEffect(() => {
    fetchReductorImage();
  }, []);
  

  return (
    <>
      {
        isReductorImageLoading 
        ? <p></p> 
        : <div className="editors__item">
            <div className="editors__item-image">
              <img src={reductorImage} alt="" />
            </div>
            <div className="editors__item-description">
              <div className="editors__item-name">{reductor["name"]["Ru"]}</div>
              <div className="editors__item-ediucation">{reductor["description"]["Ru"]}</div>
              <div className="editors__item-rank">{reductor["rank"]}</div>
            </div>
            <Link to={`/reductors/${reductor["id"]}`}>
            <button className="editors__item-button">Редактировать</button>
            </Link>
            
            <button className="editors__item-button" onClick={() => fetchReductorDelete()}>Удалить</button>
          </div>
      }
    </>
  );
};

export default ReductorComponent;