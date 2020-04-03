import React, { useState } from 'react'

import { Link,useHistory } from 'react-router-dom'
import {FiArrowLeft } from 'react-icons/fi'


import logoImg from '../../assets/logo.png'

import api from '../../services/api'

import './styles.css'


export default function Register() {
    const[name, setName] = useState('')
    const[password, setPassword] = useState('')
    const[password2, setPassword2] = useState('')
    const[setHidden] = useState(true)

    const history = useHistory()
    


   async function handleRegister(e){
        e.preventDefault();
        if(!name || !password || !password2){
            alert('Complete todos os campos')
        }else if (password === password2) {
        const data ={
            name,
            password
        }
        try{
           const res = await api.post('users', data)
           const msg = res.data.mensagem
           if(msg === "Nome de usuário existente"){
                alert(`${msg}`)
           }else
            alert('Cadastrado com sucesso!!')
            history.push('/login')
        }catch{
            alert('Erro ao cadastrar')
        }}
    
    else {
        alert('As senhas são diferentes, tente novamente')
    }

    }



    return (<div className="register-container">
    <div className ="content">
        
        <section>
             <img style={{marginTop:10}} src ={logoImg} alt ="Be The Hero"/>

             <h1 style={{marginTop:-5}} >Cadastrar novo funcionário</h1>
             <p style={{marginTop:-20}}> Digite login e senha.</p>

             <Link className = "back-link" to ="/login">
                 <FiArrowLeft size = {16} collor = "#F26E22"></FiArrowLeft>
                  Voltar
             </Link>

        </section>
    
        <form onSubmit={handleRegister}>
            <input
             placeholder ="Login"
             value={name}
             onChange={e => setName(e.target.value)}
             />
   
            <input
             placeholder = "Senha"
             value={password}
             type={setHidden ? "password" : "text"} 
             onChange={e => setPassword(e.target.value)}
             /> 
             <input
             placeholder = "Repita a senha"
             value={password2}
             type={setHidden ? "password" : "text"}
             onChange={e => setPassword2(e.target.value)}
             /> 
            <button className ="button" type = "submit">Cadastrar novo funcionário</button>
        </form>
        <header>
        </header>
    </div>
</div>)

}