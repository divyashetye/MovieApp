import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './details.scss'

const Details = () => {
    const { id } = useParams();
    const [moviedata, setMoviedata] = useState({});
    const firstRender = useRef(true);
    const [timer, setTimer] = useState(3);

    useEffect(() => {
        if (firstRender.current) {
            getdetails();
            firstRender.current = false
        }
    }, [id]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => { 
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(intervalId);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    const getdetails = async () => {
        try {
            let res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e93bdada3670ecb67b72972b3ae40950`)
            res = await res.json();
            console.log(res);
            setMoviedata(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="timer">
            {timer > 0 ? (
                <h4>Loading in {timer} seconds...</h4>
            ) : (
                <div className='container-fluid stylebox'>

                    <div className='row'>
                        <div className='col-xl-4 leftdiv'>
                            {
                                moviedata &&
                                <img src={`https://image.tmdb.org/t/p/w500/${moviedata.poster_path}`} alt='poster' />
                            }
                        </div>

                        <div className='col-xl-7 rightdiv'>
                            {
                                moviedata &&
                                <>
                                    <h2>{moviedata.original_title}</h2>
                                    <div className='overview'>
                                        <h4><span>Release Date : </span>{moviedata.release_date}</h4>

                                        {moviedata.origin_country && (
                                            <h4><span>Origin Country : </span>{moviedata.origin_country[0]}</h4>
                                        )}


                                        <h4><span>Language : </span>{moviedata.original_language}</h4>

                                        {moviedata.genres && (
                                            <h4><span>Genres : </span>{moviedata.genres.map(genre => genre.name).join(', ')}</h4>
                                        )}

                                        {moviedata.production_companies &&
                                            <h4><span>Production Companies : </span>{moviedata.production_companies.map(prod => prod.name).join(', ')}</h4>
                                        }

                                        <h4><span>Status : </span>{moviedata.status}</h4>

                                        {moviedata.tagline && (
                                            <h4><span>Tagline : </span>{moviedata.tagline}</h4>
                                        )}

                                        <h4><span>Overview : </span></h4>
                                        <p>{moviedata.overview}</p>

                                    </div>

                                </>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Details