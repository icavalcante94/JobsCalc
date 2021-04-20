const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        const profile = await Profile.get()
        return res.render("profile", { profile: profile})
    },
    
    async update(req, res) {
        // req.body para pegar os dados
        const data = req.body
        //definir quantas semanas tem um ano: 52
        const weeksPerYear = 52
        //remover as semanas de férias do ano
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        
        //total de horas trabalhadas na semaana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"] 

        //total de horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        //qual será o valor da minha hora?
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        const profile = await Profile.get()

        await Profile.update({
            ...profile, //espalhando os dados
            ...req.body,
            "value-hour": valueHour
        })

        return res.redirect('/profile')
    }
}