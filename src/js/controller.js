import { async } from 'regenerator-runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';


// import icons from '../img/icons.svg';  // Parcel 1
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);

    if(!id) return;

    recipeView.renderSpinner();


    // 1) Loading recipe
    await model.loadRecipe(id);


    // 2) Rendering the recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    const query = searchView.getQuery();
    if(!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch(err) {
    console.log(err);
  }
};
controlSearchResults();

// Publisher subscriber pattern
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();





