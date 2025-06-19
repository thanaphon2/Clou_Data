import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../Dataconnext/app-data-source";
import { AirQualityStation, PM10, PM25, Location } from "../tableconnext/meteorological_data";
import { Pm10, Pm25, Pm25_save, Pm10_save, Pm_save_10_25 } from "../Orm_All/Pm_";

export const AirQualityStation_save_Data_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const airpm_data = await myDataSource.getRepository(AirQualityStation)
        const airpm10_data = await myDataSource.getRepository(PM10)
        const airpm25_data = await myDataSource.getRepository(PM25)
        console.log("data: ", req.body)
        const {year, month, day, hours, createdAt, area, nameTH, nameEN, stationType, lat, long, location_id, pm25, pm10} = req.body
        const data = {year, month, day, hours, createdAt, area, nameTH, nameEN, stationType, lat, long, location_id}
        const data_pm25 = {pm25}
        const data_pm10 = {pm10}
        const airpm_check_date = await airpm_data.findOne({ 
            where: 
            {
                year: Number(req.body.year), 
                month: Number(req.body.month), 
                day: Number(req.body.day), 
                hours: Number(req.body.hours),
                location_id: { id: Number(req.body.location_id)}
            }
        })
        console.log("ffffddda",airpm_check_date)
        if(airpm_check_date){
            // const ppp = await airpm25_data.findOne({ where: { air_id: {id: airpm_check_date.id}}})
            const pm25_checkidair = await Pm25(airpm25_data, airpm_check_date.id)
            const pm10_checkidair = await Pm10(airpm10_data, airpm_check_date.id)
            if(!pm25_checkidair){
                const data_pm25_save = await Pm25_save(airpm25_data, airpm_check_date.id, data_pm25)
                res.json({DATA: "ข้อมูลมีอยู่แล้ว..👌ทำการบันทึกแค่:", data_pm25_save}) 
            }if(!pm10_checkidair){
                console.log(pm10_checkidair)
                console.log(pm25_checkidair)
                const data_pm25_save = await Pm10_save(airpm10_data, airpm_check_date.id, data_pm10) 
                res.json({ DATA: "ข้อมูลมีอยู่แล้ว..👌ทำการบันทึกแค่:", data_pm25_save})
            }else{
                res.status(401).json({DATA: "มีข้อมูลซ้ำแล้วในวันเดือนหรือปีนี้ 😿",airpm_check_date})
            }
        }else{
            const air_save = await airpm_data.save(data)
            const Pm_air_save = await Pm_save_10_25(airpm25_data, airpm10_data, air_save.id, data_pm25, data_pm10)
            res.json({ DATA: "ข้อมูลถูกบันทึกแล้ว...", Pm_air_save})
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาด: ",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
    }
}


export const Air4_Pm25_Showdata_All = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const airpm_data = await myDataSource.getRepository(AirQualityStation)
        const airpm_data_show = await airpm_data.find({ relations: ['pm10_id', 'pm25_id']})
        res.json(airpm_data_show)
    }catch(err){
        console.error("เกิดข้อผิดพลาด: ",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
    }
}

export const Pm25_Now = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const airRepo = myDataSource.getRepository(AirQualityStation);

    const subQuery = airRepo
      .createQueryBuilder("sub_air")
      .select("MAX(sub_air.createdAt)", "maxCreatedAt")
      .addSelect("sub_air.location_id", "location_id")
      .groupBy("sub_air.location_id");

    const latestAirData = await airRepo
      .createQueryBuilder("air")
      .innerJoin(
        "(" + subQuery.getQuery() + ")",
        "latest",
        "air.location_id = latest.location_id AND air.createdAt = latest.maxCreatedAt"
      )
      .leftJoinAndSelect("air.location_id", "location")
      .leftJoinAndSelect("air.pm25_id", "pm25")
      .leftJoinAndSelect("air.pm10_id", "pm10")
      .orderBy("air.createdAt", "DESC")
      .getMany();

    res.json(latestAirData);
  } catch (err) {
    console.error("❌ Error fetching latest air data:", err);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดไม่สามารถเข้าถึงข้อมูลล่าสุดของอากาศได้",
      detail: err,
    });
  }
};

export const Show_datalocation = async ( req: Request, res: Response, next: NextFunction) => {
  try{
    console.log("fffsfsfs", req.params)
    const arimydatasource = await myDataSource.getRepository(AirQualityStation)
    const locatiom_showdatapm = await arimydatasource.find({where: {year: Number(req.params.yaer), month: Number(req.params.month), location_id: {id: Number(req.params.id)}}, relations: ['pm25_id', 'location_id']})
    res.json(locatiom_showdatapm)
  }catch(err){
    console.error("เกิดข้อผิดพลาด: ",err)
    next(err)
    res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑 ", err})
  }
}