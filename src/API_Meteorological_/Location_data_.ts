import { Request, Response, NextFunction } from "express";
import { myDataSource } from "../Dataconnext/app-data-source"
import { Location } from "../tableconnext/meteorological_data"

export const Location_Post_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const Location_ = await myDataSource.getRepository(Location)
        const location_create = await Location_.create(req.body)
        const location_save = await Location_.save(location_create)
        res.status(200).json({ Data: "ข้อมูลบันทึกแล้ว❤️"})
    }catch(err){
        console.error(err)
        next(err)
        res.json( { Error: "เกิดข้อผิดพลาดไม่สามารบันทึกได้ 😑"})
    }
}

export const Location_get = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const Location_ = await myDataSource.getRepository(Location)
        const Location_find = await Location_.find({ relations: ['meteorological_id']})
        res.json(Location_find)
    }catch(err){
        console.error(err)
        next(err)
        res.json( { Error: "เกิดข้อผิดพลาดไม่สามารโชวข้อมูลได้ 😑"})
    }
}

export const Location_get_id = async (req: Request,  res: Response, next: NextFunction) => {
    try{
        const Location_ = await myDataSource.getRepository(Location)
        const location_findOnde = await Location_.findOne({ where: { id: Number(req.params.id)}, relations: ['meteorological_id']})
        if(!location_findOnde){
            res.status(402).json({ Error: "ไม่มีข้อมุลที่ส่งมา...😒"})
        }else{
            res.json(location_findOnde)
        }
    }catch(err){
        console.error(err)
        next(err)
        res.json( { Error: "เกิดข้อผิดพลาดไม่สามารบันทึกได้ 😑"})
    }
}