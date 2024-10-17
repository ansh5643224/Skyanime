import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CardGrid from '../components/cards/cardSearch';
import { fetchSearchedAnime } from '../hooks/useAPI';
import Loader from '../components/loader/loader';

const Search = () => {
  window.scrollTo(0, 0);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loader, setLoader] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  const formatQuery = (query) => {
    const formattedQuery = query.replace(/\+/g, ' ').trim();
    return formattedQuery.charAt(0).toUpperCase() + formattedQuery.slice(1);
  };

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      fetchSearchedAnime(query)
        .then(searchedAnime => {
          const data = searchedAnime
            .filter(anime => anime.bannerImage)
            .map(anime => ({
              id: anime.id,
              bannerImage: anime.bannerImage,
              title: anime.title.english || anime.title.romaji || 'No Title',
              title_romaji: anime.title.romaji,
              type: anime.format,
              totalEpisodes: anime.episodes,
              rating: anime.averageScore,
              duration: anime.duration,
              imageSrc: anime.coverImage.extraLarge,
              status: anime.status,
              color: anime.coverImage.color,
              releaseDate: anime.seasonYear,
            }));
          setSearchResults(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [query]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        fetchSearchedAnime(searchQuery)
          .then(searchedAnime => {
            const data = searchedAnime
              .filter(anime => anime.bannerImage)
              .map(anime => ({
                id: anime.id,
                bannerImage: anime.bannerImage,
                title: anime.title.english || anime.title.romaji || 'No Title',
                title_romaji: anime.title.romaji,
                type: anime.format,
                totalEpisodes: anime.episodes,
                rating: anime.averageScore,
                duration: anime.duration,
                imageSrc: anime.coverImage.extraLarge,
                status: anime.status,
                color: anime.coverImage.color,
                releaseDate: anime.seasonYear,
              }));
            setSearchResults(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }, 300); // Debounce input for 300ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  let searchColor;
  if (searchResults.length > 0) {
    searchColor = searchResults[0].color;
  }

  return (
    <div className='w-full p-4'>
      {loader && <Loader className="mt-0" />}
      <div className='mt-16'>
        {!loader && (
          <h1 className='text-white flex text-3xl md:my-4 my-8 mx-2 md:text-xl md:justify-center font-bold'>
            Search Results for <span className='ml-1 font-semibold italic' style={{ color: searchColor }}>{`' ${formatQuery(searchQuery)} '`}</span>
          </h1>
        )}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for anime..."
          className="p-2 rounded border border-gray-300 w-full md:w-1/2"
        />
      </div>
      <CardGrid animes={searchResults} />
    </div>
  );
};

export default Search;
