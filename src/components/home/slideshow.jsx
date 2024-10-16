import React, { useState, useEffect } from 'react';
import { TbCardsFilled } from 'react-icons/tb';
import { FaStar } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';
import SkeletonLoader from '../skeletons/skeletons';
import { useNavigate } from 'react-router-dom';

const Slideshow = () => {

  
  const navigate = useNavigate();

  const handlePlayButtonClick = (id) => {
    navigate(`/watch/${id}`);
  };



// 1 : jujutsu kaisen, 2: evangelion , 3: attack on titan , 4: demon slayer , 5: your name


  const data = [
    {
      id: 21519,
      title: "Anime Movies",
      videoLink: "https://github.com/devxoshakya/anveshna/raw/main/src/videos/5.webm",
      type: "MOVIE",
      totalEpisodes: 1,
      rating: 85,
      duration: 106,
    },
    {
      id: 101922,
      title: "Demon Slayer: Kimetsu no Yaiba",
      videoLink: "https://github.com/devxoshakya/anveshna/raw/main/src/videos/4.webm",
      type: "TV",
      totalEpisodes: 26,
      rating: 83,
      duration: 24,
    },
    {
      id: 113415,
      title: "Jujutsu Kaisen",
      videoLink:  "https://github.com/devxoshakya/anveshna/raw/main/src/videos/1.webm",
      type: "TV",
      totalEpisodes: 24,
      rating: 86,
      duration: 24,
    },{
      id: 16498,
      title: "Attack On Titan",
      videoLink:  "https://github.com/devxoshakya/anveshna/raw/main/src/videos/3.webm",
      type: "TV",
      totalEpisodes: 25,
      rating: 91,
      duration: 24,
    },{
      id: 30,
      title: "Neon Genesis Evangelion",
      videoLink:  "https://github.com/devxoshakya/anveshna/raw/main/src/videos/2.webm",
      type: "TV",
      totalEpisodes: 26,
      rating: 85,
      duration: 24,
    },{
      id: 2008655,
      title: "Bleach",
      videoLink: "https://github.com/ansh5643224/Skyanime/blob/main/src/videos/6.webm",
      type: "TV",
      totalEpisodes: 52,
      rating: 96,
      duration: 30,
    },
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setCurrentIndex(randomIndex);
    }
  }, [data]);

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <div className="relative h-[90vh] mt-16 md:h-[25vh]">
      {data.length == 0 ? (
        <SkeletonLoader />
      ) : (
        <div className="absolute left-0 w-full h-full">
          <video
            src={data[currentIndex].videoLink}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
          />
          <div className="absolute flex flex-col justify-end md:p-0 bottom-0 left-0 h-[100%] w-[80%] md:w-[40%] p-16 bg-gradient-to-r from-black">
            <h2
              className="text-[44px] md:mt-4 md:ml-2  md:text-[24px] font-bold opacity-100"
              onClick={() => handlePlayButtonClick(data[currentIndex].id)}
            >
              {truncateTitle(data[currentIndex].title, 45)}
            </h2>
            <p className='flex items-center text-white md:w-[100%] md:scale-[0.001] md:invisible'>
              <span className='md:invisible'>{data[currentIndex].type}</span>
              <TbCardsFilled className="ml-2 md:invisible" />
              <span className='pl-1 md:invisible'>{data[currentIndex].totalEpisodes}</span>
              <FaStar className="ml-2 md:invisible" />
              <span className='pl-1 md:invisible'>{data[currentIndex].rating / 10}</span>
              <FaClock className="ml-2 md:invisible" />
              <span className='pl-1 md:invisible'>{data[currentIndex].duration} min</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
