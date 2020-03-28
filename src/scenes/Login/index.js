import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import {aes256Encrypt} from '../../utils/encryption'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import './styles.css';

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        try{
            const {iv, cipherText} = aes256Encrypt({
                msg:password, 
                pass:id, 
                ivEnc:'hex',
                passEnc: 'utf8',
                iv: id,
            });

            const response = await api.post('sessions', {id, iv, cipherText});

            localStorage.setItem('id', id);
            localStorage.setItem('name', response.data.name);
            history.push('Profile');
        }catch(e){
            if(e.response && e.response.data){
                alert(e.response.data.error);
            }else{
                alert("Ocorreu um erro! Tente novamente");
            }
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form 
                    onSubmit={handleLogin}
                >
                    <h1>
                        Faça seu Login
                    </h1>
                    <input
                        type="text"
                        placeholder="Seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Sua senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        className="button"
                        type="submit"
                    >
                        Entrar
                    </button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}