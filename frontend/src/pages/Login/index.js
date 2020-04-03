import React, { useState }from 'react'
import { Link, useHistory } from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'

import api from '../../services/api'
import { logando } from "../../services/auth"

import './styles.css'


import friendsImg from '../../assets/friends.png'
import logoImg from '../../assets/logo.png'

export default function Login(){

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const[setHidden] = useState(true)
    const history = useHistory()

    async function handleLogin (e) {
        e.preventDefault();

        const data ={
            name,
            password
        }    
        if(!name || !password){
            alert('Complete todos os campos')
        }else {
            try {
              const res = await api.post(`users/${data.name}`, { password: data.password })
              console.log('AAAAA',res, name, password)
              const response = logando(res.data.token);
              const msg = res.data.mensagem
              const token = res.data.token
              const user_id = response.user_id 
              localStorage.setItem('user_id', user_id)
              if (token) {
                console.log(user_id)
                history.push({
                    pathname: '/product',
                    state: {
                        token: token,
                        user_id: user_id
                      }
            })
                               
              }
              else if (msg === "Falha na Autenticação") {
                alert("Falha na autenticação")
              }
              else {
                alert("Falha na autenticação")
              };
      
            } catch (err) {
              alert("Houve um problema com o login, verifique suas credenciais.");
            }
          }
}

    return(
        <div className = "login-container">
            <section className = "form">
                <img style={{marginTop:10}} src ={logoImg} alt ="Be The Hero"/>
            <form style={{marginTop:-10}} onSubmit = {handleLogin}>
                <h1>Faça seu Login</h1>

                <input 
                placeholder = "Nome" 
                value={name}
                onChange = {e => setName(e.target.value)}
                />
                <input 
                placeholder = "Senha" 
                value={password}
                type={setHidden ? "password" : "text"}
                onChange = {e => setPassword(e.target.value)}
                />
                <button className = "button" type = "submit">Entrar</button>

                <Link className = "back-link" to = "/newregister">
                    <FiLogIn size = {16} color = "#F26E22" />
                    Não tenho cadastro
                </Link>
            </form>
            </section>
            <img src = {friendsImg} alt = "friends"/>
        </div>
    )}