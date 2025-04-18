import {Client, Databases, ID, Query} from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!; 
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

console.log("DB_ID:", DATABASE_ID);
console.log("COLLECTION_ID:", COLLECTION_ID);
console.log("PROJECT_ID:", process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {

  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    console.log(result);

    if (result.documents.length > 0) {
      const exsitingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        exsitingMovie.$id,
        {
          count: exsitingMovie.count + 1,
        }
      );
    } else {
      const res = await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      });

      console.log(res);
    }

    
  } catch (error) {
    console.log(error);
    throw error;
  }
    
};