import './favoritos.css'
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
function Favoritos(){
    const [filmes,setFilmes]= useState([]);

    useEffect(()=>{
        const minhalista=localStorage.getItem('@filmeflix');
        setFilmes(JSON.parse(minhalista) || []);

    },[])
    function excluirfilme(id){
        let filtrofilmes=filmes.filter((item)=>{
           return (item.id!==id) 
        })

        setFilmes(filtrofilmes);

        localStorage.setItem('@filmeflix',JSON.stringify(filtrofilmes));
        toast.success("Filme removido com sucesso!");

    }
    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            {filmes.length==0 && <span>Você Não Possui Nenhum Filme Salvo</span>}

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`} >Ver Detalhes</Link>
                                <button onClick={()=>excluirfilme(item.id)}>Excluir</button>
                            </div>
                        </li>

                    )
                })}
            </ul>
        </div>
    )
}
export default Favoritos;