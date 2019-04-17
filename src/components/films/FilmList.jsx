import React from 'react'

export default function FilmList(props) {
  const { films, page, total } = props
  return (
    <div>
      {films && films.map(film => {
        return (
          <p key={film.imdbID}>
            {film.Title}
            {film.Year}
            <img src={film.Poster} />
          </p>
        )
      })}
    </div>
  )
}
