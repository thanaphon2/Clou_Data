import { DataSource } from "typeorm"
import { MeteoroLogical } from "../tableconnext/meteorological_data"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Dream480201?",
    database: "M",
    entities: [MeteoroLogical],
    logging: true,
    synchronize: true,
})