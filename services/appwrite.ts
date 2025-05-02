import { Client, Databases, ID, Query, Account } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!; 
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

console.log("DB_ID:", DATABASE_ID);
console.log("COLLECTION_ID:", COLLECTION_ID);
console.log("PROJECT_ID:", process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);
const account = new Account(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  // console.log("🔥 updateSearchCount triggered with:", query, movie);

  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    console.log(result);

    if (result.documents.length > 0) {
      const exsitingMovie = result.documents[0];
      const res = await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        exsitingMovie.$id,
        {
          count: exsitingMovie.count + 1,
        }
      );
      console.log('res from after creation',res);
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

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
        const result = await database.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.limit(5), Query.orderDesc("count")]
        );

        return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const signInAppwrite = async (email: string, password: string) => {
  return await account.createEmailPasswordSession(email, password);
};

export const getCurrentUser = async () => {
  return await account.get();
};

export const signOutAppwrite = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Sign out failed:", error);
    throw error;
  }
};

export const signUpAppwrite = async (
  email: string,
  password: string,
  name: string
) => {
  return await account.create(ID.unique(), email, password, name);
};





