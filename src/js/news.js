import apiService from './servises/apiService';
const refs = {
  searchForm: document.querySelector('#searchForm'),
  articleList: document.querySelector('.gallery'),
  loadMore: document.querySelector('button[date-action="load-more"]'),
  // const list = document.querySelector(".gallery");
};
// console.log(apiService);
refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMore.addEventListener('click',loadMore);
refs.loadMore.addEventListener('click',scroll);
window.addEventListener('scroll',infScrol);

function loadMore (e){
    apiService.buttomPosition=refs.articleList.getBoundingClientRect().bottom
    apiService.pageNumber+=1;
    apiService.fetchImages().then(data => {

        const markup = getTamplite(data.hits);
        refs.articleList.insertAdjacentHTML('beforeend', markup);
      })
      
}

function infScrol() {
    console.log('222');
if (document.documentElement.getBoundingClientRect().bottom < document.documentElement.clientHeight+10){
    console.log('111');
    loadMore()
}else return
}

function scroll (){
    window.scrollTo({
        top:apiService.buttomPosition,
        left: 0,
        behavior: 'smooth'
      });
}

function searchFormSubmitHandler(e) {
  e.preventDefault();
  apiService.pageNumber=1;

  apiService.query = e.currentTarget.elements.query.value;

  apiService.fetchImages().then(data => {
    const markup = getTamplite(data.hits);
    refs.articleList.innerHTML = markup;
  });
}

function getTamplite(data) {
  return data.reduce((acc, foto) => {
    return (acc += `<li class="photo-card">
<img src=${foto.webformatURL} alt="" data-bigfoto=${foto.largeImageURL} />

<div class="stats">
  <p class="stats-item">
    <i class="material-icons">thumb_up</i>
    ${foto.likes}
  </p>
  <p class="stats-item">
    <i class="material-icons">visibility</i>
    ${foto.views}
  </p>
  <p class="stats-item">
    <i class="material-icons">comment</i>
    ${foto.comments}
  </p>
  <p class="stats-item">
    <i class="material-icons">cloud_download</i>
   ${foto.downloads}
  </p>
</div>
</li>`);
  }, '');
}
