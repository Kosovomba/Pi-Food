import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import PageContainer from './pageContainer'
import SearchBar from './searchBar'
import { Link } from 'react-router-dom'
import { fetchRecipes } from '../store/actions'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [page, setPage] = useState(1)    
    const recipes = useSelector((state) => state.orderedRecipes)
    const dispatch = useDispatch()
    useEffect(()=> {
        setTimeout(()=>{
            if (recipes.length === 0) {
                dispatch(fetchRecipes())
            }
        }, 1500)        
    }, [dispatch, recipes.length])

    return       <div className={styles.container}>
        <SearchBar setPage={setPage}/>        
        <PageContainer setPage={setPage} page={page} recipes={recipes}/>
        <Link className={styles.create}to='/add'>Create a recipe!</Link>
    </div>
}