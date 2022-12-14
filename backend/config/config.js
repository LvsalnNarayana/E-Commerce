import mongose from 'mongoose';

const conectDB = async () => {
    try {
        const conn = await mongose.connect(process.env.MONGODB_URI);
        console.log(conn.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
export default conectDB