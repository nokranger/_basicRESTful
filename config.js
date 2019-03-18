const mongoose = require('mongoose')
try {
  const db = mongoose.connect('mongodb+srv://nokranger:'+ 
  process.env.MONGO_ATLAS_PW+
  '@node-rest-jyl94.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
  })
  if (db) {
    console.log('connected')
    module.exports = db
  }
} catch (error) {
  console.log('error', error)
}