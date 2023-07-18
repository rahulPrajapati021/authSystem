const mongoose = require('mongoose');

const {MONGODB_URL} = process.env;

const configs = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

exports.connect = () => {
    mongoose.connect(MONGODB_URL)
.then(
    console.log(`Db connected successfully`)
)
.catch(error => {
    console.log(`Db connection failed`);
    console.log(error);
    process.exit(1);
})
}