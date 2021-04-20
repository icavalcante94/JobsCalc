const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res) {
       return res.render(`job`)
    },

    async save(req, res) {
        // const jobs = await Job.get()
        // { name: 'Hunter Osborn', 'daily-hours': '29', 'total-hours': '37' }
        // const last_id = jobs[jobs.length -1]?.id || 0
    
        await Job.create({
            // id: last_id + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() //atribuindo data de hoje
        })
        // return res.redirect('/')
        return res.redirect('/');
    },

    async show(req, res){

        const jobId = req.params.id
        const jobs = await Job.get()
        const profile = await Profile.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found')
        }

        job.budget = JobUtils.calculateBudget(job,  profile["value-hour"])

        return res.render(`job-edit`, { job })
    },

    async update(req, res){
        const jobId = req.params.id
        // const jobs = await Job.get()

        // const job = jobs.find(job => Number(job.id) === Number(jobId))

        // if (!job) {
        //     return res.send('Job not found')
        // }

        const updateJob = {
            // ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        // const newJobs = jobs.map(job => {
        //     if(Number(job.id) === Number(jobId)) {
        //         job = updateJob
        //     }

        //     return job
        // })

        await Job.update(updateJob, jobId)

        res.redirect(`/job/${jobId}`)
    },
    async delete(req, res){
        const jobId = req.params.id
        
        await Job.delete(jobId)

        // Job.data = jobs.filter(job => Number(job.id) !== Number(jobId))

        return res.redirect('/')
    } 
}