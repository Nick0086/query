import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Characters(props) {
    const { status, error, data } = useQuery({
        queryKey: ['characters'],
        queryFn: async () => {
            const res = await axios.get('https://swapi.dev/api/people/')
            return res.data
        } ,
    })

    if (status === 'pending') return <p>Loading...</p>
    if (status === 'error') return <p>Error : {error.message}</p>

    return (
        <div>
            <h2>Characters</h2>
            {data.results.map((person) => {
                const personUrlParts = person.url.split('/').filter(Boolean)
                const personId = personUrlParts[personUrlParts.length - 1]
                return (
                    <article key={personId} className='my-2'>
                        <Link  to={`/characters/${personId}`}>
                            <h6 variant="h6">{person.name}</h6>
                        </Link>
                    </article>
                )
            })}
        </div>
    )
}
