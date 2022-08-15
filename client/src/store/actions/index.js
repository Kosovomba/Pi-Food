import axios from 'axios'

export function fetchRecipes() {
    return function(dispatch) {        
        axios.get(`${axios.defaults.baseURL}/api/recipes`)
        .then((recipes) => {            
            dispatch({
                type: 'FETCH_RECIPES',
                payload: recipes.data
            })
        })
        .catch((error)=> {
            console.log(error)
        })
    }
}

export function searchRecipes(search) {
    return function(dispatch) {
        axios.get(`${axios.defaults.baseURL}/api/recipes?name=${search}`)
        .then((recipes) => {
            dispatch({
                type: 'SEARCH_RECIPES',
                payload: recipes.data
            })
        })
        .catch((error)=> {
            console.log(error)
        })
    }
}

export function sort(sorts) {
    return { 
            type: 'SORT',
            payload: sorts
    }
}

export function filterRecipes(filter) {
    return {
        type: 'FILTER',
        payload: filter
    }
}