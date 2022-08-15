// import { fetchRecipes } from '../store/actions'
import styles from '../styles/PageContainer.module.css'
import Recipe from './recipe'

export default function PageContainer({page, setPage, recipes}) {  
    function onClick(e) {       
        e.preventDefault()
        setPage(e.target.value*1)
    } 
    function onClick2(e) {       
        e.preventDefault()         
        setPage(page - 1)         
    } 
    function onClick3(e) {       
        e.preventDefault()         
        setPage(page + 1)         
    } 
    
    let pag = Math.ceil(recipes.length/9)
    if (recipes.length === 1 && recipes[0].error) pag = pag - 1
    const pages = [] 
    for (let i = 1; i <= pag; i++) {
        pages.push(i)
    }
    let pageButtons = [<button className={page === 1? styles.buttonOff:styles.button} disabled={page === 1?true: false} onClick={onClick2} key={'anterior'} value={'<<'}>{'<<'}</button>, ...pages.map((p)=> {
        return <button className={page*1===p?styles.buttonOff:styles.button} disabled={page*1===p?true:false} onClick={onClick} key={p} value={p}>{p}</button>
    }), <button className={page >= pages.length? styles.buttonOff:styles.button} disabled={page >= pages.length?true: false} onClick={onClick3} key={'siguiente'} value={'>>'}>{'>>'}</button>]

    let cont = 0
    let recipesPerPag = []

    while((page - 1)*9 + cont < recipes.length && cont < 9) {
            recipesPerPag = [...recipesPerPag, recipes[(page - 1)*9 + cont]]
            cont++
        }
    if (recipes.length) {
        if (recipesPerPag.length === 0) recipesPerPag.push(recipes[0])
        return <div>
            <div className={styles.pagesTop}>
            {pageButtons}
            </div>
            <div className={styles.recipes}>
            {recipesPerPag.map((recipe) => {
                return <Recipe key={recipe.id} id={recipe.id} name = {recipe.name} image = {recipe.image} diets = {recipe.diets} error = {recipe.error} />
                          })}
        </div >
        <div className={styles.pagesBottom}>
            {pageButtons}
            </div>
        </div>
    }
    else {
    return <div className={styles.loading}><h2>Loading...</h2></div>
    }
}