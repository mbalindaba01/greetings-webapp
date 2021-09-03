const assert = require('assert')
const NamesGreeted = require('../namesGreeted')
const pg = require("pg")
const Pool = pg.Pool

let namesGreeted = NamesGreeted()


const pool = new Pool({
    connectionString: 'postgres://oygnbgbdfpfsyl:325a9a8705dc1bd16a4339834a7d345a8d2f25babe8d74cd6f08c84131d15c67@ec2-18-215-44-132.compute-1.amazonaws.com:5432/ddd21pda85tb2v',
    ssl: {
      rejectUnauthorized: false
    }
})

describe('The greetings-webapp database', function () {

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
    })

    it('should be able to set names and get them from database', async () => {
        namesGreeted.setName("Mbali")
        assert.deepEqual("mbali", namesGreeted.getName())
    });

    it('should be able to count the names greeted in the database', async () => {
        await namesGreeted.setName("Lungile")
        await namesGreeted.setName("Sabie")
        assert.equal(2, await namesGreeted.nameCount())
    });

    it('should test duplication in the database', async function () {
        await namesGreeted.setName("Yonela")
        await namesGreeted.setName("yoNela")
        assert.equal(1, await namesGreeted.nameCount())
    });

    it('should be able to reset the database', async function(){
        await namesGreeted.setName("Mbali")
        namesGreeted.removeNames()
        assert.equal(0, await namesGreeted.nameCount())
    });

    after(function () {
        pool.end();
    })
});