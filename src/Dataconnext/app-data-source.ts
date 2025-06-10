import { DataSource } from "typeorm"
import { MeteoroLogical,Location, Ges, User, So2, Choho, No2} from "../tableconnext/meteorological_data"

// export const myDataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "Dream480201?",
//     database: "m",
//     entities: [MeteoroLogical, Location, Ges, User, So2, Choho, No2],
//     logging: true,
//     synchronize: true,
// })

export const myDataSource = new DataSource({
    type: "mysql",
    host: "db",
    port: 3306,
    username: "user",
    password: "Dream48020?",
    database: "mydb",
    entities: [MeteoroLogical, Location, Ges, User, So2, Choho, No2],
    logging: true,
    synchronize: true,
})