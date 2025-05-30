import React, { useEffect, useState } from 'react';
import SermonsCarousel from '../Sermons/SermonsCarousel';
import { getSermons } from '@/services/api/apiEndpoints';
import img from "../../assets/cac.png";
import MainPadding from '@/layouts/MainPadding';

const LatestSermons = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await getSermons();
        const formattedSermons = response.data.map(sermon => ({
          title: sermon.title || 'No title',
          category: 'Latest', // Changed from 'Popular'
          preacher: sermon.preacher || sermon.speaker || 'Unknown preacher',
          duration: sermon.duration || 'Unknown duration',
          date: sermon.date || 'Unknown date',
          bibleReferences: sermon.bibleReferences || 'unknown bibleReferences',
          link: sermon.telegramLink|| '#',
          img: sermon.img || img
        }));
        setSermons(formattedSermons);
      } catch (err) {
        setError(err.message);
        setSermons([
          {
            title: 'The Power of God in Your Life',
            date: 'July 15, 2022',
            preacher: 'John Doe',
            img: img,
            link: '#',
            category: 'Latest',
            duration: '45 min'
          },
          {
            title: 'Walking in Faith',
            date: 'July 22, 2022',
            preacher: 'Jane Smith',
            img: img,
            link: '#',
            category: 'Latest',
            duration: '38 min'
          },
          {
            title: 'Finding Peace in Troubled Times',
            date: 'July 29, 2022',
            preacher: 'Michael Johnson',
            img: img,
            link: '#',
            category: 'Latest',
            duration: '52 min'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchSermons();
  }, []);

  if (loading) {
    return (
      <MainPadding className="flex flex-col gap-10 items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse h-full">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
              <div className="mt-2 bg-gray-200 h-4 rounded w-3/4"></div>
              <div className="mt-2 bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </MainPadding>
    );
  }

  if (error) {
    return (
      <MainPadding className="flex flex-col gap-10 items-center">
        <p className="text-red-500">Error loading sermons: {error}</p>
      </MainPadding>
    );
  }

  return (
    <div>
      <SermonsCarousel 
        name={"Latest Sermons"}
        sermons={sermons} 
        heading={"LATEST SERMONS FROM THE TEEN'S MINISTRY OF ANTIOCH BAPTIST CHURCH"}
        button={"/sermons"} 
      />
    </div>
  );
};

export default LatestSermons;