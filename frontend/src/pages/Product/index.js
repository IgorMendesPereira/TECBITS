import React, { useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiPower } from 'react-icons/fi'

import logoImg from '../../assets/logo.png'

import api from '../../services/api'

import './styles.css'


export default function NewProduct() {
    const [product_name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image,setImage] = useState(null)
    let   [value, setValue] = useState('')
    const [amount, setAmount] = useState('')
    let money = ('')


    const history = useHistory()

    const user_id = localStorage.getItem('user_id')

    async function handleNewProduct(e) {
        e.preventDefault();

        if (!product_name && !description && !value && !amount && !image) {
            alert("Preenche todos os campos")
        } else {
            console.log('aaaaaaaaaaaa',image)
            money = value.toString().split(',')
            if (money[0] && money[1]) {
            } else {
                money = value.toString().split('.')
            }

            if (!money[1]) {
                money[1] = 0
            }
            value = 0
            value = money[0]
            value += "."
            value += money[1]

            
            const data = new FormData() 
                data.append('product_name',product_name)
                data.append('description',description)
                data.append('value',value)
                data.append('amount',amount)
                data.append('image',image)
                
            try {
                await api.post('products', data, {
                    headers: {
                        Authorization: user_id,
                    }
                })
                alert(`${product_name} cadastrado com sucesso`)
                history.push('/allproduct')
            } catch{
                alert('Erro ao cadastrar o produto')
            }

        }
    }
    function handleLogout() {
        localStorage.clear();

        history.push('/login')
    }

    return (<div className="product-container">
        <div className="content">
            <section>
                <img style={{ marginTop: 10 }} src={logoImg} alt="TecBits" />

                <h1 style={{ marginTop: -5 }}>Cadastrar novo produto</h1>
                <p style={{ marginTop: -20 }}>Cadastre novo produto com descriação, valor e a quantidade em estoque.</p>

                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} collor="#F26E22"></FiArrowLeft>
                  Voltar para o site
             </Link>
                <Link className="back-link" to="/register">
                    <FiArrowRight size={16} collor="#F26E22"></FiArrowRight>
                 Cadastrar funcionário
             </Link>
                <Link className="back-link" to="/allproduct">
                    <FiArrowRight size={16} collor="#F26E22"></FiArrowRight>
                  Ver todos os produtos
             </Link>
            </section>

            <form onSubmit={handleNewProduct}>
                <input
                    placeholder="Nome do Produto"
                    value={product_name}
                    onChange={e => setName(e.target.value)}
                />
                 <input
                    file={image}
                    type= "file"
                    onChange={e => setImage(e.target.files[0])}
                />

                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <div className="input-group">
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        type="number"
                        onChange={e => setValue(e.target.value)}
                    />
                    <input
                        placeholder="Quantidade"
                        style={{ width: 150 }}
                        value={amount}
                        type="number"
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>

                <button className="button" type="submit">Cadastrar Produto</button>
            </form>
            <header> <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#F26E22" />
                <p>Sair</p>
            </button>
            </header>
        </div>
    </div>)

}