//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
})
// .then(() => {
//   ['dairy free',
//   'gluten free',
//   'ketogenic',
//   'lacto ovo vegetarian',
//   'lacto vegetarian',
//   'low fodmap',
//   'ovo vegetarian',
//   'paleolithic',
//   'pescatarian',
//   'primal',
//   'vegan',
//   'vegetarian',
//   'whole 30'].forEach((e) => Diet.findOrCreate({where: {name: e}}))
//   console.log('Diet types preloaded in db')
// })

// apiKey=7f90960af8ec4e6c8baa4bb8ac795251
// API_Key = 880cf0e63ea24415abdbfa6aab1b7b8a
// API_KEY11 = 82391ac3952a4287978a048301fc1fb6
// API_KEY22 = bbb4b96713e54cff8ac0b727485510b3
// API_KEY_temp =  000bb79cb9974e12a35cde5da18318e5
// API_KEY_temp1 = 237182fee3534b17a9dbd50658ef9825
// API_KEY_temp2 = f7686d9cd3ee41778ef68e2a103cef06
// API_KEY2= 29856573cd9549e696ae56e64f4569fc
// API_KEY1 = 51e21320028a400a82fe35535ab3cd1b
// API_KEY0 = d28a45d38e354c1dbe8490ee25b0f875
// API_KEY33 = aae33b9a5027414f9