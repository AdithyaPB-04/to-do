const config = {
    USER:"root",
    HOST:"localhost",
    PASSWORD:"adithya@04",
    dialect:"mysql",
    DB:'todo',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}
export default config;