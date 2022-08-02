const axios = require('axios');
const { Router } = require('express');
const {Recipe, Diet} = require('../db')
const {apiKey} = process.env

const router = Router();
let recipeAllDiets = function (recipe){
    let diets2 = recipe.diets
            if (recipe.vegetarian && !diets2.includes("vegetarian")) diets2.push("vegetarian")
            if (recipe.vegan && !diets2.includes("vegan")) diets2.push("vegan")
            if (recipe.glutenFree && !diets2.includes("gluten free")) diets2.push("gluten free")           
            return {id: recipe.id,
                name: recipe.title,
                image: recipe.image,
                summary: recipe.summary,
                healthScore: recipe.healthScore,        
                steps: recipe.instructions,
                diets: diets2
            }
}

let recipeDbDiets = function (recipes) {
    let recipes2 = recipes.map(r => {
        return {
            id: r.id,
            name: r.name,
            summary: r.summary,
            healthScore: r.healthScore,
            steps: r.steps,
            diets: r.diets.length? r.diets.map(d => d.name) : r.diets
        }
    })
    return recipes2
}


router.get('/', (req, res, next) => {   
    let promesa1 = axios({url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true`, params: {number: 100}})
    let name = req.query.name
    // let promesa1 = axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')
    let promesa2 = Diet.findAll()
    Promise.all([promesa1, promesa2])
    .then((response) => {
        let allDietsDb = response[1].map(d => d.name)
        let allDiets = []
        let recipesApi = response[0].data.results.map((recipe) => {
            recipeAllDiets(recipe)
            for (let diet of recipe.diets) {
                if (!allDiets.includes(diet)) {
                    allDiets.push(diet)
                }
            }
            return recipeAllDiets(recipe)
        })        
        if (!name) {
        allDietsDb.forEach(async (d) => {
            if (!allDiets.includes(d)) {
                await Diet.destroy({where: {name: d}})
            }})
        allDiets.forEach(async (e) => await Diet.findOrCreate({where: {name: e}}))
        }
        Recipe.findAll({include: {model: Diet, attributes: ['name']}})
        .then((resp) => {
            let recipesDb = recipeDbDiets(resp)
            let allRecipes = [...recipesApi, ...recipesDb]
            
            if (name) {
                allRecipes = allRecipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()) === true)
            }            
            allRecipes.length === 0? res.send([[{error: 'Recipe not found', id: 'error'}], allDiets]) : res.send([allRecipes, allDiets])
        })
    })
    .catch((error) => {
        next(error)
    })
})

router.get('/:idRecipe', async (req, res, next) => {
    try {
    let {idRecipe} = req.params
    if (typeof idRecipe === 'string' && idRecipe.length < 10) {
    let recipe = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${apiKey}`)      
    let recipe2 = recipeAllDiets(recipe.data)
        res.send(recipe2)
    } 
    else {
        let recipe = await Recipe.findByPk(idRecipe, {include: {model: Diet, attributes: ['name']}})       
        let recipe2 = recipeDbDiets([recipe])
        res.send(recipe2[0])
    }
    } catch(error) {next(error)}   
})

router.post('/', async (req, res, next) => {
    try{
        const {name, diets, summary, healthScore, steps} = req.body
        const newRecipe = await Recipe.create({             
            name,
            summary,
            healthScore,
            steps
        })
        let recipeDiets = await Diet.findAll({
            where: {name: diets}
        })
        newRecipe.addDiet(recipeDiets)        
        res.status(201).send({...newRecipe.dataValues, diets})
    } catch(error){
        next(error)
    }
})

router.delete('/', (req, res, next) => {
    res.send('soy delete /recipes')
})

router.put('/', (req, res, next) => {
    res.send('soy put /recipes')
})


module.exports = router;
