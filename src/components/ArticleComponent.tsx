import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import IssuesService from '../api/IssueService';

const ArticleComponent = ({article}) => {
  const [articlePdf, setArticlePdf] = useState('');

  const [fetchArticlePdf, isArticlePdfLoading, articlePdfError] = useFetching( async () => {
    const articlePdfResponse = await IssuesService.getFileLinkById("6599a59efe7f2cec36368d71"); //article["filePathId"]
    console.log(articlePdfResponse);
    setArticlePdf(articlePdfResponse);
  })

  useEffect(() => {
    fetchArticlePdf();
  }, []);

  return (
    <div className="article-paragraph">
      <Link to={`/issues/article/${article["id"]}`} className='article-paragraph__name'>
        <button className='article-paragraph__button'>Редактировать</button>
      </Link>
      
      <div className="article-paragraph__description">
        <Link to={`/issues/article/${article["id"]}`} className='article-paragraph__name'>
          {article["title"]["Ru"]}
        </Link>
        <p className='article-paragraph__authors'>{article["authors"].join(", ")}</p>
      </div>
    </div>
  );
};

export default ArticleComponent;