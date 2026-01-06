import { connect } from "mongoose";


async function dbconnection(dbname) {
    try {
        await connect(`mongodb://127.0.0.1:27017/${dbname}`);
        console.log(`You are connected to the DATABASE`)
    } catch(error) { 
        console.error(error);
    }
    
}

export default dbconnection