const { Router } = require('express');
const recipesRoutes = require('./recipesRoutes')
const dietsRoutes = require('./dietsRoutes')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/recipes', recipesRoutes)
router.use('/diets', dietsRoutes)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
