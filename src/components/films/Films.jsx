import React, { useState, useEffect } from 'react'
import FilmList from './FilmList'

export default function Films(props) {
  const page = props.match.params.page ? props.match.params.page : 1
  const [isLoading, setIsLoading] = useState(false)
  const [films, setFilms] = useState([])
  const [totalResults, setTotalResults] = useState(0)

  const fetchFilms = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`http://www.omdbapi.com/?s=avengers&type=movie&page=${page}&apikey=c84ab614`)
      
      if(!response.ok)
        throw new Error('Failed to fetch')

      const { Search, totalResults } = await response.json();
      
      setIsLoading(false)
      setFilms(Search)
      setTotalResults(totalResults)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchFilms()    
  }, [])


  if(isLoading) 
    return 'Looking for movies...'

  return (
    <div>
      <FilmList films={films} page={page} total={totalResults}/>
    </div>
  )
}
