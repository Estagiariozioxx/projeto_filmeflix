import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Filme from './pages/Filme';
import Header from "./pages/components/Header";
import Erro from './pages/Error'
import Favoritos from "./pages/Favoritos";

function RoutesApp(){
    return (
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/projeto_filmeflix" element={<Home/>}/>
            <Route path="/filme/:id" element={<Filme/>}/>
            <Route path="/favoritos" element={<Favoritos/>}/>

            <Route path="*" element={<Erro/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default RoutesApp;