import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';
import './styles.css';

export default function Profile(){
    const history = useHistory();
    const token = localStorage.getItem('accessToken');
    const [offset, setOffset] = useState(0);
    const [max, setMax] = useState(10);
    const [incidents, setIncidents] = useState([]);
    if(!token){
        history.replace('/');
    }

    useEffect(()=> {
            if(!token){
                return;
            }
            api.get('profile', {
                headers:{
                    Authorization: `Bearer ${token}`
                },
                params: {
                    offset,
                    max
                }
            }).then((response)=>{
                setIncidents(response.data);
            }).catch(e => {
                alert('Ocorreu um erro ao tentar listar os casos!');
            })
    }, [token, offset, max]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(e){
            alert('Erro ao deletar caso!');
        }
    }

    const name = localStorage.getItem('name');
    function handleLogout(){
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('accessToken')
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {name}</span>
                <Link
                    className="button"
                    to="/incidents/new"
                >
                    Cadastrar Novo Caso
                </Link>
                <button
                     onClick={handleLogout}
                >
                    <FiPower 
                        size={18} 
                        color="#e02041"
                    />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {
                    incidents.map(incident =>(
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                            <button 
                                type="button"
                                onClick={() => handleDeleteIncident(incident.id)}
                            >
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}