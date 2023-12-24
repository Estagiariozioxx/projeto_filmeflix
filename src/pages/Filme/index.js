import { useEffect,useState } from "react";
import { useParams,useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import api from "../services/api";
import './filme-info.css'
function Filme(){
    const {id} = useParams();
    const navigate=useNavigate();
    const [filme,setFilme]= useState({});
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:'edbab5a8766197f330f82b423301436e',
                    language:'pt-BR',
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            }).catch(()=>{
                console.log("filme nao encontrado");
                navigate("/",{replace:true});
                return;
            })
        }

        loadFilme();

        return () =>{
            console.log("comp desmontado")
        }

    },[navigate,id])

    function salvarfilme(){

        const minhalista=localStorage.getItem("@filmeflix");
        let filmesSalvos =JSON.parse(minhalista) || [];

        const hasfilmes= filmesSalvos.some((filmesSalvo)=>filmesSalvo.id == filme.id)
        if(hasfilmes){
            toast.warn("filme ja esta na sua lista!")
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem("@filmeflix",JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")


    }

    if(loading){
        return (
            <div className="filme-info">
                <h1>Carregando Detalhes ...</h1>
            </div>
        )
    }
    
    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
            <h3>Sinopse</h3>
            <span>
                {filme.overview}
            </span>
            <strong>Avaliação: {filme.vote_average}/10</strong>
            <div className="area-buttons">
                <button onClick={salvarfilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results/search_query=${filme.title} Trailer`} target="blank" rel="external">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}
export default Filme;