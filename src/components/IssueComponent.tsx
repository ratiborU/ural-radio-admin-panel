import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import IssuesService from '../api/IssueService';

const IssuseComponent = ({item}) => {
  const date = new Date(item["date"]);
  const [coverImage, setCoverImage] = useState();
  

  const [fetchCoverImage, isCoverImageLoading, coverImageError] = useFetching( async () => {
    const coverImageResponse = await IssuesService.getImageLinkById(item["coverPathId"]);
    // console.log(coverImageResponse);
    setCoverImage(coverImageResponse);
  })


  useEffect(() => {
    fetchCoverImage();
  }, []);
  

  return (
    <div className="catalog__item">
      <div className="catalog__item-image">
        <Link className="catalog__item-image-link" to={`/issues/${item["id"]}`}>
          <img src={coverImage} alt="" />
        </Link>
      </div>
      <p className='catalog__item-date'>{date.getDate()} {date.getMonth()} {date.getFullYear()}</p>
      <p className='catalog__item-title'>{item["title"]["Ru"]}</p>
      <Link to={`/issues/${item["id"]}`}>
        <button className='catalog__item-button'>Редактировать</button>
      </Link>
      <button className='catalog__item-button'>Удалить</button>
    </div>
  );
};

export default IssuseComponent;