//connect to dB and start web server
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient //give access to MongoClient

const port = process.env.PORT || 8000 //set port to PORT or if not available then to 8000
//connect to dB by passing .env data
MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI,
  { //option for accessing dB
    poolSize: 50, //ONLY 50 PEOPLE can connect at a time
    wtimeout: 2500, //req will time out
    useNewUrlParse: true }
  )
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
   await RestaurantsDAO.injectDB(client)
   await ReviewsDAO.injectDB(client)
    app.listen(port, () => {  //how we are starting our web server after our dB is connected
      console.log(`listening on port ${port}`)
    })
  })