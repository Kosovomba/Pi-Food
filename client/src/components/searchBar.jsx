import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { searchRecipes, filterRecipes } from '../store/actions'
import Order from './Order'
import styles from '../styles/Home.module.css'

export default function SearchBar({setPage}) {
    const [search, setSearch] = useState('')  
    const diets = useSelector((state) => state.dietsDb)
    let dispatch = useDispatch()    
    function onSubmit(e) {
        e.preventDefault()
        dispatch(searchRecipes(search))
        setTimeout(()=>{
            setPage(1)            
        }, 2500)
        setSearch('')
    }
    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)
    }
    function clickFilter(e){
        e.preventDefault()
        dispatch(filterRecipes(e.target.value))        
        setPage(1)
    }

    return <div className={styles.searchBar}>
        <form onSubmit={onSubmit} >
            <input type='text' onChange = {onInputChange} value ={search} placeholder = 'Search recipes'/>
            <input type='submit' value='Search'/>
        </form>
        <>
        <Order/>
        <button key={'all recipes'} value={'Show all recipes'} onClick={clickFilter}>Show all recipes</button>
        <>Filter by diet type</>
        {diets.map((d) => {
                    return <button key={`${d} diet`} value={d} onClick={clickFilter}>{d}</button>
                })}
        </>
        </div>
}