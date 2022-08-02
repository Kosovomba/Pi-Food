const { Router } = require('express');
const {Diet} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res, next) => {
    try {
        let diet = await Diet.findAll()
        diet = diet.map(d => d.name)
        res.send(diet)
    } catch(error){
        next(error)
    }
})

module.exports = router;
