import React, { useEffect, useState, useRef } from 'react'
import './home.scss';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchmovie, setSearchmovie] = useState([])
  const navigate = useNavigate();
  const initialRender = useRef(true);

  //API to get the movies
  useEffect(() => {
    if (initialRender.current) {
      getmovie();
      initialRender.current = false;  // Mark initial render as done
    }
  }, [])

  const getmovie = async () => {
    try {
      let result = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=e93bdada3670ecb67b72972b3ae40950");
      result = await result.json();
      console.log(result)
      setMovies(result.results);
    }
    catch (error) {
      console.log(error);
    }
  }

  //Search Movies 
  const search = async (key) => {
    try {
      let result = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e93bdada3670ecb67b72972b3ae40950&query=${key}`)
      result = await result.json();
      setSearchmovie(result.results);
    }
    catch (error) {
      console.log(error);
    }
  }

  //Navigation to the movie details page as per the id
  const Loaddetails = id => {
    navigate('/details/' + id);
  }

  return (
    <div className='container home'>
      {/* <header>
      <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.underconsideration.com%2Fbrandnew%2Farchives%2Fnew_logo_for_the_movie_database.php&psig=AOvVaw12Nkw8tV3eF3ij1CV2BpVT&ust=1720779428877000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjmjYbhnocDFQAAAAAdAAAAABAE'></img>
        <div className='main'>
        <div>Home</div>
        <div>Categories</div>
        <div>Contact Us</div>
        </div>
      </header> */}

      <div className='searchdiv'>
        <h2>Get Started With Your Journey To Cinematic Adventures...</h2>
        <TextField className='searchmovie' id="outlined-basic" label="Search movie" variant="outlined" 
        onChange={(e) => search(e.target.value)} />
      </div>

      <div className='container datadiv'>
        {
          searchmovie.length > 0 ?
            (
              searchmovie.map((data) => (
                <div key={data.id} className='movie-item'>
                  <a onClick={() => { Loaddetails(data.id) }}>
                    <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt='poster' />
                  </a>

                  <div className='title'>
                    <a onClick={() => { Loaddetails(data.id) }}>
                      <h5>{data.original_title}</h5>
                    </a>
                  </div>

                </div>
              ))
            ) : (
              movies.map((data) => (
                <div key={data.id}>
                  <a onClick={() => { Loaddetails(data.id) }}>
                    <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt='poster' />
                  </a>

                  <div className='title'>
                    <a onClick={() => { Loaddetails(data.id) }}>
                      <h5>{data.original_title}</h5>
                    </a>
                  </div>

                </div>
              ))
            )}
      </div>

    </div>
  )
}

export default Home