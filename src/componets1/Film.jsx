import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function Film() {
    let params = useParams()
    const filmId = params.filmId
    const { data, status, error } = useQuery({
        queryKey: ['film', filmId],
        queryFn: async () => {
            const res = await axios.get(`https://swapi.dev/api/films/${filmId}/`)
            return res.data
        }
    })

    if (status === 'pending') return <p>Loading...</p>
    if (data == null) {
        console.info("this shouldn't happen but it does 2")
        return <p>Loading...</p>
    }
    if (status === 'error') return <p>Error :    {error.message}</p>
    return (
        <div>
            <h2>{data.title}</h2>
            <p >{data.opening_crawl}</p>
            <br />
            <h4 variant="h4">Characters</h4>
            {data.characters.map((character) => {
                const characterUrlParts = character.split('/').filter(Boolean)
                const characterId = characterUrlParts[characterUrlParts.length - 1]
                return <Character id={characterId} key={characterId} />
            })}
        </div>
    )
}

function Character(props) {
    const { id } = props
    const { data, status, error } = useQuery({
        queryKey: ['character', id],
        queryFn: async () => {
            const res = await axios.get(`https://swapi.dev/api/people/${props.id}/`)
            return res.data
        } 
    })

    if (status !== 'success') {
        return null
    }

    return (
        <article key={id}>
            <Link  to={`/characters/${id}`}>
                <h6 >{data.name}</h6>
            </Link>
        </article>
    )
}

export default Film