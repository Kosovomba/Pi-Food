import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styles from '../styles/Details.module.css'

export default function RecipeDetails() {
    const [recipe, setRecipe] = useState(null)
    const [flag, setFlag] = useState(true)
    let history = useHistory()
    function onClick(e) {
        e.preventDefault()
        history.goBack()
    }
    let {id} = useParams()
    useEffect(()=> {
        axios.get(`${axios.defaults.baseURL}/api/recipes/${id}`)  
        .then((response) => {
            if (!response.data.summary) {
                setFlag(false)
            } else setRecipe(response.data)
        })
        return () => {
            setRecipe(null)
        }
    },[id])
    return <div className={styles.container}>
        <div>
        <button className={styles.back} onClick={onClick}>Back</button>
        </div>
        <div>{ recipe?
        <div className={styles.container2}>
        <div className={styles.leftPage}>
        <h4 className={styles.name}>{recipe.name}</h4>
        <img width="540" height="340" src={recipe.image?recipe.image:'https://us.123rf.com/450wm/gioiak2/gioiak21708/gioiak2170800312/84667691-signo-de-interrogaci%C3%B3n-rojo-en-un-plato-sobre-fondo-negro-ilustraci%C3%B3n-3d.jpg?ver=6'} alt='imagen'/>
        <p>{recipe.diets.length > 0?'Diets: ' + recipe.diets.map(d => ` ${d}`) + '.':'Diets: none.'}</p>        
        <h6 className={styles.summary}>{recipe.summary?recipe.summary.replace(/<[^>]*>/g, ''):''}</h6>
        </div>
        <div className={styles.rightPage}>
        <p className={styles.health}>{`Health score: ${recipe.healthScore}`}</p>
        <h6 className={styles.steps}>{recipe.steps?`STEPS: ${recipe.steps.replace(/<[^>]*>/g, '')}`:''}</h6>
        <h6 className={styles.steps}>{`Ready in ${recipe.readyInMinutes}.`}</h6>
        </div>
        </div>
        : (flag?<h1>Loading...</h1>:<h1>Recipe not found.</h1>)}
        </div>
        </div>
}