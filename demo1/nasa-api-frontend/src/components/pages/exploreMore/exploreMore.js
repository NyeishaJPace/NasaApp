import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './exploreMore.css';
import useStore from '../../../store';

const BASE_URL = `http://localhost:8080/api/nasa`;
let maxDay = new Date(Date.now());

function NasaPage() {
  const { data, loading, error, fetchPictureOfTheDay, fetchImagesByDateRange } = useStore();
  const [date, setDate] = React.useState('');
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');
  const [count, setCount] = React.useState('');

  const resetDate = () => {
    setDate('');
    setFromDate('');
    setToDate('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date) {
      fetchPictureOfTheDay(date);
    } else if (fromDate && toDate) {
      fetchImagesByDateRange(fromDate, toDate);
    }
    resetDate();
  };

  return (
    <div className="nasa-page-container">
      <h2>NASA API Data</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <DatePicker
            selected={date ? new Date(date) : null}
            onChange={(date) => setDate(date.toISOString().split('T')[0])}
            dateFormat="yyyy-MM-dd"
            placeholderText="Date"
            maxDate={maxDay}
            className="date-input"
          />
        </div>
        <div className="input-group">
          <DatePicker
            selected={fromDate ? new Date(fromDate) : null}
            onChange={(date) => setFromDate(date.toISOString().split('T')[0])}
            dateFormat="yyyy-MM-dd"
            placeholderText="From Date"
            maxDate={maxDay}
            className="date-input"
          />
          <DatePicker
            selected={toDate ? new Date(toDate) : null}
            onChange={(date) => setToDate(date.toISOString().split('T')[0])}
            dateFormat="yyyy-MM-dd"
            placeholderText="To Date"
            maxDate={maxDay}
            minDate={fromDate ? new Date(fromDate) : null}
            className="date-input"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="count-input"
          />
          <button type="submit" className="fetch-button">
            Fetch Data
          </button>
        </div>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        data && (
          <div>
            <p>Count of images: {count ? count : data.length}</p>
            {data
              .slice(0, count && count <= data.length ? count : data.length)
              .map((item, index) => (
                <div key={index} className="image-card">
                  <p>Date: {item.date}</p>
                  <p>Explanation: {item.explanation}</p>
                  <img src={item.url} alt={item.title} className="image" />
                </div>
              ))}
          </div>
        )
      )}
    </div>
  );
}

export default NasaPage;