import {Link} from 'react-router-dom'
import styles from '../styles/Recipe.module.css'
export default function Recipe({id, name, image, diets, error}) {
    if (!error) {
    return <div className={styles.container}>
        <Link className={styles.name} to={`/home/${id}`}>{name}</Link>
        <img width="340" height="250" src={image?image:'https://us.123rf.com/450wm/gioiak2/gioiak21708/gioiak2170800312/84667691-signo-de-interrogaci%C3%B3n-rojo-en-un-plato-sobre-fondo-negro-ilustraci%C3%B3n-3d.jpg?ver=6'} alt='imagen'/>
        <p className={styles.diets}>{diets.length > 0?'Diets: ' + diets.map(d => ` ${d}`) + '.':'Diets: none.'}</p>        
    </div> 
    } else {
        return <div><h2 key = {id}>{error}</h2></div>
    }
}