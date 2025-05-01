
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, FlatListComponent, Image, ScrollView, Text, View } from "react-native";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";
import { updateSearchCount } from "@/services/appwrite";
import { useRef } from "react";

export default function serach() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const calledRef = useRef(false);

  // fetching movies data
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
  );



  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies(); // trigger refetch
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // 🆕 useEffect to handle side-effect after movies update
useEffect(() => {
  // Debounce: Delay the action until the user stops typing for 500ms
  const timeoutId = setTimeout(() => {
    if (movies?.length > 0 && searchQuery.trim() && !calledRef.current) {
      calledRef.current = true;
      updateSearchCount(searchQuery, movies[0]);
    }
  }, 2000); // Adjust the timeout duration (500ms) as needed

  // Clear the timeout if `searchQuery` or `movies` changes before 500ms
  return () => clearTimeout(timeoutId);
}, [movies, searchQuery]);

useEffect(() => {
  calledRef.current = false;
}, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0"></Image>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row items-center justify-center mt-80">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                // onPress={() => router.push("/search")}
                placeholder="What do you want to watch?"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            ) : error ? (
              <Text className="text-red-500 px-5 my-3">
                Error: {error?.message}
              </Text>
            ) : null}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-white font-bold ">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No Movies Found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}