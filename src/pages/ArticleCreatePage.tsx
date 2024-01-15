import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import IssuesService from '../api/IssueService';
import { useFetching } from '../hooks/useFetching';
import CommentComponent from '../components/CommentComponent';


const ArticleCreatePage = () => {
  const {id} = useParams();
  const [biographicalReference, setBiographicalReference] = useState('');
  const [biographicalReferenceEn, setBiographicalReferenceEn] = useState('');
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

  const [fetchArticle, isArticleLoading, articleError] = useFetching( async () => {
    const authorsSend = authors.split(', ');

    const keywordsSendRu = words.split(', ');
    const keywordsSendEn = wordsEn.split(', ');
    const keywordsSend = [];
    for (let i = 0; i < keywordsSendRu.length; i++) {
      keywordsSend.push({"Ru": keywordsSendRu[i], "Eng": keywordsSendEn[i]});
    }
    const referenceSend = {"Ru": biographicalReference, "Eng": biographicalReferenceEn};
    console.log(keywordsSend);
    const literatureSend = literature.split('\n');
    const article = await IssuesService.createArticle(id, title, titleEn, authorsSend, annotation, annotationEn, keywordsSend, fileId, literatureSend, referenceSend);
    console.log(literatureSend);
  })

  // const [fetchArticleJson, isArticleJsonLoading, articleJsonError] = useFetching( async () => {
    
  // })

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
      <div className='article'>
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

        {/* <p className='article__subtitle'>JSON</p>
        <textarea className='article__literature-input article__textarea' placeholder='Введите json код...' value={jsonLoad} onChange={(e) => setJsonLoad(e.target.value)}/> */}
        <button className='article__comment-button' onClick={() => fetchArticle()}>Создать</button>
      </div>
    </>
  );
};

export default ArticleCreatePage;