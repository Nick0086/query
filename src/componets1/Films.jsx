import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios, { Axios } from 'axios'

export default function Films(props) {
    const { data, status, error } = useQuery({
        queryKey: ['films'],
        queryFn: async () => {
            const res = await axios.get('https://swapi.dev/api/films/')
            return res.data
        },
    })

    if (status === 'pending') {
        return <p>Loading...</p>
    }
    if (status === 'error') {
        return <p>Error : {error.message}</p>
    }

    return (
        <div>
            <h2>Films</h2>
            {data.results.map((film) => {
                const filmUrlParts = film.url.split('/').filter(Boolean)
                const filmId = filmUrlParts[filmUrlParts.length - 1]
                return (
                    <article key={filmId}>
                        <Link  to={`/films/${filmId}`}>
                            <h6>
                                {film.episode_id}. {film.title}{' '}
                                <em>
                                    ({new Date(Date.parse(film.release_date)).getFullYear()})
                                </em>
                            </h6>
                        </Link>
                    </article>
                )
            })}
        </div>
    )
}
