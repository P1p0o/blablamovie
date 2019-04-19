import React, { useState, useEffect } from 'react'
import FilmList from './FilmList'
import APIKey from '../../../APIKey.js'
import Loader from '../../../Loader'

export default function Films(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [films, setFilms] = useState([])
  const [filmsFiltered, setFilmsFiltered] = useState([])
  let textSearched = ''

  let filmArray = []
  const fetchFilms = async (page) => {
    try {
      setIsLoading(true)
      const response = await fetch(`http://www.omdbapi.com/?s=pirates&type=movie&page=${page}&apikey=${APIKey}`)

      if (!response.ok)
        throw new Error('Failed to fetch')

      const { Search, totalResults } = await response.json();

      setIsLoading(false)
      filmArray = [...filmArray, ...Search]

      if (page * 10 < totalResults)
        fetchFilms(page + 1)
      else {
        //l'api nous retourne certains films en doublons (mm id etc..) on procède à un check des doublons avant d'afficher les films
        filmArray = filmArray.filter((film, index, self) =>
          index === self.findIndex((t) => (
            t.imdbID === film.imdbID
          ))
        )
        
        setFilms(filmArray)
        setFilmsFiltered(filmArray)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const searchMovie = () => {
    const moviesFound = films.filter(film => film.Title.toLowerCase().includes(textSearched.value.toLowerCase()))
    setFilmsFiltered(moviesFound)
  }

  useEffect(() => {
    fetchFilms(1)
  }, [])

  if (isLoading)
    return <Loader text='Récupération des données...'/>

  return (
    <div className='filmContainer'>
      <input type='text' ref={node => textSearched = node} onChange={() => searchMovie()}/>
      <FilmList films={filmsFiltered} />
    </div>
  )
}
