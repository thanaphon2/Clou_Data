import express,{Request, Response, NextFunction} from 'express'
import { myDataSource } from "../Dataconnext/app-data-source"
import { MeteoroLogical } from "../tableconnext/meteorological_data"

export const Post_data_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log(req.body)
        const mydata_Clou_ = await myDataSource.getRepository(MeteoroLogical)
        const data_create = await mydata_Clou_.create(req.body)
        const data_save = await mydata_Clou_.save(data_create)

        data_save && res.send('บันทึกเรียบร้อยแล้ว ^_^')
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const Get_data_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const mydata_Clou_ = await myDataSource.getRepository(MeteoroLogical)
        const find_data = await mydata_Clou_.find()
        res.send(find_data)
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const Get_ID_data_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const mydata_Clou_ = await myDataSource.getRepository(MeteoroLogical)
        const find_id_data = await mydata_Clou_.find({ where: { id: Number(req.body.params)}})
        if(!find_id_data) {
            res.status(401).json({ Error: "เกิดข้อผิดพลาดไม่มีข้อมูลหรือไอดีไม่ถูกต้อง U_U"})
        }else{
            find_id_data && res.send(find_id_data)
        }
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}

export const Put_data_ = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const mydata_Clou_ = await myDataSource.getRepository(MeteoroLogical)
        const find_id_data = await mydata_Clou_.findOne({ where: { id: Number(req.body.params)}})
        if(!find_id_data){
            res.status(401).json({ Error: "เกิดข้อผิดพลาดไม่มีข้อมูลหรือไอดีไม่ถูกต้อง U_U"})
        }else{
            await mydata_Clou_.merge(find_id_data, req.body)
            const save_data = await mydata_Clou_.save(find_id_data)
            find_id_data && res.send("แก้ไขเรียบร้อยแล้ว :)")
        }
        
    }catch(err){
        console.log("เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้ :(",err)
        res.status(501).json({Error: "เกิดข้อผิพลาดไม่สามารถเชื่อมต่อได้😒😒", err})
        next(err)
    }
}