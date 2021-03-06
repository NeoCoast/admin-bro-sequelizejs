const Sequelize = require('sequelize')

const Database = require('../src/database')
const Resource = require('../src/resource')
const db = require('../models/index.js')
const config = require('../config/config')

describe('Database', function () {
  before(function () {
    this.sequelize = new Sequelize(config[process.env.NODE_ENV])
    this.sequelize.define('User', {
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: Sequelize.STRING,
    }, {})
  })

  describe('.isAdapterFor', function () {
    it('returns true when user gives entire db object generated by cli', function () {
      expect(Database.isAdapterFor(db)).to.equal(true)
    })

    it('returns true when user gives sequelize', function () {
      expect(Database.isAdapterFor(this.sequelize)).to.equal(true)
    })
  })

  describe('#resources', function () {
    it('fetches all resources when entire db is given', function () {
      const database = new Database(db)
      expect(database.resources()).to.have.lengthOf(2)
      expect(database.resources()[0]).to.be.an.instanceof(Resource)
    })

    it('fetches all resources when user gives sequelize', function () {
      const database = new Database(this.sequelize)
      expect(database.resources()).to.have.lengthOf(1)
      expect(database.resources()[0]).to.be.an.instanceof(Resource)
    })
  })
})
