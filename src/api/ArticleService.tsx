import axios from "axios";


export default class ArticleService {
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

  
  static async createArticle(editionId: string, title: string, titleEn: string, authors: string[], content: string, contentEn: string, keywords: object[], filePathId: string, literature: string[], reference) {
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


  static async updateArticle(id: string, editionId: string, title: string, titleEn: string, authors: string[], content: string, contentEn: string, keywords: object[], filePathId: string, literature: string[], reference) {
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
}