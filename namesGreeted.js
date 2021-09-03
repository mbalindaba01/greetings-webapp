const { Pool } = require('pg')
const pool = new Pool({
    connectionString: 'postgres://oygnbgbdfpfsyl:325a9a8705dc1bd16a4339834a7d345a8d2f25babe8d74cd6f08c84131d15c67@ec2-18-215-44-132.compute-1.amazonaws.com:5432/ddd21pda85tb2v',
    ssl: {
      rejectUnauthorized: false
    }
})

module.exports = () => {
    let username = ""

    const setName = async (name) => {
        username = name.toLowerCase().trim()
        pool.query("insert into users values($1)", [username])
    }

    const getName = () => {
        if(username){
            console.log(username)
            return username
        }else {
            return ""
        }
    }

    const namesList = async () => {
        let list = await pool.query("select distinct name from users")
        return list.rows
    }

    const nameCount = async () => {
        let names = await pool.query("select count( distinct name ) from users")
        return names.rows[0].count
    }

    const greetCount = async () => {
        let counter = await pool.query("select count(*) from users where name=$1", [username])
        return counter.rows[0].count
    }

    const removeNames = () => {
        pool.query("truncate users")
    }

    return {
        setName,
        getName,
        namesList,
        nameCount,
        greetCount,
        removeNames
    }
}