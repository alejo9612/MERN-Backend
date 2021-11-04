const mongoose = require('mongoose');

const dbConection = async() =>{

    try {
       await mongoose.connect(process.env.DB_CONNECTED);

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }
}

module.exports = dbConection;