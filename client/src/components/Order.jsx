import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { sort } from '../store/actions'
import styles from '../styles/Home.module.css'

export default function Order() {
    const [sorts, setSorts] = useState({order: 'Not ordered', indicator: 'Alfabetically', flag: 1})
    let dispatch = useDispatch()
    useEffect(()=> {
        dispatch(sort(sorts))        
    }, [sorts, dispatch])
    // useEffect(()=> {
    //    return () => {
    //         setSorts({order: 'Not ordered', indicator: 'Alfabetically'})
    //     }
    // }, [])
    function handleChange(e) {
        setSorts({...sorts, [e.target.name]: e.target.value})
    }   
    return <div className={styles.order}>
            <label className={styles.label} htmlFor=""> ORDER </label>
        <select name='order' onChange={handleChange} value={sorts.order}>
            <option>Not ordered</option>
            <option>Ascending</option>
            <option>Descending</option>
        </select>
            <label className={styles.label} htmlFor=""> INDICATOR </label>
        <select name='indicator' onChange={handleChange} value={sorts.indicator}>
            <option>Alfabetically</option>
            <option>By health score</option>
        </select>            
    </div>
}