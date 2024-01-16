// import { getAllIssues, getIssueById } from "../mock/Issues"
// import { getAllReductors } from "../mock/reductors";
// import { getFileById } from "../mock/files";
// import { getAllArticles, getArticlesByIssueId, getArticleById } from "../mock/articles";
// import { getAllComments, getCommentsByArticleId, getCommentById } from "../mock/comments";
import axios from "axios";


export default class IssueService {
  // Выпуски
  static async getAllIssues() {
    const response =  await axios.get('https://journa-token.onrender.com/editions/get/all'); 
    return response["data"]["data"];
  }


  static async getIssueById(id) {
    const response =  await axios.get(`https://journa-token.onrender.com/editions/get/${id}`); 
    return response["data"]["edition"];
  }


  static async createIssue(fileId: string, imageId: string, videoId: string, title: string, titleEn) {
    const response = await fetch('https://journa-token.onrender.com/admin/editions/create', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "title": {
          "Ru": title,
          "Eng": titleEn
        },
        "date":"2003-11-01T12:00:00Z",
        "filePathId": fileId,
        "videoPathId": videoId,
        "coverPathId" : imageId
      })
    }).then(result => {
      return result;
    });

    return response;
  }

  
  static async updateIssue(issueId: string, fileId: string, imageId: string, videoId: string, title: string, titleEn: string) {
    const response = await fetch('https://journa-token.onrender.com/admin/editions/update', {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "id": issueId,
        "title": {
          "Ru": title,
          "Eng": titleEn
        },
        "filePathId": fileId,
        "videoPathId": videoId,
        "coverPathId" : imageId
      })
    }).then(result => {
      return result;
    });

    return response;
  }
  static async deleteIssue(issueId: string) {
    const response = await fetch(`https://journa-token.onrender.com/admin/editions/delete/${issueId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then(result => {
      return result;
    });

    return response;
  }





  // Статьи
  static async getAllArticles() {
    const response =  await axios.get('https://journa-token.onrender.com/articles/get/all'); 
    return response["data"]["data"];
  }
  static async getArticlesByIssueId(id: string) {
    const response =  await axios.get('https://journa-token.onrender.com/articles/get/all'); 
    return response["data"]["data"].filter(item => item["editionId"] == id);
  }
  static async getArticleById(id: string) {
    const response =  await axios.get(`https://journa-token.onrender.com/articles/get/${id}`); 
    return response["data"]["article"];
  }
  static async createArticle(editionId: string, title: string, titleEn, authors: string[], content: string, contentEn, keywords: object[], filePathId: string, literature: string[], reference) {
    const response = await fetch('https://journa-token.onrender.com/admin/articles/create', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "editionId": editionId,
        "title" : 
          {
            "Ru": title,
            "Eng": titleEn
          },
          "authors" : authors,
          "content" :
          {
            "Ru": content,
            "Eng": "test article content"
          },
          "keywords" : keywords,
        "filePathId" : filePathId,
        "literature" : literature,
        "reference": reference
      })
    }).then(result => {
      return result;
    });

    return response;
  }
  static async createArticleFronJson(json: object) {
    const response = await fetch('https://journa-token.onrender.com/admin/articles/create', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify(json)
    }).then(result => {
      return result;
    });

    return response;
  }
  static async updateArticle(id: string, editionId: string, title: string, titleEn, authors: string[], content: string, contentEn, keywords: object[], filePathId: string, literature: string[], reference) {
    const response = await fetch(`https://journa-token.onrender.com/admin/articles/update`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "id": id,
        "editionId": editionId,
        "title" : 
          {
            "Ru": title,
            "Eng": titleEn
          },
          "authors" : authors,
          "content" : 
          {
            "Ru": content,
            "Eng": contentEn
          },
          "keywords" : keywords,
        "filePathId" : filePathId,
        "literature" : literature,
        "reference": reference
      })
    }).then(result => {
      return result;
    });

    return response;
  }
  static async deleteArticle(articleId: string) {
    const response = await fetch(`https://journa-token.onrender.com/admin/articles/delete/${articleId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then(result => {
      return result;
    });

    return response;
  }

  



  // Комментарии
  static async getAllComments() {
    const response =  await axios.get(`https://journa-token.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"];
  }
  static async getCommentsByArticleId(id: string) {
    const response =  await axios.get(`https://journa-token.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["articleId"] == id);
  }
  static async getApprovedCommentsByArticleId(id: string) {
    const response =  await axios.get(`https://journa-token.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["articleId"] == id && item["isApproved"]);
  }
  static async getNotApprovedCommentsByArticleId(id: string) {
    const response =  await axios.get(`https://journa-token.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["articleId"] == id && !item["isApproved"]);
  }
  static async getCommentById(id: string) {
    const response =  await axios.get(`https://journa-token.onrender.com/comments/get/all?onlyApproved=false`); 
    return response["data"]["data"].filter(item => item["id"] == id);
  }
  static async createComment(articleId: string, content: string) {
    const response = await fetch('https://journa-token.onrender.com/comments/create', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
        // "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "articleId": articleId,
        "content": content,
        "date":"2003-11-01T12:00:00Z"
    })
    }).then(result => {
      return result;
    });

    return response;
  }
  static async approveComment(id: string) {
    const response = await fetch('https://journa-token.onrender.com/admin/comments/approve', {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "id": id,
        "content": "contentEng"
    })
    }).then(result => {
      return result;
    });

    return response;
  }
  static async deleteComment(commentId: string) {
    const response = await fetch(`https://journa-token.onrender.com/admin/comments/delete/${commentId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then(result => {
      return result;
    });

    return response;
  }




  // Редакторы
  static async getAllReductors() {
    const response =  await axios.get('https://journa-token.onrender.com/council/members/get/all');
    return response["data"]["data"];
  }


  static async getReductorById(id: string) {
    const response =  await axios.get(`https://journa-token.onrender.com/council/members/get/${id}`);
    return response["data"]["member"];
  }


  static async createReductor(name, nameEn, email, scopus, imagePathId, description, descriptionEn, content, contentEn, location, locationEn, rank) {
    const response = await fetch('https://journa-token.onrender.com/admin/council/members/create', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "name" : {
          "Ru": name,
          "Eng": nameEn
        },
        "email" : email,
        "imagePathId" : imagePathId,
        "location": {
          "Ru": location,
          "Eng": locationEn
        },
        "scopus" : scopus,
        "description" : {
          "Ru": description,
          "Eng": descriptionEn
        },
        "content" :  {
          "Ru": content,
          "Eng": contentEn
        },
        "rank": rank
      })
    }).then(result => {
      return result;
    });

    return response;
  }


  static async updateReductor(id, name, nameEn, email, scopus, imagePathId, description, descriptionEn, content, contentEn, location, locationEn, rank) {
    const response = await fetch(`https://journa-token.onrender.com/admin/council/members/update/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "name" : {
          "Ru": name,
          "Eng": nameEn
        },
        "email" : email,
        "imagePathId" : imagePathId,
        "location": {
          "Ru": location,
          "Eng": locationEn
        },
        "scopus" : scopus,
        "description" : {
          "Ru": description,
          "Eng": descriptionEn
        },
        "content" :  {
          "Ru": content,
          "Eng": contentEn
        },
        "rank": rank
      })
    }).then(result => {
      return result;
    });

    return response;
  }
  static async deleteReductor(reductorId: string) {
    const response = await fetch(`https://journa-token.onrender.com/admin/council/members/delete/${reductorId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then(result => {
      return result;
    });

    return response;
  }





  // Файлы
  static async getImageLinkById(id: string) {
    return `https://journa-token.onrender.com/files/get/${id}?download=false`;
  }
  static async getFileLinkById(id: string) {
    return `https://journa-token.onrender.com/files/get/${id}?download=true`;
  }
  static async postLoadFile(form: FormData, type: string) {
    const response = await fetch(`https://journa-token.onrender.com/admin/files/upload/${type}`, {
      method: 'POST',
      headers: {
        // "Content-Type": 'multipart/form-data',
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      },
      body: form
    }).then((result) => {
      return result.json();
    })
    return response;
  }
  static async deletefile(fileId: string) {
    const response = await fetch(`https://journa-token.onrender.com/admin/files/delete/${fileId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then(result => {
      return result;
    });

    return response;
  }




  // вход
  static async postAuth(login: string, password: string) {
    const response = await fetch("https://journa-token.onrender.com/admin/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": login,
        "password": password
      })
    }).then((response => {
      return response.json();
    }));
    return response;
  }


  // static async postLoadFile(filePath: string) {
  //   const response =  await fetch("https://journa-token.onrender.com/admin/files/upload/editions", {
  //     method: 'POST',
  //     credentials: 'include',
      
  //     headers: {
  //       "Content-Type": 'multipart/form-data',
  //       "Cookie": "admin=MTcwNDgzMzMyMXxEWDhFQVFMX2dBQUJFQUVRQUFBa180QUFBUVp6ZEhKcGJtY01Cd0FGWVdSdGFXNEdjM1J5YVc1bkRBY0FCV0ZrYldsdXz_nJ91UydqxfvO_vB_zP-RKS9Oj8rZoD8OsYvM0HQmzQ=="
  //     },
  //     body: JSON.stringify({
  //       file: filePath
  //     })
  //   }).then((response => {
  //     // console.log(response.json());
  //     return response
  //   }));
  //   return response;
  // }
}