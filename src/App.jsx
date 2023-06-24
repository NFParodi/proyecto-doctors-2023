
import './App.css';
import {Grid} from './components/DocGrid'
import {Link, BrowserRouter, Routes,Route} from 'react-router-dom'

import {Create} from './components/Create'
import {Edit} from './components/Edit'
import {Notfound} from './components/Notfound'
import { Landingpage } from './pages/Landingpage';
import { Result } from './components/searchresult';
import { Display } from './components/visualizador';

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path='/' element={<Landingpage/>} />
        <Route path='/doctors' element={<Grid/>} />
        <Route path='/doctors/searchresult/:plan' element={<Result/>} />
        <Route path='/doctors/display/:plan' element={<Display/>} />

        <Route path='/doctors/create' element={<Create/>} />
        <Route path='/doctors/edit/:id' element={<Edit/>} />
        <Route path='/pagenotfound' element={<Notfound/>} />
      </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;
