import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import IssuesService from '../api/IssueService';


const ReductorEditPage = () => {
  const {id} = useParams();
  const [reductor, setReductor] = useState();

  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [description, setDesription] = useState('');
  const [descriptionEn, setDesriptionEn] = useState('');
  const [email, setEmail] = useState('');
  const [scopus, setScopus] = useState('');
  const [rank, setRank] = useState('');
  const [content, setContent] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [location, setLocation] = useState('');
  const [locationEn, setLocationEn] = useState('');

  const [image, setImage] = useState();
  const [imageId, setImageId] = useState('');

  const [fetchReductor, isReductorLoading, reductorError] = useFetching( async () => {
    const reductorResponse = await IssuesService.getReductorById(id);
    
    setReductor(reductorResponse);
    setName(reductorResponse["name"]["Ru"]);
    setNameEn(reductorResponse["name"]["Eng"])
    setDesription(reductorResponse["description"]["Ru"]);
    setDesriptionEn(reductorResponse["description"]["Eng"]);
    setEmail(reductorResponse["email"]);
    setScopus(reductorResponse["scopus"]);
    setRank(reductorResponse["rank"]);
    setContent(reductorResponse["content"]["Ru"]);
    setContentEn(reductorResponse["content"]["Eng"]);
    setLocation(reductorResponse["location"]["Ru"]);
    setLocationEn(reductorResponse["location"]["Eng"]);
  })


  const [fetchReductorUpdate, isReductorUpdateLoading, reductorUpdateError] = useFetching( async () => {
    const reductorUpdateResponse = await IssuesService.updateReductor(id, name, nameEn, email, scopus, imageId, description, descriptionEn, content, contentEn, location, locationEn, rank);
  })

  const [fetchReductorDelete, isReductorDeleteLoading, reductorDeleteError] = useFetching( async () => {
    const reductorUpdateResponse = await IssuesService.deleteReductor(id);
  })



  useEffect(() => {
    fetchReductor();
  }, [])


  const handleChooseFile = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleButtonSendFile = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("file", image);

    const res = await IssuesService.postLoadFile(form, "avatars");
    
    setImageId(res.id)
    console.log(res.id);
  };



  return (
    <>
      {
        isReductorLoading 
        ? <></> 
        : <form className='reductor__edit-form' action="">
            <div className="reductor__edit-text">ФИО</div>
            <input className="reductor__edit-input" type="text" placeholder='Введите ФИО...' value={name} onChange={(e) => setName(e.target.value)}/>
            <input className="reductor__edit-input" type="text" placeholder='Введите ФИО на английском...' value={nameEn} onChange={(e) => setNameEn(e.target.value)}/>
            
            <div className="reductor__edit-text">email</div>
            <input className="reductor__edit-input" type="text" placeholder='Введите email...' value={email} onChange={(e) => setEmail(e.target.value)}/>

            <div className="reductor__edit-text">scopus</div>
            <input className="reductor__edit-input" type="text" placeholder='Введите scopus...' value={scopus} onChange={(e) => setScopus(e.target.value)}/>
          
            <div className="reductor__edit-text">Место работы</div>
            <input className="reductor__edit-input" type="text" placeholder='Введите место работы...' value={description} onChange={(e) => setDesription(e.target.value)}/>
            <input className="reductor__edit-input" type="text" placeholder='Введите место работы на английском...' value={descriptionEn} onChange={(e) => setDesriptionEn(e.target.value)}/>

            <div className="reductor__edit-text">Страна, город</div>
            <input className="reductor__edit-input" type="text" placeholder='Введите место проживания...' value={location} onChange={(e) => setLocation(e.target.value)}/>
            <input className="reductor__edit-input" type="text" placeholder='Введите место проживания на английском...' value={locationEn} onChange={(e) => setLocationEn(e.target.value)}/>

            <div className="reductor__edit-text">Должность</div>
            <input className="reductor__edit-input" type="text" placeholder='Введите должность...' value={rank} onChange={(e) => setRank(e.target.value)}/>
          
            <div className="reductor__edit-text">Описание</div>
            <textarea className="reductor__edit-textarea" placeholder='Введите описание...' value={content} onChange={(e) => setContent(e.target.value)}/>
            <textarea className="reductor__edit-textarea" placeholder='Введите описание на английском...' value={contentEn} onChange={(e) => setContentEn(e.target.value)}/>

            <div className="reductor__edit-text">Изображение</div>
            <input className="reductor__edit-file" type="file" onChange={handleChooseFile}/>
            <button className="reductor__edit-button" onClick={handleButtonSendFile}>загрузить</button>
            <button className="reductor__edit-button" onClick={(e) => {
              e.preventDefault();
              fetchReductorUpdate()
            }}>Сохранить изменения</button>
            <button className="reductor__edit-button" onClick={(e) => {
              e.preventDefault();
              fetchReductorDelete()
            }}>Удалить</button>
          </form>
      }
    </>
    
  );
};

export default ReductorEditPage;