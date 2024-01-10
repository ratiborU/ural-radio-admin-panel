import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import IssuesService from '../api/IssueService';
import { useFetching } from '../hooks/useFetching';
import CommentComponent from '../components/CommentComponent';


const ArticleCreatePage = () => {
  const [article, setArticle] = useState({});
  const [biographicalReference, setBiographicalReference] = useState('');
  const [comments, setComments] = useState([]);
  const [articlePdf, setArticlePdf] = useState('');
  

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [annotation, setAnnotation] = useState('');
  const [words, setWords] = useState('');
  const [literature, setLiterature] = useState('');

  // const [fetchArticle, isArticleLoading, articleError] = useFetching(async () => {
  //   const articleResponse = await IssuesService.getArticleById(id);
  //   setBiographicalReference(articleResponse["authors"].join(", ") + " " + articleResponse["title"]["Ru"] + ". " + "Ural Radio Engineering Journal. 2024");
  //   setArticle(articleResponse);
  //   setTitle(articleResponse["title"]["Ru"]);
  //   setAuthors(articleResponse["authors"].join(", "));
  //   setAnnotation(articleResponse["content"]["Ru"]);
  //   setWords(articleResponse["keywords"].map(item => item["Ru"]).join(", "));
  //   setLiterature(articleResponse["literature"].join("\n"));
  // });


  // const [fetchComments, isCommentsLoading, commentsError] = useFetching(async () => {
  //   const commentsResponse = await IssuesService.getCommentsByArticleId(id);
  //   setComments(commentsResponse);
  // });


  // const [fetchArticlePdf, isIssuePdfLoading, issuePdfError] = useFetching( async () => {
  //   const articlePdfResponse = await IssuesService.getFileLinkById("6599a59efe7f2cec36368d71");
  //   // console.log(articlePdfResponse);
  //   setArticlePdf(articlePdfResponse);
  // })


  // useEffect(() => {
  //   fetchArticle();
  //   fetchComments();
  // }, [])

  // useEffect(() => {
  //   fetchArticlePdf();
  // }, [article])



  return (
    <>
      <div className='article'>
        <input className='article__title-input' type="text" placeholder='Введите заголовок статьи...' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input className='article__authors-input' type="text" placeholder='Введите авторов через запятую...' value={authors} onChange={(e) => setAuthors(e.target.value)}/>

        <div className="issue__load">
          <label className="issue__load-file">
            <input type="file" name="file"/>		
            <span>Выберите файл</span>
          </label>
        </div>
            
          
        <p className='article__subtitle'>Аннотация</p>
        <textarea className='article__annotation-input article__textarea' placeholder='Введите текст...' value={annotation} onChange={(e) => setAnnotation(e.target.value)}/>

        <p className='article__subtitle'>Ключевые слова</p>
        <textarea className='article__words-input article__textarea' placeholder='Введите ключевые слова через запятую...' value={words} onChange={(e) => setWords(e.target.value)}/>

        <p className='article__subtitle'>Литература</p>
        <textarea className='article__literature-input article__textarea' placeholder='Введите литературу через перенос строки(Enter)...' value={literature} onChange={(e) => setWords(e.target.value)}/>
        <button className='article__comment-button' onClick={() => console.log(annotation)}>Сохранить</button>
      </div>
    </>
  );
};

export default ArticleCreatePage;