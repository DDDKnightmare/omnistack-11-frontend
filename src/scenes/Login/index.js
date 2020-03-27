import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import {Link} from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import './styles.css';

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form>
                    <h1>
                        Faça seu Login
                    </h1>
                    <input
                        type="text"
                        placeholder="Seu ID"
                    />
                    <input
                        type="password"
                        placeholder="Sua senha"
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