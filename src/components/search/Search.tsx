import React from 'react'

const Search: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
    }
    
    return (
        <main className='banner'>
            <section className='banner-title'>
                <h1>Your new home is waiting for you!</h1>
                <p>Find the property of your dreams overall in Morocco.</p>
            </section>
            <section className='search-form'>
                <form onSubmit={handleSubmit}>

                </form>
            </section>
        </main>
    )
}

export default Search;