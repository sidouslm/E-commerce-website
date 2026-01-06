import { connect } from "mongoose";


async function dbconnection(dbname) {
    try {
        await connect(`mongodb+srv://ssidouuslm_db_user:Lu4tHKqJVTQqJZwW@cluster0.k0tnw42.mongodb.net/${dbname}`);
        console.log(`You are connected to the DATABASE`)
    } catch(error) { 
        console.error(error);
    }
    
}

export default dbconnection