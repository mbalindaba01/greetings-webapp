const assert = require('assert')
const NamesGreeted = require('../namesGreeted')
const pg = require("pg")
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
        await namesGreeted.setName("Mbali")
        assert.deepEqual("mbali", await namesGreeted.getName())
    });

    it('should be able to count the names greeted in the database', async () => {
        await namesGreeted.setName("Lungile")
        await namesGreeted.setName("Sabie")
        assert.equal(2, await namesGreeted.namesList())
    });

    it('should test duplication in the database', async function () {
        await namesGreeted.setName("Yonela")
        await namesGreeted.setName("yoNela")
        console.log(namesGreeted.getName())
        assert.equal(1, await namesGreeted.namesList())
    });

    it('should be able to reset the database', async function(){
        await namesGreeted.setName("Mbali")
        await namesGreeted.removeNames()
        assert.equal(0, await namesGreeted.nameCount())
    });

    after(function () {
        pool.end();
    })
});