import React from 'react'
import axios from 'axios'

import {
    useQuery,
    useQueryClient,
    useMutation,
} from '@tanstack/react-query'

function AutoRefetch() {

    const queryClient = useQueryClient()
    const [intervalMs, setIntervalMs] = React.useState(1000)
    const [value, setValue] = React.useState('')

    const { status, data, error, isFetching } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const res = await axios.get('https://myapi-7wm2.onrender.com/todo')
            console.log(res.data)
            return res.data.data
        },
        // Refetch the data every second
        refetchInterval: intervalMs,
    })

    const addMutation = useMutation({
        mutationFn: (add) => axios.post(`https://myapi-7wm2.onrender.com/todo/add`,{Todo:add}),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    })

    // const clearMutation = useMutation({
    //     mutationFn: () => fetch(`/api/data?clear=1`),
    //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    //   })


    if (status === 'pending') return <h1>Loading...</h1>
    if (status === 'error') return <span>Error: {error.message}</span>

    return (
        <div>
            <h1>Auto Refetch with stale-time set to 1s</h1>
            <p>
                This example is best experienced on your own machine, where you can open
                multiple tabs to the same localhost server and see your changes
                propagate between the two.
            </p>
            <label>
                Query Interval speed (ms):{' '}
                <input
                    value={intervalMs}
                    onChange={(ev) => setIntervalMs(Number(ev.target.value))}
                    type="number"
                    step="100"
                />{' '}
                <span
                    style={{
                        display: 'inline-block',
                        marginLeft: '.5rem',
                        width: 10,
                        height: 10,
                        background: isFetching ? 'green' : 'transparent',
                        transition: !isFetching ? 'all .3s ease' : 'none',
                        borderRadius: '100%',
                        transform: 'scale(2)',
                    }}
                />
            </label>
            <h2>Todo List</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    addMutation.mutate(value, {
                        onSuccess: () => {
                            setValue('')
                        },
                    })
                }}
            >
                <input
                    placeholder="enter something"
                    value={value}
                    onChange={(ev) => setValue(ev.target.value)}
                />
            </form>
            <ul>
                {data.map((item) => (
                    <li key={item._id}><span>{item._id}</span> : {item.Todo}</li>
                ))}
            </ul>
            {/* <div>
                <button
                    onClick={() => {
                        clearMutation.mutate()
                    }}
                >
                    Clear All
                </button>
            </div> */}
        </div>
    )
}

export default AutoRefetch