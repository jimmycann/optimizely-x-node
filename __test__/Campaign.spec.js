require('../.config/.env')

const assert = require('chai').assert
const expect = require('chai').expect
const Optx = require('../lib/optx.js')({
  token: process.env.OPTIMIZELY_X_TOKEN
})
const ProjectFixture = require('./fixture/ProjectFixture')
const CampaignFixture = require('./fixture/CampaignFixture')
let createdProject, createdCampaign

describe('Optx.Campaign', () => {
  before(done => {
    Optx.Project.create(ProjectFixture.new())
      .then(res => ProjectFixture.validate(res.body))
      .then(result => {
        createdProject = result
        done()
      })
      .catch(done)
  })
  after(done => {
    Optx.Project.update(createdProject.id, ProjectFixture.new({ status: 'archived' }))
      .then(result => done())
      .catch(done)
  })

  describe('.create()', () => {
    it('should create a new campaign', (done) => {
      Optx.Campaign.create(CampaignFixture.new({ project_id: createdProject.id }))
        .then(res => {
          console.info(res)
          expect(res.statusCode).to.equal(201)
          return CampaignFixture.validate(res.body)
        })
        .then(result => {
          createdCampaign = result
          assert.isOk(result, 'returned a validated result')
          done()
        })
        .catch(done)
    })
  })

  describe('.list()', () => {
    it('should retrieve a list of campaigns', (done) => {
      Optx.Campaign.list({ project_id: createdProject.id })
        .then(res => {
          expect(res.statusCode).to.equal(200)
          return CampaignFixture.validateBulk(res.body)
        })
        .then(result => {
          assert.isOk(result, 'returned a validated result')
          done()
        })
        .catch(done)
    })
  })

  describe('.read()', () => {
    it('should retrieve a single campaign', (done) => {
      Optx.Campaign.read(createdCampaign.id)
        .then(res => {
          expect(res.statusCode).to.equal(200)
          return CampaignFixture.validate(res.body)
        })
        .then(result => {
          assert.isOk(result, 'returned a validated result')
          done()
        })
        .catch(done)
    })
  })

  describe('.results()', () => {
    it('should retrieve a single campaigns\' results', (done) => {
      Optx.Campaign.results(createdCampaign.id)
        .then(res => {
          expect(res.statusCode).to.equal(200)
          return CampaignFixture.validate(res.body)
        })
        .then(result => {
          assert.isOk(result, 'returned a validated result')
          done()
        })
        .catch(done)
    })
  })

  describe('.update()', () => {
    it('should update a campaign', (done) => {
      Optx.Campaign.update(createdCampaign.id, CampaignFixture.new({ project_id: createdProject.id }))
        .then(res => {
          expect(res.statusCode).to.equal(200)
          return CampaignFixture.validate(res.body)
        })
        .then(result => {
          assert.isOk(result, 'returned a validated result')
          done()
        })
        .catch(done)
    })
  })

  describe('.del()', () => {
    it('should delete a single campaign', (done) => {
      Optx.Campaign.del(createdCampaign.id)
        .then(res => {
          expect(res.statusCode).to.equal(204)
          done()
        })
        .catch(done)
    })
  })
})
