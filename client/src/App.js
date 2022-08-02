import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/home'
import LandingPage from './components/landingPage'
import RecipeDetails from './components/recipeDetails'
import AddRecipe from './components/addRecipe';

function App() {  
  return (
    <div className="App">
      <Route exact path="/home">
        <Home/>
      </Route>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route path="/add">
        <AddRecipe/>
      </Route>
      <Route path="/home/:id">
        <RecipeDetails/>
      </Route>
    </div>
  );
}

export default App;
