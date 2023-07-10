
import { query } from "firebase/firestore"
import { useState } from "react"
import { useNavigate, useLocation  } from 'react-router-dom'
import {Singout} from './singout'
import "../css/search.css"

export const Search = ()=>{

    const [palabrabusqueda, setpalabrabusqueda] = useState('')
    const [plan,setplan] = useState('210')
    // const tipoplan = (e)=>{
    //     setplan(e)
    // }

    const navigate = useNavigate();
    // const location = useLocation();
    

    // //nosotros definimos usequery, que usa el metodo urlserchparams 

    // const useQuery = ()=>{
        

    //     return  new URLSearchParams(location.search)
        
        
    // }

    // const query=useQuery()
    // console.log('QUERY: ',query);

    // const search = query.get('search') //con esto extraigo el parametro (search es la clave, el valor es la palabra para la busqueda) search de location
    
    // console.log('SEARCH: ',search);

    // console.log('LOCATION: ',location.search);
    // // const location = useLocation(); esta se usa en peliculas grid porque se tiene que usar donde se realiza la busqueda

    //extraccion de parametro de URL

   


    const handle = (e)=>{
            e.preventDefault();
            if(palabrabusqueda==''){
                navigate(`/doctors/display/${plan}`)
                // switch (plan) {
                //     case 'doctors':
                //     navigate('/doctors/display/210');
                //     break;
                //     case 'doctors310':
                //         navigate('/doctors/display/310');
                //         break;
                //     case 'doctors410':
                //         navigate('/doctors/display/410');
                //     break;
                //     default:
                //     console.log(`No existe plan ${plan}.`);
                // }

            }
            
            else{navigate(`/doctors/searchresult/${plan}/?search=${palabrabusqueda}`)}
            
        
    }


return  (  
    <div>    
        <form onSubmit={handle}>
        <div>
            <label className="plan">Seleccione su plan:</label>
            <select className="btn" onChange={(e)=>setplan(e.target.value)}>
                <option value="210">210</option>
                <option value="310">310</option>
                <option value="410">410</option>
                
            </select>
        </div>
        <div>
            <input className="busqueda" placeholder="Ingrese nombre o especialidad o ciudad" type="text" value = {palabrabusqueda} onChange={(e)=>setpalabrabusqueda(e.target.value)} />  {/*para manejar el submit, que no se ejecute, hago una funcion aparte "hanlde"*/}
        </div>
        <div><button className="btn" type="submit">buscar</button></div>
    </form>
    <Singout/>
    </div>
)

}