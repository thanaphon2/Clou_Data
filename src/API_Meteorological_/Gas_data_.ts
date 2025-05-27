import { Request, Response, NextFunction, json} from "express";
import { myDataSource } from "../Dataconnext/app-data-source";
import { Ges } from "../tableconnext/meteorological_data";
import { So2 } from "../tableconnext/meteorological_data";
import { Choho } from "../tableconnext/meteorological_data";
import { No2 } from "../tableconnext/meteorological_data";

export const Ges_data_post_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const ges_data = await myDataSource.getRepository(Ges)
        const ges_create = await ges_data.create(req.body)
        if(!ges_create){
            res.status(401).json({ Error: "ไม่สามารถบัทึกได้ 😑",ges_create})
        }else{
            const ges_save = await ges_data.save(ges_create)
            res.json({ Data: "บันทีกเรียบร้อยแล้วครับ❤️"})
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})
    }
}

export const Ges_data_get_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const ges_data = await myDataSource.getRepository(Ges)
        const ges_find = await ges_data.find()
        if(!ges_find){
            res.status(401).json({ Error: "ไม่สามารถบัทึกได้ 😑",ges_find})
        }else{
            res.json(ges_find)
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})
    }
}

export const So2_SaveApi = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const so2_data = await myDataSource.getRepository(So2)
        const ges_data = await myDataSource.getRepository(Ges)
        const { year, month, day, hours, so2 }: any = req.body
        const data = { year, month, day, hours}
        const data1 = { so2 }
        const ges_save = await ges_data.save(data)
        const _so2 = data1.so2[0]
        const data_so2: {
            so2_name: string;
            so2: number;
            aod: number;
            o3: number;
            flag: number;
            ges_id: any;
            } = {
            so2_name: _so2.so2_name,
            so2: _so2.so2,
            aod: _so2.aod,
            o3: _so2.o3,
            flag: _so2.flag,
            ges_id: ges_save.id!,
        };

        const so2_save = await so2_data.save(data_so2)
        res.json({DATA: "บันทึกเรียบร้อยแล้ว..❤️",ges_save, so2_save})
    }catch(err){
         console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})

    }
}