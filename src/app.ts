import express from "express"
import { movieRouter } from "./routers/movies.routers.js"
import { platformRouter } from "./routers/platform.routers.js"
import { genreRouter } from "./routers/genre.routers.js"

const app = express()
app.use(express.json()).use(movieRouter).use(platformRouter).use(genreRouter)

app.listen(4000, () => {
  console.log(`Server is running in port 4000`)
})
