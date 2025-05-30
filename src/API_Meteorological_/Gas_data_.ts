import { Request, Response, NextFunction, json} from "express";
import { myDataSource } from "../Dataconnext/app-data-source";
import { Location,Ges, So2, Choho, No2 } from "../tableconnext/meteorological_data";
import { ges_no2, ges_choho, ges_so2 } from "../Orm_All/Gas_";

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
        const { year, month, day, hours, location_id, so2 }: any = req.body
        const data = { year, month, day, hours, location_id}
         const ges_cheke_date = await ges_data.findOne({
            where: { 
                year: Number(req.body.year), 
                month: Number(req.body.month), 
                day: Number(req.body.day), 
                hours: Number(req.body.hours),
                location_id: {id: Number(req.body.location_id)}
            }
        })
        if(ges_cheke_date){
            const so2_fine1 = await so2_data.findOne({ 
                where: {
                    ges_id: {id: Number(ges_cheke_date.id)}
                }
            })
            if(so2_fine1){
                res.status(405).json({ Error: "มีข้อมูลซ้ากันของปีเดือนวันและชั่วโมงนั้น..", Howtofix: "กรุณนาเข้าไปยังapiแก้ไขเพื่อแก้ไขข้อมูล.."})
            }else{
                const data1 = { so2 }
                const so2_save = await ges_so2(data1, ges_cheke_date, so2_data)
                res.json({DATA: "ข้อมูลมีอยู่แล้ว..👌ทำการบันทึกแค่: ", so2_save})
            }
        }else{
            const ges_save = await ges_data.save(data)
            const data1 = { so2 }
            const so2_save = await ges_so2(data1, ges_save, so2_data)
            res.json({DATA: "บันทึกเรียบร้อยแล้ว..❤️",ges_save, so2_save})
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})

    }
}

export const Choho_SaveApi = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const choho_orm = await myDataSource.getRepository(Choho)
        const ges_data = await myDataSource.getRepository(Ges)
        const { year, month, day, hours, choho }: any = req.body
        const data = { year, month, day, hours}
        const ges_cheke_date = await ges_data.findOne({
            where: { 
                year: Number(req.body.year), 
                month: Number(req.body.month), 
                day: Number(req.body.day), 
                hours: Number(req.body.hours)
            }
        })
        if(ges_cheke_date){
            const choho_fine1 = await choho_orm.findOne({ 
                where: {
                    ges_id: {id: Number(ges_cheke_date.id)}
                }
            })
            if(choho_fine1){
                res.status(405).json({ Error: "มีข้อมูลซ้ากันของปีเดือนวันและชั่วโมงนั้น..", Howtofix: "กรุณนาเข้าไปยังapiแก้ไขเพื่อแก้ไขข้อมูล.."})
            }else{
                const data1 = { choho }
                const choho_save = await ges_choho(data1, ges_cheke_date, choho_orm)
                res.json({ Data: "ข้อมูลมีอยู่แล้ว..👌ทำการบันทึกแค่: ", choho_save})
            }
        }else{
        const ges_save = await ges_data.save(data)
        const data1 = { choho }
        const choho_save = await ges_choho(data1, ges_save, choho_orm)
        // const choho_save = await choho_orm.save(data_choho)
        res.json({DATA: "บันทึกเรียบร้อยแล้ว..❤️",ges_save, choho_save})
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})
    }
}

export const No2_SaveApi = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const no2_orm = await myDataSource.getRepository(No2)
        const ges_data = await myDataSource.getRepository(Ges)
        const { year, month, day, hours, no2 }: any = req.body
        const ges_cheke_date = await ges_data.findOne({
            where: { 
                year: Number(req.body.year), 
                month: Number(req.body.month), 
                day: Number(req.body.day), 
                hours: Number(req.body.hours),
                location_id: {id: Number(req.body.location_id)}
            }
        })
        if(ges_cheke_date){
            const no2_fine1 = await no2_orm.findOne({
                where: {
                ges_id: { id: Number(ges_cheke_date.id) }
                }
            });
            if(no2_fine1){
                res.status(405).json({ Error: "มีข้อมูลซ้ากันของปีเดือนวันและชั่วโมงนั้น..", Howtofix: "กรุณนาเข้าไปยังapiแก้ไขเพื่อแก้ไขข้อมูล.."})
            }else{
                console.log(ges_cheke_date)
                const _no2 = { no2 }
                const data1 = await ges_no2(_no2, ges_cheke_date, no2_orm)
                res.json({ Data: "ข้อมูลมีอยู่แล้ว..👌ทำการบันทึกแค่: ",data1})
            }
        }else{
            const data = { year, month, day, hours}
            const ges_save = await ges_data.save(data)
            const _no2 = { no2 }
           const data1 = await ges_no2( _no2, ges_save, no2_orm)
            res.json({ Data: "บันทึกเรียบร้อยแล้ว..❤️", ges_save, data1})
        }
    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})
    }
}


export const Separate_yearmoth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const months = await myDataSource.getRepository(Ges)
        .createQueryBuilder("ges")
        .select(["ges.year", "ges.month"])
        .groupBy("ges.year")
        .addGroupBy("ges.month")
        .orderBy("ges.year", "DESC")
        .addOrderBy("ges.month", "DESC")
        .getRawMany();

        res.json(months);

    }catch(err){
        console.error("เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑",err)
        next(err)
        res.status(500).json({ Error: "เกิดข้อผิดพลาดไม่สามารเข้าถึงได้ 😑", err})
    }
}

export const Show_data_so2 = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const locationRepo = myDataSource.getRepository(Location);

        const data = await locationRepo.createQueryBuilder('location')
            .leftJoinAndSelect('location.ges_id', 'ges')
            .leftJoinAndSelect('ges.so2_id', 'so2')
            .where('ges.year = :year', { year: Number(req.params.year) })
            .andWhere('ges.month = :month', { month: Number(req.params.month) })
            .andWhere('so2.id IS NOT NULL')
            .getMany();

        if (data.length === 0) {
            res.status(404).json({ message: "ไม่มีข้อมูลที่เชื่อมกับ so2_id" });
        }

        res.json(data);

    } catch (err) {
        console.error("เกิดข้อผิดพลาดไม่สามารถแสดงข้อมูลได้", err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดไม่สามารถแสดงข้อมูลได้", error: err });
    }
}


