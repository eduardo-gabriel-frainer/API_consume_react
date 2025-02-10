import './style.css'
import Trash from '../../assets/trash.svg'
import { use } from 'react'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'


function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/users')

    setUsers(usersFromApi.data)
    console.log(users)
  }

  async function postUsers() {
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    })

    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name="name" type="text" placeholder='Nome' ref={inputName}></input>
        <input name="age" type="number" placeholder='Idade' ref={inputAge}></input>
        <input name="email" type="email" placeholder='E-mail' ref={inputEmail}></input>
        <button type="button" onClick={postUsers}>Cadastrar</button>
      </form>

      {users.map(user => (

        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span> </p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>

      ))}

    </div>
  )
}

export default Home
