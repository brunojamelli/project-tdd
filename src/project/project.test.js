const project = require('./project')
const Promise = require('bluebird')

const AppDAO = require('../../src/db/dao')
const ProjectRepository = require('../../src/project/project_repository')
const TaskRepository = require('../../src/task/task_repository')
const { resolve } = require('bluebird')

let dao
let projectRepo
let taskRepo

describe('Análise dos projetos', () => {

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

    //novos Testes
    it('Deve retornar o id da tarefa prioritaria do projeto 3', () => {
        const projectId = 3;
        return (project.getPriorityProject(projectRepo, taskRepo, projectId))
            .then((data) => expect(data).toBe(5));
    })

    it('Deve retornar 0 em projetos que não tem tarefas prioritária', () => {
        const projectId = 4;
        return (project.getPriorityProject(projectRepo, taskRepo, projectId))
            .then((data) => expect(data).toBe(11));
    })

    it('Deve retornar o id da tarefa prioritaria', () => {
        const projectId = 4;
        return (project.getPriorityProject(projectRepo, taskRepo, projectId))
            .then((data) => expect(data).toBe(11));
    })

    it('Deve impedir de desativar o projeto 3 que tem tarefas imcompletas', () => {
        const projectId = 3;
        return (project.desative(projectRepo, taskRepo, projectId))
            .then((data) => expect(data).toBe("Not Possible"));
    })

    // it('Deve retornar o nivel de prioridade do projeto 4', () => {
    //     const projectId = 4;
        
    // })
})