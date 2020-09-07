const container = document.querySelector(".container");

const preloadImage = url => new Promise((resolve, reject) => {
  const img = new Image();
  img.src = url;

  img.onload = () => resolve(img);
  img.onerror = () => reject(url);
});

const fetchData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const load = async url => {
  const images = await fetchData(url);
  
  if (images) {
    const { drinks } = images;
    const urls = drinks.reduce((acc, { strDrinkThumb }) => [...acc, strDrinkThumb], []);

    Promise.all(urls.map(preloadImage)).then(images => {
      for (const image of images) {
        container.appendChild(image);
      }
    });
  }
};

const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';

load(url);