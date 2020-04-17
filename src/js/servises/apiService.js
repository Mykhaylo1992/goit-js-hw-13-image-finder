
//  https://pixabay.com/api/
//  ?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&
//  key=твой_ключ
export default {
    query: '',
    pageNumber: 1,
    buttomPosition:0,
    baseUrl:'https://pixabay.com/api/',
  key: '16056306-b774bb8eb3846f9eca7b7b057',

   fetchImages() {
   const requestParam = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.pageNumber}&per_page=12&key=${this.key}`;
    return fetch(this.baseUrl + requestParam).then(responce => responce.json());
  },
};
