import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import IssuesService from '../api/IssueService';
import { useFetching } from '../hooks/useFetching';
import CommentComponent from '../components/CommentComponent';


const ArticleEditPage = () => {
  const {id} = useParams();

  const [article, setArticle] = useState({});
  const [biographicalReference, setBiographicalReference] = useState('');
  const [biographicalReferenceEn, setBiographicalReferenceEn] = useState('');
  const [comments, setComments] = useState([]);
  const [articlePdf, setArticlePdf] = useState('');
  

  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [authors, setAuthors] = useState('');
  const [annotation, setAnnotation] = useState('');
  const [annotationEn, setAnnotationEn] = useState('');
  const [words, setWords] = useState('');
  const [wordsEn, setWordsEn] = useState('');
  const [literature, setLiterature] = useState('');

  const [file, setFile] = useState('');
  const [fileId, setFileId] = useState('');
  const filePicker = useRef(null)

  const [fetchArticle, isArticleLoading, articleError] = useFetching(async () => {
    const articleResponse = await IssuesService.getArticleById(id);
    setBiographicalReference(articleResponse["reference"]["Ru"]);
    setBiographicalReferenceEn(articleResponse["reference"]["Eng"]);
    setArticle(articleResponse);
    setTitle(articleResponse["title"]["Ru"]);
    setTitleEn(articleResponse["title"]["Eng"]);
    setAuthors(articleResponse["authors"].join(", "));
    setAnnotation(articleResponse["content"]["Ru"]);
    setAnnotationEn(articleResponse["content"]["Eng"]);
    setWords(articleResponse["keywords"].map(item => item["Ru"]).join(", "));
    setWordsEn(articleResponse["keywords"].map(item => item["Eng"]).join(", "));
    setLiterature(articleResponse["literature"].join("\n"));
  });

  const [fetchArticlePost, isArticlePostLoading, articlePostError] = useFetching( async () => {
    const authorsSend = authors.split(', ');

    const keywordsSendRu = words.split(', ');
    const keywordsSendEn = wordsEn.split(', ');
    const keywordsSend = [];
    for (let i = 0; i < keywordsSendRu.length; i++) {
      keywordsSend.push({"Ru": keywordsSendRu[i], "Eng": keywordsSendEn[i]});
    }
    console.log(keywordsSend);
    const literatureSend = literature.split('\n');
    const referenceSend = {"Ru": biographicalReference, "Eng": biographicalReferenceEn};
    const articleResponse = await IssuesService.updateArticle(article["id"], article["editionId"], title, titleEn, authorsSend, annotation, annotationEn, keywordsSend, fileId, literatureSend, referenceSend);
    console.log(articleResponse);
  })


  const [fetchArticleDelete, isArticleDeleteLoading, articleDeleteError] = useFetching( async () => {
    const articleResponse = await IssuesService.deleteArticle(id);
    console.log(articleResponse);
  })


  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async () => {
    const commentsResponse = await IssuesService.getCommentsByArticleId(id);
    setComments(commentsResponse);
  });

  const [fetchCommentsPost, isCommentsPostLoading, commentsPostError] = useFetching(async () => {
    const commentsResponse = await IssuesService.createComment(id, "текст комментария");
    setComments(commentsResponse);
  });


  const [fetchArticlePdf, isIssuePdfLoading, issuePdfError] = useFetching( async () => {
    const articlePdfResponse = await IssuesService.getFileLinkById("6599a59efe7f2cec36368d71");
    // console.log(articlePdfResponse);
    setArticlePdf(articlePdfResponse);
  })


  useEffect(() => {
    fetchArticle();
    fetchComments();
  }, [])

  useEffect(() => {
    fetchArticlePdf();
  }, [article])


  const handleChooseFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleButtonLoadFile = (e) => {
    filePicker.current.click();
  };

  const handleButtonSendFile = async (e) => {
    const form = new FormData();
    form.append("file", file);

    const res = await IssuesService.postLoadFile(form, "articles");
    
    setFileId(res.id)
    console.log(res.id);
  };


  return (
    <>
      {isArticleLoading 
        ? "загрузка"
        : <div className='article'>
            <input className='article__title-input' type="text" placeholder='Введите название статьи...' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input className='article__title-input' type="text" placeholder='Введите название статьи на английском...' value={titleEn} onChange={(e) => setTitleEn(e.target.value)}/>
            <input className='article__authors-input' type="text" value={authors} onChange={(e) => setAuthors(e.target.value)}/>
            
            <input className='hidden' ref={filePicker} type="file" name="file" accept=".pdf" onChange={handleChooseFile}/>
            <div className="issue__buttons">
              <button className='issue__button' onClick={handleButtonLoadFile}>выбрать файл</button>
              <button className='issue__button' onClick={handleButtonSendFile}>загрузить</button>
            </div>
            

            <p className='article__subtitle'>Библиографическая ссылка</p>
            <textarea className='article__annotation-input article__textarea' value={biographicalReference} onChange={(e) => setBiographicalReference(e.target.value)}/>
            <textarea className='article__annotation-input article__textarea' value={biographicalReferenceEn} onChange={(e) => setBiographicalReferenceEn(e.target.value)}/>

            <p className='article__subtitle'>Аннотация</p>
            <textarea className='article__annotation-input article__textarea' value={annotation} onChange={(e) => setAnnotation(e.target.value)}/>
            <textarea className='article__annotation-input article__textarea' value={annotationEn} onChange={(e) => setAnnotationEn(e.target.value)}/>

            <p className='article__subtitle'>Ключевые слова</p>
            <textarea className='article__words-input article__textarea' value={words} onChange={(e) => setWords(e.target.value)}/>
            <textarea className='article__words-input article__textarea' value={wordsEn} onChange={(e) => setWordsEn(e.target.value)}/>
            
            <p className='article__subtitle'>Литература</p>
            <textarea className='article__literature-input article__textarea' value={literature} onChange={(e) => setLiterature(e.target.value)}/>
            
            
            
            <p className='article__title'>Комментарии</p>
            {isArticleLoading && isCommentsLoading
              ? <p>загрузка</p>
              : <div className="article__comments">
                  {comments.map((comment, commentId) => <CommentComponent key={commentId} comment={comment}/>)}
                </div>
            } 
            
            <button className='article__comment-button' onClick={() => fetchArticlePost()}>Сохранить</button>
            <button className='article__comment-button' onClick={() => fetchArticleDelete()}>Удалить</button>
          </div>
      }
    </>
  );
};

export default ArticleEditPage;