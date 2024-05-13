import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Movie } from '../../../core/entities/movie.entity';
import { FlatList } from 'react-native-gesture-handler';
import { MoviePoster } from './MoviePoster';

interface Props {
  movies: Movie[];
  title?: string;
  loadNextPage?: () => void;
}

export const HorizontalCarousel = ({ movies, title, loadNextPage }: Props) => {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  //! El tipado del siguiente "event" sale de poner el onScroll en el FlatList. "onScroll={(e)=>console.log(e)}". Si pongo el cursor sobre (e), me muestra el tipo de evento.
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    //  console.log('contentOffset: ', contentOffset);
    //  console.log('layoutMeasurement: ', layoutMeasurement);
    //  console.log('contentSize: ', contentSize);

    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;
    if (!isEndReached) return;

    isLoading.current = true;

    //Cargar las siguientes películas
    loadNextPage && loadNextPage();
  };

  return (
    <View
      style={{
        height: title ? 260 : 220,
      }}>
      {title && (
        <Text
          style={{
            fontSize: 30,
            fontWeight: 300,
            marginLeft: 10,
            marginBottom: 10,
          }}>
          {title}
        </Text>
      )}

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
    </View>
  );
};

//! Originalmente el keyExtractor estaba así:
//! keyExtractor={item => "{item.id.toString()}"}
//! Se cambió a como está actualmente porque hay un error en los keys de TMDB (Se duplican películas, por lo que repite los ID)
