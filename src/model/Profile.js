// Pasta Model é responsável por fornecer dados
const Database = require('../db/config')

// let data = {
//     name: "Iago",
//     avatar: "https://avatars.githubusercontent.com/u/54562840?v=4",
//     "monthly-budget": 3000, // quanto quer ganhar por mês
//     "days-per-week": 5, // horas por dia
//     "hours-per-day": 5, // horas por dia
//     "vacation-per-year": 4, // quantas semanas de férias por ano
//     "value-hour": 75
// }   

module.exports = {
    async get(){

        const db = await Database()

        const data = await db.get(`SELECT * FROM profile`)

        await db.close(``)

        
        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.vacation_per_year,
            "value-hour": data.value_hour
        }
    },
    update(newData){
        data = newData
    }
}