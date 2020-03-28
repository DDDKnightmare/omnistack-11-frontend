import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import {aes256Encrypt} from '../../utils/encryption'

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        if(!name){
            return alert('Preencha o nome da ONG!');
        }
        if(!email){
            return alert('Preencha o email da ONG!');
        }
        if(!(/^\d{2}?\d{11}$/.test(whatsapp))){
            return alert('Preencha o campo whatsapp com um telefone válido!');
        }
        if(!password){
            return alert('Preencha o campo senha!');
        }
        if(!city){
            return alert('Preencha o cidade!');
        }
        if(!/^(?![_\d].|.[_\d])\w{2}$/.test(uf)){
            return alert('Preencha o UF da cidade com um UF válido!')
        }
        const {cipherText, iv} = aes256Encrypt({
            msg: password, 
            pass: email,
            ivEnc: 'hex',
            passEnc: 'utf8'
        });
        const data = {
            name,
            email,
            whatsapp,
            password: cipherText + '=' + iv,
            city,
            uf
        }

        try{
            const response = await api.post('ongs', data);
            alert(`Seu id de acesso: ${response.data.id}`);
            return history.push('/');
        }catch({response}){
            console.log(response);
            alert('Ocorreu um erro durante a requisição! Tente novamente mais tarde!');
        }
        
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link 
                        className="back-link"
                        to="/"
                    >
                        <FiArrowLeft/> Voltar para a home
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value.toLowerCase())}
                        required
                    />
                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                        <input 
                            placeholder="UF" 
                            style={{width: 80}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="button"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}