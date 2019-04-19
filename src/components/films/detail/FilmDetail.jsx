import React, { useState, useEffect } from 'react'
import APIKey from '../../../APIKey.js'
import Loader from '../../../Loader'

export default function FilmDetail(props) {
  const [movie, setMovie] = useState(undefined)

  const fetchCurrentMovie = async idMovie => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?i=${idMovie}&apikey=${APIKey}`)
      
      if (!response.ok)
        throw new Error('Failed to fetch')

      setMovie(await response.json());
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const idMovie = props.match.params.idMovie
    fetchCurrentMovie(idMovie)
  }, [])
  
  if(!movie) 
    return <Loader text='Très bon choix :)' />
  
  console.log(movie)

  return (
    <div>{movie.Title}</div>
  )
}
