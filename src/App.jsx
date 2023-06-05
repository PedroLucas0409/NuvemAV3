import React,{useState, useEffect} from 'react';
import { supabase } from './createClient';
import './App.css'
import './index.css'

const App = () => {

  const [users,setUsers]=useState([])
  
  const [user,setUser]=useState({
    produtos:'',Preco:''
  })

  const [user2,setUser2]=useState({
   id:'',produtos:'',Preco:''
  })


  
  console.log(user2)


  useEffect(() => {
    fetchUsers()
  }, [])  


  async function fetchUsers(){
    const {data} = await supabase
    .from('users')
    .select('*')
    setUsers(data)



  }

  function handleChange(event){

    setUser(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  function handleChange2(event){

    setUser2(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  async function createUser(){
    await supabase
    .from('users')
    .insert({ Preco: user.Preco, produto: user.produto })
  
    fetchUsers()


  }

  async function deleteUser(userId){
    
  const { data, error } = await supabase
  .from('users')
  .delete()
  .eq('id', userId)

  fetchUsers()


  if (error){
    console.log(error)
  }

  if (data){
    console.log(data)
  }




   }

    function displayUser(userId){

      users.map((user)=>{
        
          if(user.id==userId){
            setUser2({id: user.id,produtos:user.produtos,Preco:user.Preco})
          }




      })

    }


    async function updateUser(userId){

    const { data, error } = await supabase
      .from('users')
      .update({ id: user2.id,produtos:user2.produtos,Preco:user2.Preco })
      .eq('id', userId)

      fetchUsers()



      if (error){
        console.log(error)
      }
    
      if (data){
        console.log(data)
      }

    }
    

  return (
    <div>

      {/*FORM1*/}
      <form onSubmit={createUser}>
        <input 
          type='number'
          placeholder='Preco'
          name='Preco'
          onChange={handleChange}

        />
                <input 
          type='text'
          placeholder='produtos'
          name='produtos'
          onChange={handleChange}

        />
        <button type='submit'>Criar</button>

      </form>


            {/*FORM2*/}
      <form onSubmit={()=>updateUser(user2.id)}>
        <input 
          type='number'
          name='Preco'
          onChange={handleChange2}
          defaultValue={user2.produtos}

        />
                <input 
          type='text'
          name='produtos'
          onChange={handleChange2}
          defaultValue={user2.Preco}


        />
        <button type='submit'>Salvar Alteração</button>

      </form>



      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Preco</th>
            <th>produtos</th>
            <th>Ações</th>
          </tr>
        </thead>


        <tbody>
          {users.map((user)=>
          <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.Preco}</td>
              <td>{user.produtos}</td>
              <td>
                <button onClick={()=>{deleteUser(user.id)}}>Deletar</button>
                <button onClick={()=>{displayUser(user.id)}}>Editar</button>

                </td>
              

            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App