export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  Headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({query}: {query: string}) => {
  const endPoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const res = await fetch(endPoint, {
    method: "GET",
    headers: TMDB_CONFIG.Headers,
  });
  if(!res.ok) {
    throw new Error("Failed to fetch movies", {cause: res.status});
  }
  const data = await res.json();
  return data.results;
}