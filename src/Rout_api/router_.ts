import express from "express"
import { Post_data_, Get_data_, Get_ID_data_, Put_data_ } from "../API_Meteorological_/Clou_data_"
let rou = express.Router()

rou.post('/postdataclou', Post_data_)
rou.get('/getdataclou', Get_data_)
rou.get('/getdataclou/:id', Get_ID_data_)
rou.put("/putdataclou/:id", Put_data_)

export default rou