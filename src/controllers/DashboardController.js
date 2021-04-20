const Job = require ('../model/Job')
const JobUtils = require ('../utils/JobUtils')
const Profile = require ('../model/Profile')


module.exports = {
    async index (req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()
        
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // inicialização total de horas em progresso
        let jobTotalHours = 0

        const updateJobs = jobs.map((job) => {
            // ajuste no job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress' //done: venceu; progress: progredindo 

            // Somando a quantidade de status tanto para done quanto para em progress
            statusCount[status] += 1

            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
            // if(status == 'progress'){
            //     jobTotalHours += Number(job['daily-hours'])
            // }
        
            return {
                ...job, // espalha o conteúdo de job para não ter q repetir
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        // usar somente as horas que estão em progresso para o cálculo
        const freeHours = profile["hours-per-day"] - jobTotalHours;
        
        return res.render(`index`, { jobs: updateJobs, profile, statusCount, freeHours }) // ex: profile = profile: profile
    }
}
