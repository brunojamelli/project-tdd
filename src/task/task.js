const projectRepository = require("../project/project_repository");
const project = require("../project/project");
module.exports = {
    createTask: (projectRepo, taskRepo, name, description, duration, isComplete, projectId) => {
        // return projectRepo.getIncompletedTasks(projectId)
        //     .then((data) => {
        //         if (data.length > 5) {
        //             return "Refused"
        //         }
        //         else {
        //             // Adicionar a task ao BD
        //             return "Confirmed"
        //         }
        //     })
        return project.remainingTime(projectRepo, taskRepo, projectId)
            .then((data) => {
                if (data > 800) {
                    return "Refused"
                } else {
                    return "Accepted"
                }
            })
    }
}