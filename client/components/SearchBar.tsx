import React, { FormEvent, ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/searchbar.scss'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search-result?search=${searchTerm}`)
      setSearchTerm('')
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar
