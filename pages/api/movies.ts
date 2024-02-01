import clientPromise from "../../lib/mongodb";

export default async (req: any, res: any) => {
    try {
        const client = await clientPromise;
        const db = client.db('calendar')
        const movies = await db.collection('movies').find({}).toArray()
        res.json(movies)
    }
    catch (e) {
        console.error(e)
    }
}