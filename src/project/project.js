const { resolve } = require("bluebird");

module.exports = {
    completedTasks: (projectRepo, taskRepo, projectId) => {
        let completed
        let incompleted
        return projectRepo.getCompletedTasks(projectId)
            .then((data) => {
                completed = data.length
            })
            .then(() => {
                return projectRepo.getIncompletedTasks(projectId)
            })
            .then((data) => {
                incompleted = data.length
                return parseFloat((completed * 100 / (completed + incompleted)).toFixed(1))
            })
    },
    remainingTime: (projectRepo, taskRepo, projectId) => {
        return projectRepo.getRemainingTime(projectId)
            .then((data) => {
                let total = 0
                data.forEach(row => {
                    total += row.duration > 240 ? row.duration * 2 : row.duration
                });
                return total
            })
    },
    /*Novos Métodos */
    projectPriority: (projectRepo, taskRepo, projectId) => {
        let proW = completedTasks(projectRepo, taskRepo, projectId) * 2;
        let remW = remainingTime(projectRepo, taskRepo, projectId) * 4;
        return (proW + remW) / 6;
    },

    getPriorityProject: (projectRepo, taskRepo, projectId) => {
        let taskDuration = 0;
        let task = {};
        return projectRepo.getIncompletedTasks(projectId)
            .then((data)=>{
               data.forEach(row => {
                   if(row.duration > taskDuration ){
                       taskDuration = row.duration;
                       task = row;
                   }
               }); 
               return task.id;
            })
            
    },
}