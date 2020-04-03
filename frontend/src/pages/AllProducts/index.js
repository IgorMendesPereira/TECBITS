import React, { useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import './styles.css'

let product_id = ['']
let product_name = ['']

export default function AllProducts(){
    const [products, setProducts] = useState([])

    const history = useHistory()

    useEffect(()=> {
        api.get('products',{
            headers: {
                Authorization: product_id,
            }
        })
            .then( res => {
            setProducts(res.data)
            
            })})

    async function handleDeleteProduct(product_id, product_name){
        try{
            await api.delete(`products/${product_id}`)
            setProducts(products.filter(product => product.product_id !== product_id))
            alert(`${product_name} deletado com sucesso`)
        }catch{
            alert('Erro ao deletar')
        }

        }
        
        function handleLogout(){
            localStorage.clear();

            history.push('/login')
    }
    return( 
        <div className="AllProducts-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span> Bem Vindo, {product_name} </span>

                <Link className="button" to="register">Cadastrar novo fucionário</Link>
                <Link className="button" to="product">Cadastrar novo produto</Link>
                
                <button onClick={handleLogout} type = "button">
                    <FiPower size={18} color="#F26E22" />
                    <p>Sair</p>
                </button>
            </header>

            <h1>Produtos Cadastrados</h1>

            <ul>
              {products.map(product => (  
              <li key={product.product_id}>
                    <strong>
                        Produto
                    </strong>
                    <p>
                        {product.product_name}
                    </p>
                    <strong>
                        Descrição
                    </strong>
                    <p>{product.description}</p>
                    <strong>
                        Quantidade em Estoque
                    </strong>
                    <p>
                        {product.amount}
                    </p>

                    <strong>
                        Valor
                    </strong>
                    <p>
                        {Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(product.value)}
                    </p>

                    <button onClick={() => handleDeleteProduct(product.product_id, product.product_name)} type="button">
                        <FiTrash2 size={20} color= "#a8a8b3"/>
                    </button>
                </li>))}
           
            </ul>
        </div>

    )}