import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css';

import Form from './Pages/Form';
import Download from './Pages/Download';
import InsulationCalculator from './Pages/InsulationCalculator'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Form}></Route>
        <Route path='/download' Component={Download}></Route>
        <Route path='/insulation' Component={InsulationCalculator}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
