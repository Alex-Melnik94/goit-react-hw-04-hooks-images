const URL = 'https://pixabay.com/api/';
const API_KEY = '21964701-aaf906e928d661c46acce114f';

export const fetchImages = function (query, page) {
  return fetch(
    `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Some proplems with server'));
  });
};
