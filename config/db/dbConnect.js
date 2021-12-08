const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL , {useNewUrlParser : true} )
        console.log('db is connected succesfuly')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = dbConnect ;