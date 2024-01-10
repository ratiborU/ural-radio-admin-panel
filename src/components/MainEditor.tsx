import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IssuesService from '../api/IssueService';
import { useFetching } from '../hooks/useFetching';
// import reductors from '../api/ReductorsApi';
// import image1 from "../assets/editors/editor1.jpg";

const MainEditor = ({reductor}) => {
  const [reductorImage, setReductorImage] = useState('');
  

  const [fetchReductorImage, isReductorImageLoading, reductorImageError] = useFetching( async () => {
    const reductorImageResponse = await IssuesService.getImageLinkById(reductor["imagePathId"]);
    setReductorImage(reductorImageResponse);
  })


  useEffect(() => {
    fetchReductorImage();
  }, []);

  
  return (
    <div className="editors__editor editor">
      <div className="editor__title title"><p>{reductor["rank"]}</p></div>
      <div className="editor__block">
        <div className="editor__image">
          <Link to={`/editors/${reductor["id"]}`}>
            <img src={reductorImage} alt="" />
            {/* <img src={reductor.image} alt="" /> */}
          </Link>
        </div>
        <div className="editor__description">
          <p className='editor__name'>{reductor["name"]["Ru"]}</p>
          <p className='editor__workplace'>{reductor["description"]["Ru"]}</p>
        </div>
      </div>
    </div>
  );
};

export default MainEditor;