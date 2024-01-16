import axios from "axios";


export default class ReductorService {
  static async getAllReductors() {
    const response =  await axios.get('https://journa-token.onrender.com/council/members/get/all');
    return response["data"]["data"];
  }


  static async getReductorById(id: string) {
    const response =  await axios.get(`https://journa-token.onrender.com/council/members/get/${id}`);
    return response["data"]["member"];
  }


  static async createReductor(
    name: string, 
    nameEn: string, 
    email: string, 
    scopus: string, 
    imagePathId: string, 
    description: string, 
    descriptionEn: string, 
    content: string, 
    contentEn: string, 
    location: string, 
    locationEn: string, 
    rank: string
    ) {
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


  static async updateReductor(
    id: string, 
    name: string, 
    nameEn: string, 
    email: string, 
    scopus: string, 
    imagePathId: string, 
    description: string, 
    descriptionEn: string, 
    content: string, 
    contentEn: string, 
    location: string, 
    locationEn: string, 
    rank: string
    ) {
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
}