import React, { useState,useEffect } from 'react'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import './styles.css'


export default function AllProducts(){
    const [products, setProducts] = useState([])
    console.log(products)

    useEffect(()=> {
        api.get('products')
            .then( res => {
            setProducts(res.data)
            })})
     
    return( 
        <div className="AllProducts-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span> Bem Vindo </span>
            </header>
            <ul>
              {products.map(product => (  
              <li key={product.product_id}>
        
                    <strong>
                        Produto
                    </strong>
                    <p>
                        {product.product_name}
                    </p>
                    <img  src = {`http://localhost:3308/files/${product.product_id}.jpg`} alt = "Imagem do produto" />
                    <strong>
                        Descrição
                    </strong>
                    <p>{product.description}</p>
                    {/* <strong>
                        Quantidade em Estoque
                    </strong> */}
                    <p>
                        {product.amount}
                    </p>

                    <strong>
                        Valor
                    </strong>
                    <p>
                        {Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(product.value)}
                    </p>

                </li>))}
           
            </ul>
        </div>

    )}