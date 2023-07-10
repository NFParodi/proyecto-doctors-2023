
import './App.css';
import logo from "./img/ejemploLogo (2).png"
import {Grid} from './components/DocGrid'
import {Link, BrowserRouter, Routes,Route} from 'react-router-dom'
import {Search} from './components/search'
import {Create} from './components/Create'
import {Edit} from './components/Edit'
import {Notfound} from './components/Notfound'
import { Landingpage } from './pages/Landingpage';
import { Result } from './components/searchresult';
import { Display } from './components/visualizador';
import { Register } from './components/register';
// import { Login } from './components/login';
// import {Users} from './components/users'
import { UserLoged } from './components/user3';
import {Home} from './components/home'

function App() {
  return (
   <>
   <div className='imagen'>
   <img src={logo} alt="logo" />
   </div>
    <BrowserRouter>
     
      <Routes>
        <Route path='/' element={<UserLoged/>} /> 
        
        <Route path='/search' element={<Search/>} />
        <Route path='/doctors' element={<Grid/>} />
        <Route path='/doctors/searchresult/:plan' element={<Result/>} />
        <Route path='/doctors/display/:plan' element={<Display/>} />
        <Route path='/register' element={<Register/>} />
        {/* <Route path='/login' element={<Login/>} /> */}

        <Route path='/doctors/create' element={<Create/>} />
        <Route path='/doctors/edit/:id' element={<Edit/>} />
        <Route path='/pagenotfound' element={<Notfound/>} />
        {/* <Route path='/users' element={<Users/>} /> */}
        
      </Routes>
    
    
    </BrowserRouter>
    </>
  );
}

export default App;
