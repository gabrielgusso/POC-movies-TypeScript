import express from "express"
import { Request, Response } from "express"

const app = express()

app.get('/health', (req: Request, res: Response) => { 
    res.send("OK!")
})

app.listen(4000, () => {
    console.log(`Server is running in port 4000`)
})