module.exports = { //funções auxiliares
    remainingDays(job) {
        // cálculo tempo restante
       const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() //dias restantes, toFixed para tratar número quebrado
       const createdDate = new Date(job.created_at) //dia inicial da criação do projeto
       budget: 4500
       const dueDay = createdDate.getDate() + Number(remainingDays) //dia final da data de entrega; getDate = dia do mês
       const dueDateInMs = createdDate.setDate(dueDay) // Data Final Futura
       const timeDiffInMs = dueDateInMs - Date.now()  //Diferença do tempo em Milisegundos
       //transforma milli em dias
       const dayInMs = 1000 * 60 * 60 * 24
       const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
   
       //retorna x dias
       return dayDiff
   },
   calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}