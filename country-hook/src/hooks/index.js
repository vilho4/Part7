import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)      ///custom hook useCountry, jonka avulla haet hookin parametrina saaman maan tiedot.

  useEffect(() => {
    if (!name) {
      console.log('empty')
      return
    }

    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        console.log(response.data, 'responsen muoto')
        setCountry({ found: true, data: response.data })
      } catch (error) {
        console.error('fetch failed', error)
        setCountry({ found: false })
      }
  }

  fetchCountry()
}, [name])
  return country
}