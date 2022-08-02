// import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchRecipes } from '../store/actions'
import { useHistory } from 'react-router-dom'
import styles from '../styles/LandingPage.module.css'

export default function LandingPage() {
    const [button, setButton] = useState(false)
    let history = useHistory()
    const dispatch = useDispatch()
    function onClick(e) {
        e.preventDefault()
        history.push('/home')        
    }
    useEffect(()=> {        
            dispatch(fetchRecipes())
            return () => {
                setButton(null)
               }
        }, [dispatch])
    setTimeout(()=> {
       setButton(true)
    }, 2000)
    return <div className={styles.body}>
        <div className={styles.marco}>
        <div className={styles.intro}>
        <h2>Don't know what to cook today? Or, maybe, you are too basic at cooking? Get in, and learn the best recipes, with the best instructions; even YOU, can make them! You can create and post your own recipes, too!!!</h2> 
        <button className={styles.button} onClick={onClick} disabled={ button? false : true}>Let's go!</button>
        </div>
        </div>     
        </div>
}