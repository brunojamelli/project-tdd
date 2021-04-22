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
    // Novos Métodos 

    getPriorityProject: (projectRepo, taskRepo, projectId) => {
        let taskDuration = 0;
        let task = {};
        return projectRepo.getIncompletedTasks(projectId)
            .then((data) => {
                data.forEach(row => {
                    if (row.duration > taskDuration) {
                        taskDuration = row.duration;
                        task = row;
                    }
                });

                return taskDuration > 0 ? task.id : 0;
            })
    },

    desative: (projectRepo, taskRepo, projectId) => {
        let total = 0;
        return projectRepo.getIncompletedTasks(projectId)
            .then((data) => {
                data.forEach(row => {
                    total += 1;
                });

                return total > 0 ? "Not Possible" : "disabled";
            })
    },

    getPriority: (projectRepo, projectId) => {
        let remaningTime = 0
        let perInc = 0
        let totalCompleted = 0
        let totalIncompleted = 0
        return projectRepo.getCompletedTasks(projectId)
            .then((data) => {
                totalCompleted = data.length
            })
            .then(() => {
                return projectRepo.getIncompletedTasks(projectId)
            })
            .then((data) => {
                totalIncompleted = data.length
                perInc = parseFloat((totalCompleted * 100 / (totalCompleted + totalIncompleted)).toFixed(2))
                data.forEach(row => {
                    remaningTime += row.duration > 240 ? row.duration * 2 : row.duration
                });
                return parseFloat((((perInc * 2) + (remaningTime * 4)) / 6).toFixed(2));
            })
    }
}