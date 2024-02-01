import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Movie = {
  id: number,
  name: string
}

type ConnectionStatus = {
  isConnected: boolean,
  movies: Movie[],
};


export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('calendar')
    const movies = await db.collection('movies').find({}).toArray()
    console.log(movies)
    return {
      props: { isConnected: true, movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false, movies: [] },
    };
  }
};

export default function Home({isConnected, movies}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
      <div className='container'>
        <Head>
          <title>Calendar</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        {isConnected ? movies.map((movie) => {
          return <div>Movie: {movie.name}</div>
        }) : <div>Not connected</div>}
      </div>
  )
}
