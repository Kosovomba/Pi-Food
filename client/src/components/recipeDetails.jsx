import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom'

export default function RecipeDetails() {
    let history = useHistory()
    function onClick(e) {
        e.preventDefault()
        history.goBack()
    }
    const [recipe, setRecipe] = useState(null)
    let {id} = useParams()
    useEffect(()=> {
        axios.get(`http://localhost:3001/api/recipes/${id}`)  
        .then((response) => {
        setRecipe(response.data)
        })
        return () => {
            setRecipe(null)
        }
    },[id])
    return <div>
        <button onClick={onClick}>Back</button>
        { recipe?
        <>
        <h4>{recipe.name}</h4>
        <img src={recipe.image?recipe.image:'https://us.123rf.com/450wm/gioiak2/gioiak21708/gioiak2170800312/84667691-signo-de-interrogaci%C3%B3n-rojo-en-un-plato-sobre-fondo-negro-ilustraci%C3%B3n-3d.jpg?ver=6'} alt='imagen'/>
        <p>{recipe.diets.length > 0?'Diets: ' + recipe.diets.map(d => ` ${d}`) + '.':'Diets: none.'}</p>
        <h6>{recipe.summary?recipe.summary.replace(/<[^>]*>/g, ''):`No summary.`}</h6>
        <h6>{recipe.healthScore}</h6>
        <h6>{recipe.steps?recipe.steps.replace(/<[^>]*>/g, ''):`No steps.`}</h6>
        </>
        : <><h1>Loading...</h1>
            <h1>Recipe not found.</h1></>}
        </div>
}