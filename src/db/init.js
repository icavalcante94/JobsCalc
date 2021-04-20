const Database = require('./config')

// usar async / await

const initDb = {
    async init(){
        const db = await Database()

        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT, 
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`)

        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)
        /*  monthly_budget: 3000
            days_per_week(dias de trabalho na semana): 5
            hours_per_day(horas de trabalho por dia): 5
            vacation_per_year(semanas de férias por ano): 4
            value_hour(valor hora): 70 */
        await db.run(`INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            days_per_week, 
            hours_per_day,
            vacation_per_year,
            value_hour
        ) VALUES (
            "Iago",
            "https://avatars.githubusercontent.com/u/54562840?v=4",
            3000,
            5,
            5,
            4,
            70
        );`)

        /*  daily_hours(horas por dia no projeto): 2
            total_hours(total horas no projeto): 1
            created_at(data de inicio em segundos): 1617514376018 */

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        );`)

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Projects",
            3,
            47,
            1617514376018
        );`)

        await db.close()
    }
}

initDb.init()