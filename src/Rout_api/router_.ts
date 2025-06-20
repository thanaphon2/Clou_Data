import express from "express"
import { Post_data_, Get_data_, Get_ID_data_, Put_data_, data_Day_location_, data_Day_, data_Month_, data_Year_, LocationChekeTolocation_ } from "../API_Meteorological_/Clou_data_"
import { Location_Post_, Location_get, Location_get_id } from "../API_Meteorological_/Location_data_"
import { User_data_register, User_Login_ } from "../API_Meteorological_/user_data_"
// import { User_data_register } from "../API_Meteorological_/user_data_"
import { So2_SaveApi, Choho_SaveApi, No2_SaveApi, Separate_yearmoth, Show_data_so2, So2_Year, So2_Day, so2_ShowData } from "../API_Meteorological_/Gas_data_"
import { AirQualityStation_save_Data_, Air4_Pm25_Showdata_All, Pm25_Now, Show_datalocation, AirPM_ShowMonth, AirPM_ShowYear, AirPm_showdata_Location} from "../API_Meteorological_/Air4_Pm25_"
let rou = express.Router()

rou.post('/postdataclou', Post_data_)
rou.get('/getdataclou', Get_data_)
rou.get('/getdataclou/:id', Get_ID_data_)
rou.put("/putdataclou/:id", Put_data_)
rou.get('/climate/:year/:month', data_Month_)
rou.get('/climate/:year/:month/:day', data_Year_)
rou.get('/climate/:year', data_Year_)
rou.get('/climatedata', LocationChekeTolocation_)

rou.post('/locationpost', Location_Post_)
rou.get('/locationget', Location_get)
rou.get('/locationget/:id', Location_get_id)

rou.post('/register', User_data_register)
rou.post('/login', User_Login_)

rou.post('/so2save', So2_SaveApi)
rou.get('/Separate', Separate_yearmoth)
rou.get('/gesso2/:year/:month/:location_id', Show_data_so2)
rou.get('/gesso2/:year/:month/:day/:location_id', So2_Day)
rou.get('/gesso2/:year/:location_id', So2_Year)
rou.get('/gesso2/:name_location',so2_ShowData)

rou.post('/chohosave', Choho_SaveApi)

rou.post('/no3save', No2_SaveApi)

// rou.post('/register', User_data_register)

rou.post('/Pm25_apipostair4', AirQualityStation_save_Data_)
rou.get('/airPmshowdata', Air4_Pm25_Showdata_All)
rou.get('/pmshownow', Pm25_Now)
rou.get('/airpm/:year/:month/:day/:id', Show_datalocation)
rou.get('/airpm/:year/:month',  AirPM_ShowMonth)
rou.get('/airpm/:year', AirPM_ShowYear)
rou.get('/airlcation', AirPm_showdata_Location)

export default rou