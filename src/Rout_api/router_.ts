import express from "express"
import { Post_data_, Get_data_, Get_ID_data_, Put_data_ } from "../API_Meteorological_/Clou_data_"
import { Location_Post_, Location_get, Location_get_id } from "../API_Meteorological_/Location_data_"
import { User_data_register, User_Login_ } from "../API_Meteorological_/user_data_"
// import { User_data_register } from "../API_Meteorological_/user_data_"
import { So2_SaveApi } from "../API_Meteorological_/Gas_data_"
let rou = express.Router()

rou.post('/postdataclou', Post_data_)
rou.get('/getdataclou', Get_data_)
rou.get('/getdataclou/:id', Get_ID_data_)
rou.put("/putdataclou/:id", Put_data_)


rou.post('/locationpost', Location_Post_)
rou.get('/locationget', Location_get)
rou.get('/locationget/:id', Location_get_id)

rou.post('/register', User_data_register)
rou.post('/login', User_Login_)

rou.post('/so2save', So2_SaveApi)

// rou.post('/register', User_data_register)

export default rou