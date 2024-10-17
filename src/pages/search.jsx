import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import CardGrid from '../components/cards/cardSearch';
import { fetchSearchedAnime } from '../hooks/useAPI';
import Loader from '../components/loader/loader';

const Search = () => {
  window.scrollTo(0, 0);
  const location = useLocation();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loader, setLoader] = useState(true);
  
  // Extract the query from the URL
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  const formatQuery = (query) => {
    const formattedQuery = query.replace(/\+/g, ' ').trim();
    return formattedQuery.charAt(0).toUpperCase() + formattedQuery.slice(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 2150);
    
    return () => clearTimeout(timer);
  }, []);

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
              relaseDate: anime.seasonYear,
            }));
          setSearchResults(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [query]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    
    // Update the URL query params without refreshing the page
    const searchParams = new URLSearchParams(location.search);
    if (newQuery) {
      searchParams.set('query', newQuery);
      history.push({ search: searchParams.toString() });
    } else {
      searchParams.delete('query');
      history.push({ search: searchParams.toString() });
    }
  };

  let searchColor;
  if (searchResults.length > 0) {
    searchColor = searchResults[0].color;
  }

  return (
    <div className='w-full p-4'>
      {loader && <Loader className="mt-0" />}
      <div className='mt-16'>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for anime..."
          className="p-2 border border-gray-300 rounded"
        />
        {!loader && (
          <h1 className='text-white flex text-3xl md:my-4 my-8 mx-2 md:text-xl md:justify-center font-bold'>
            Search Results for
            <span className='ml-1 font-semibold italic' style={{ color: searchColor }}>
              ' {formatQuery(searchQuery)} '
            </span>
          </h1>
        )}
      </div>
      <div className='justify-center items-center flex'></div>
      <CardGrid animes={searchResults} />
    </div>
  );
};

export default Search;
