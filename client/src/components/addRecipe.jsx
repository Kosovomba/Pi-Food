import { useHistory } from 'react-router-dom'
import { addRecipe, fetchRecipes } from '../store/actions'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/Add.module.css'

export default function AddRecipe() {
    const [newRecipe, setNewRecipe] = useState({name: '', summary: '', healthScore: 0, steps: ''})
    const dietsDb = useSelector((state) => state.dietsDb)
    let allDietsDb = [...dietsDb]
    const recipes = useSelector((state) => state.recipes)
    const [dietsArr, setDietsArr] = useState({dietsOptions: allDietsDb, dietsSelected: []})
    let dispatch = useDispatch()
    let history = useHistory()
    let dietsOptions = dietsArr.dietsOptions
    let dietsSelected = dietsArr.dietsSelected
    let error = true
    let errorNum = false
    let errorName = false
    let errorSummary = false
    let errorSteps = false
    let recipesNames = []
    
    useEffect(()=> {
        setTimeout(()=>{
            if (recipes.length === 0) {
                history.push('/home')                
            }
        }, 1000)
    }, [history, recipes.length])

    if(newRecipe.healthScore < 0 || newRecipe.healthScore > 100) {        
        errorNum = true        
    }
    if(newRecipe.name.length === 0 || /[^a-z0-9ñáéíóú,.()\s-]/i.test(newRecipe.name) === true) {
        errorName = true
    }
    if(/[^a-z0-9ñáéíóú,.()\s-]/i.test(newRecipe.summary) === true) {
        errorSummary = true
    }
    if(/[^a-z0-9ñáéíóú,.()\s-]/i.test(newRecipe.steps) === true) {
        errorSteps = true
    }
    if (errorNum === false && errorName === false && errorSummary === false && errorSteps === false) {
        error = false
    }

    function onChange(e) {
        e.preventDefault()
        dietsOptions = dietsOptions.filter((d)=> d !== e.target.value)
        dietsSelected.push(e.target.value)
        console.log(dietsOptions, dietsSelected)
        setDietsArr({dietsOptions: dietsOptions, dietsSelected: dietsSelected})
    }
    
    function handleDiets(e) {
        e.preventDefault()
        dietsSelected = dietsSelected.filter((d)=> d !== e.target.value)
        dietsOptions.push(e.target.value)
        setDietsArr({dietsOptions: dietsOptions, dietsSelected: dietsSelected})
    }

    function onClick(e) {
        e.preventDefault()
        history.push('/home')
    }
    function onInputChange(e) {
        e.preventDefault()        
        setNewRecipe({...newRecipe, [e.target.name]: e.target.value})
    }
    function onSubmit(e) {        
        e.preventDefault()
        recipes.map((r)=> {
            return recipesNames.push(r.name)
        })        
        if (recipesNames.includes(newRecipe.name)) {
            alert('The name is in use. Insert a different one')}
            else {
        dispatch(addRecipe({...newRecipe, diets: dietsArr.dietsSelected}))
        alert('Recipe created')
        dispatch(fetchRecipes())
            history.push('/home')
        }
    }
    return <div className={styles.add}>
        <button className={styles.back} onClick={onClick}>Back</button>
        <>
        </>
        <form onSubmit={(e)=> onSubmit(e)} >
            <div>
            <label htmlFor=''>*NAME</label>
            <input type='text' name='name' onChange={onInputChange} value={newRecipe.name} placeholder = 'Insert name'/>
            {errorName === true? <span>{' Insert a name without special characters ( allowed: ,.()- ).'}</span>: <span>Name correct!</span>}
            </div>
            <div>
            <label htmlFor=''>SUMMARY</label>
            <input type='text' name='summary' onChange={onInputChange} value={newRecipe.summary} placeholder = 'Insert description'/>
            {errorSummary === true? <span>{' Must not contain special characters ( allowed: ,.()- ).'}</span>: <span> </span>}
            </div>
            <div>
            <label htmlFor=''>STEPS</label>
            <input type='text' name='steps' onChange={onInputChange} value={newRecipe.steps} placeholder = 'Insert steps'/>
            {errorSteps === true? <span>{' Must not contain special characters ( allowed: ,.()- ).'}</span>: <span> </span>}
            </div>
            <div>
            <label htmlFor=''>HEALTHSCORE</label>
            <input type='number' name='healthScore' onChange={onInputChange} value={newRecipe.healthScore} placeholder = 'Insert health score'/>
            {errorNum === true? <span>{' Must be a number from 0 to 100'}</span>: <span> </span>}
            </div>
            <div>
            <label htmlFor=''>DIETS</label>
            <select onChange={onChange} name='select'>
                <option key='options' value='options'>DIET OPTIONS</option>
                {dietsOptions.map((d) => {
                    return <option key={d} value={d}>{d}</option>
                })}
            </select>
            </div>
            <div>
            {dietsSelected.map((d) => {                    
                    return <button key={`${d} diets`} value={d} onClick={handleDiets}>{d}</button>
                })}
            </div>            
            <>
            </>
            <input className={styles.submit} type='submit' value='Create' disabled={ error? true : false}/>
        </form>        
        </div>
}