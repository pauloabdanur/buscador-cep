import { useState } from 'react';
import { GiMagnifyingGlass } from 'react-icons/gi';
import './styles.css';

import api from './services/api';
 
function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handleSearch(){
    
    if(input === ''){
      alert("Preencha com algum CEP!");
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }catch{
      alert("CEP inválido!");
      setInput('');
    }

  }

  return (
    <div id="container">

      <h1 id="title">Buscador de CEP</h1>

      <div id="inputContainer">
        <input 
        type="text" 
        placeholder="Digite seu CEP" 
        value={input}
        onChange={(newInput) => setInput(newInput.target.value)}
        />

        <button 
        id="searchButton"
        onClick={handleSearch}
        >
          <GiMagnifyingGlass size={25} color="#FFF"/>
        </button>
      </div>

        {Object.keys(cep).length > 0 && (
          <div id="main">
            <h2>CEP: {cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade} - {cep.uf}</span>
            <span>DDD: {cep.ddd}</span>
          </div>
          
        )}

    </div>

  );
}

export default App;
