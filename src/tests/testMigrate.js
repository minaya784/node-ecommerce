const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User')
require('../models/Category')
require('../models/Product')
require('../models')

const main = async() => {
    try{
        await sequelize.sync({ force: true });

        await User.create( {
            firstName: "Germany",
    lastName: "Minaya",
    email: "minaya@gmail.com",
    password: "g1234",
    phone: "8091234567"
        })
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();