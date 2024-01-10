import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import IssuesService from '../api/IssueService';
// import reductors from '../api/ReductorsApi';
// import image1 from "../assets/editors/editor1.jpg";

const BoardEditor = ({reductor}) => {
  
  const [reductorImage, setReductorImage] = useState();
  

  const [fetchReductorImage, isReductorImageLoading, reductorImageError] = useFetching( async () => {
    const reductorImageResponse = await IssuesService.getImageLinkById(reductor["imagePathId"]);
    setReductorImage(reductorImageResponse);
  })


  useEffect(() => {
    fetchReductorImage();
  }, []);

  return (
    <div>
      <div className="editors__board-element">
        <div className="editors__board-image">
          <Link  to={`/editors/${reductor["id"]}`}>
            <img src={reductorImage} alt="" />
          </Link>
        </div>
        <p className='editors__board-name'>{reductor["name"]["Ru"]}</p>
      </div>
    </div>
  );
};

export default BoardEditor;