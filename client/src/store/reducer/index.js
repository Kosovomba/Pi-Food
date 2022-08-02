const initialState = {recipes: [], filteredRecipes: [], dietsDb: [], orderedRecipes: []}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_RECIPES':
            return {recipes: action.payload[0], filteredRecipes: action.payload[0], dietsDb: action.payload[1], orderedRecipes: action.payload[0]}
        case 'SEARCH_RECIPES': 
            return {...state, filteredRecipes: action.payload[0], dietsDb: action.payload[1], orderedRecipes:action.payload[0]}
        case 'ADD_RECIPE':
            return {...state, recipes: [...state.recipes, action.payload]}
        case 'SORT':
            let sortRecipes = [...state.filteredRecipes]
            let sorts = action.payload
            let mod
            sorts.indicator === 'Alfabetically'? mod = 'name': mod = 'healthScore'
            if (sorts.order !== 'Not ordered') {
            sortRecipes = sortRecipes.sort((a, b)=>{
                if (a[mod] < b[mod]) {
                    return sorts.order === 'Ascending'? -1: 1
                }
                if (a[mod] > b[mod]) {
                    return sorts.order === 'Descending'? -1: 1
                }
                return 0
            })
            return {
                ...state, orderedRecipes: sortRecipes
            }
            } else {
                return {
                    ...state, orderedRecipes: state.filteredRecipes
                }
            }
        case 'FILTER':
            if (action.payload !== 'Show all recipes') {
            let allRecipes = [...state.recipes]
            allRecipes = allRecipes.filter((rec)=> rec.diets.includes(action.payload) === true)            
            return {
                ...state, orderedRecipes: allRecipes, filteredRecipes: allRecipes
            }} else {
                return {
                    ...state, orderedRecipes: state.recipes, filteredRecipes: state.recipes
                }
            }

        default: return state
    }
}