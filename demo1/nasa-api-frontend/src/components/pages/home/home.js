import React, { useEffect } from 'react';
import './home.css';
import useStore from '../../../store';

const PictureOfTheDay = () => {
  const { data, loading, error } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/nasa/apod`);
        const pictureData = await response.json();
        useStore.getState().fetchPictureOfTheDay(pictureData.date);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="picture-of-the-day-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error}</p>
      ) : data.length > 0 ? (
        <div>
          <h2 className="potd-title">Picture of the Day</h2>
          <img src={data[0].url} alt={data[0].title} className="potd-image" />
          <p className="potd-title">{data[0].title}</p>
          <p className="potd-explanation">{data[0].explanation}</p>
        </div>
      ) : null}
    </div>
  );
};

export default PictureOfTheDay;