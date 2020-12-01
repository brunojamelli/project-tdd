const task = require('./task')
const Promise = require('bluebird')

const AppDAO = require('../../src/db/dao')
const ProjectRepository = require('../../src/project/project_repository')
const TaskRepository = require('../../src/task/task_repository')
const { resolve } = require('bluebird')

let dao
let projectRepo
let taskRepo

describe('Análise das tarefas', () => {

    beforeAll(() => {
        return new Promise((resolve, reject) => {
            dao = new AppDAO('../../database.db');
            resolve()
        }).then(() => {
            projectRepo = new ProjectRepository(dao);
            taskRepo = new TaskRepository(dao);
            resolve()
        }).then(() => {
            resolve()
        })
    })

    //Novos Testes
    it ('Deve impedir de adicionar tarefas a projetos que restem mais que 800 minutos', () =>{
        const name = "Tarefa Nova"
        const description = "Tarefa a ser adicionada"
        const duration = 120
        const isComplete = 0
        const projectId = 3
        return (task.createTask(projectRepo, taskRepo, name, description, duration, isComplete, projectId))
            .then((data) => expect(data).toBe('Refused'));
    })

})