module.exports = (pool) => {
    let username = ""

    const setName = async (name) => {
        username = name.toLowerCase().trim()
        pool.query("insert into users values($1)", [username])
    }

    const getName = () => {
        return username
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