
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, FlatListComponent, Image, ScrollView, Text, View } from "react-native";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";

export default function serach() {
  const [serachQuery, setSerachQuery] = useState<string>("");

  // fetching movies data
  const { data: movies, loading, error,refetch: loadMovies, reset } = useFetch(() => fetchMovies({
    query: serachQuery,
  }), false);

  useEffect(() => {

    // this means debounce method
    const timeoutId = setTimeout(async () => {
      if (serachQuery) {
        await loadMovies();
      } else {
        reset();
      }
    },1000)
   
    return () => clearTimeout(timeoutId);
  }, [serachQuery])

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
                value={serachQuery}
                onChangeText={(text: string) => setSerachQuery(text)}
              />
            </View>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            ) : error ? (
              <Text className="text-red-500 px-5 my-3">Error: {error?.message}</Text>
            ) : null}

            {!loading && !error && serachQuery.trim() && movies?.length > 0 && (
              <Text className="text-white font-bold ">
                Search Results for{' '}
                <Text className="text-accent">{serachQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {serachQuery.trim() ? 'No Movies Found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
// 1000 41 35 19 547
// 0913 89 08 98