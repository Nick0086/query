import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div>
            <h2>React Query Demo</h2>
            <p>Using the Star Wars API</p>
            <p>Built by <Link href="https://twitter.com/Brent_m_Clark">@Brent_m_Clark</Link></p>


            <div>
                <h5>Why React Query?</h5>
                <p> In this demo you will be able to see how React Query is a significant
                    improvement over <strong>redux</strong>, <strong>mobx</strong>, and
                    any other general-purpose state container.</p>
                <p> No reducers, thunks, or sagas. No ES6 models to maintain in order to
                    tag them as observable.</p>
                <p>Simply associate a key with your fetch call and let{' '}
                    <strong>React Query</strong> handle the rest.</p>
                <h5>Ready to get started?</h5>
                <p>Check out the{' '}
                    <Link  to="/films">
                        Films
                    </Link>{' '}
                    and{' '}
                    <Link  to="/characters">
                        Characters
                    </Link>
                    !</p>
            </div>
        </div>
    )
}
