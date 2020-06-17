import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])


  function listRepositories(){
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      url: `https://github.com/caiuafranca/estudos-${Date.now()}`,
	    title: `Estudos de ${Date.now()}`,
	    techs: ["REACT", "CSS", "HTML"]
    })

    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    listRepositories()
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            <div>
              <p>{repository.url}</p>
              <p>{repository.title}</p>
              <p>{repository.techs}</p>
              <p>{repository.likes}</p>

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
          </button>
            </div>
          </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
