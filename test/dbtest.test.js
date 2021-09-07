const assert = require('assert')
const NamesGreeted = require('../namesGreeted')
const pg = require("pg")
const { it } = require('mocha')
const Pool = pg.Pool

let namesGreeted = NamesGreeted()


const pool = new Pool({
    connectionString:'postgres://rtbxhlnwqofahl:8668ab7cab6ff6c93c58d91436ff49703793425de56f82ae0d0f7eab8281505b@ec2-34-200-94-86.compute-1.amazonaws.com:5432/d6kjbq4ksnd9j4',
    ssl: {
      rejectUnauthorized: false
    }
})

describe('The greetings-webapp database', function () {

    beforeEach(async function(){
        // clean the tables before each test run
        pool.query("delete from users")
    })

    it('should be able to set names and get them from database', async () => {
        namesGreeted.setName("Mbali")
        assert.deepEqual("mbali", await namesGreeted.getName())
    });

    it('should be able to count the names greeted in the database', async () => {
        namesGreeted.setName("Lungile")
        namesGreeted.setName("Sabie")
        assert.equal(2, await namesGreeted.nameCount())
    });

    it('should be able to count how many times each user has been greeted', async () => {
        namesGreeted.setName("Simo")
        namesGreeted.setName("Simo")
        assert.equal(2, await namesGreeted.greetCount())
    });

    it('should test duplication in the database', async function () {
        namesGreeted.setName("Yonela")
        namesGreeted.setName("yoNela")
        console.log(namesGreeted.getName())
        assert.equal(1, await namesGreeted.nameCount())
    });

    it('should be able to reset the database', async function(){
        namesGreeted.setName("Mbali")
        namesGreeted.removeNames()
        assert.equal(0, await namesGreeted.nameCount())
    });

    after(function () {
        pool.end();
    })
});