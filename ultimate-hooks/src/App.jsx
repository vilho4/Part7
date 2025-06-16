import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl)
        console.log(response.data, 'responsen muoto')
        setResources({ found: true, data: response.data })
      } catch (error) {
        console.error('fetch failed', error)
        setResources({ found: false, data: [] })
      }
    }

    fetchData()
  }, [baseUrl])

  // ...

const create = async (resource) => {
  console.log(resource, 'resurssi')

  const response = await axios.post(baseUrl, resource)
  console.log(response, 'postin response')

  setResources(prevResources => {
    const updatedData = [...prevResources.data, response.data]

    return {
      ...prevResources,
      data: updatedData
    }
  })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.found && notes.data.map(n => <p key={n.id}>{n.content}</p>)}
      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.found && persons.data.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App