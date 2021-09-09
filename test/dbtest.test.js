const assert = require('assert')
const NamesGreeted = require('../namesGreeted')
const pg = require("pg")
require('dotenv').config()
const Pool = pg.Pool

let namesGreeted = NamesGreeted()


const pool = new Pool({
    user: 'mbali',
    host: 'localhost',
    database: 'testwebapp',
    password: 'Zanokuhle!28',
    port: 5432,
})

describe('The greetings-webapp database', function () {

    beforeEach(async() => {
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