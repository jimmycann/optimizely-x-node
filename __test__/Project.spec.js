require('../.config/.env')

const assert = require('chai').assert
const expect = require('chai').expect
const Optx = require('../lib/optx.js')({
  token: process.env.OPTIMIZELY_X_TOKEN
})
const ProjectFixture = require('./fixture/ProjectFixture')
let createdProject

describe('Optx.Project', () => {
  describe('.create()', () => {
    it('should create a new project', (done) => {
      Optx.Project.create(ProjectFixture.new())
        .then(res => {
          expect(res.statusCode).to.equal(201)
          return ProjectFixture.validate(res.body)
        })
        .then(result => {
          createdProject = result
          assert.isOk(result, 'returned a validated result')
          done()
        })
        .catch(done)
    })
  })

  describe('.list()', () => {
    it('should retrieve a list of projects', (done) => {
      Optx.Project.list()
        .then(res => {
          expect(res.statusCode).to.equal(200)
          return ProjectFixture.validateBulk(res.body)
        })
        .then(result => {
          assert.isOk(result, 'returned a validated result')
          done()
        })
        .catch(done)
    })
  })

  describe('.read()', () => {
    it('should retrieve a single project', (done) => {
      Optx.Project.read(createdProject.id)
        .then(res => {
          expect(res.statusCode).to.equal(200)
          return ProjectFixture.validate(res.body)
        })
        .then(result => {
          assert.isOk(result, 'returned a validated result')
          done()
        })
        .catch(done)
    })
  })

  describe('.update()', () => {
    it('should update a project', (done) => {
      Optx.Project.update(createdProject.id, ProjectFixture.new({ status: 'archived' }))
        .then(res => {
          expect(res.statusCode).to.equal(200)
          return ProjectFixture.validate(res.body)
        })
        .then(result => {
          assert.isOk(result, 'returned a validated result')
          done()
        })
        .catch(done)
    })
  })
})
