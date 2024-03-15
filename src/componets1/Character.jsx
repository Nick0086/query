import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function Character() {
  let params = useParams()
  const characterId = params.characterId
  const { status, error, data } = useQuery({
    queryKey: ['character', characterId],
    queryFn: async () => {
      const res = await axios.get(`https://swapi.dev/api/people/${characterId}/`)
      return res.data
    }
  })

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return <p>Error :  {error.message}</p>

  const homeworldUrlParts = data?.homeworld.split('/').filter(Boolean)
  const homeworldId = homeworldUrlParts[homeworldUrlParts.length - 1]

  if (status !== 'success') {
    return null
  }
  return (
    <div className='text-center' >
      <h2 >{data.name}</h2>
      <div className='w-full   text-center !flex justify-center ' >
      <table className='text-center' >
        <thead>
          <tr>
            <th>Feature</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Born</td>
            <td>{data.birth_year}</td>
          </tr>
          <tr>
            <td>Eyes</td>
            <td>{data.eye_color}</td>
          </tr>
          <tr>
            <td>Hair</td>
            <td>{data.hair_color}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{data.height}</td>
          </tr>
          <tr>
            <td>Mass</td>
            <td>{data.mass}</td>
          </tr>
          <tr>
            <td>Homeworld</td>
            <td>
              <Homeworld id={homeworldId} />
            </td>
          </tr>
        </tbody>
      </table>
      </div>
     
      <br />
      <h4 >Films</h4>
      {data.films.map((film) => {
        const filmUrlParts = film.split('/').filter(Boolean)
        const filmId = filmUrlParts[filmUrlParts.length - 1]
        return <Film id={filmId} key={`Film-${filmId}`} />
      })}
    </div>
  )
}

function Film(props) {
  const { id } = props
  const { data, status } = useQuery({
    queryKey: ['film', id],
    queryFn: async () => {
      const res = await axios.get(`https://swapi.dev/api/films/${id}/`)
      return res.data
    }
  })

  if (status !== 'success') {
    return null
  }
  return (
    <article key={id}>
      <Link to={`/films/${id}`}>
        <h6 >
          {data.episode_id}. {data.title}
        </h6>
      </Link>
    </article>
  )
}

function Homeworld(props) {
  const { id } = props
  const { data, status } = useQuery({
    queryKey: ['homeworld', id],
    queryFn: async () => {
      const res = await axios.get(`https://swapi.dev/api/planets/${id}/`)
      return res.data
    }
  })

  if (status !== 'success') {
    return null
  }

  return data.name
}

export default Character
