// import {get}from '../utils/clienthttp'
import { useEffect,useState } from 'react'
import {bd} from '../firebase/conexion'
import {collection,doc,getDoc,getDocs,deleteDoc} from 'firebase/firestore'
// import { getStorage ,ref, getBytes} from "firebase/storage";
import { getApp } from "firebase/app";
import 'bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// import {Link} from 'react-router-dom'
import {storage} from '../firebase/conexion'
import { ref,getStorage,getDownloadURL} from 'firebase/storage'
import {Search} from './search'
import {useLocation,useParams,Link} from 'react-router-dom'
import {Singout} from './singout'

export const Display = ()=>{

   const {plan} = useParams();

   // const [todos,settodos] = useState([])
   const [medicos,setmedicos]=useState([])
   // const [medicosfiltrados, setmedicosfiltrados] = useState([])
//    const [palabraclave,setpalabraclave] = useState([''])
   // const [pics,setpics] = useState([])  //con esto tengo que empezar a hacer la descarga
//    const[plan,setplan] = useState('210')
   
   const doctores = collection(bd,plan)
 
   
   const getdoctors = async()=>{

   
      const datos = await getDocs(doctores);
      // const pics = await  getBytes(StorageReference);


      console.log('LOS DATOS SON:', datos.docs);
      // console.log('LAS FOTOS SOON',pics);

    //   setpalabraclave(search)
      
      setmedicos(

         datos.docs.map((doc)=>(({...doc.data(), id:doc.id}))) //al paecer data solo se puede invocar de una solaforma sino arroja error
         

      )

         
      //aca tengo que bajar las fotos
         // setpics(download(),{pics:pics.name}) 
      

}

// const download = async() =>{
         
//          const pathReference = ref(storage,`${archivo.name}`)
//          return await console.log(getDownloadURL(pathReference));  //con esto consigo el valor de la URL
//       }

useEffect(
   ()=>{getdoctors()},[plan]
)



//Borrado de doc



// const erasedoc = async(id,plan)=>{

//    await deleteDoc(doc(bd,plan,id));

// }

// //Alerta de borrado
// const MySwal = withReactContent(Swal)
// const erasealert=(id)=>{
//    Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//    }).then((result) => {
//       if (result.isConfirmed) {
//       erasedoc(id,plan)
//       Swal.fire(
//          'Deleted!',
//          'Your file has been deleted.',
//          'success'
//       )
      
//       }
//    })
// }


//extraccion de parametro de URL

   const location = useLocation();
    

    //nosotros definimos usequery, que usa el metodo urlserchparams 

    const useQuery = ()=>{
        

        return  new URLSearchParams(location.search)
        
        
    }

    const query=useQuery()
    console.log('QUERY: ',query);

    const search = query.get('search') //con esto extraigo el parametro (search es la clave, el valor es la palabra para la busqueda) search de location
    
    console.log('SEARCH: ',search);

    console.log('LOCATION: ',location.search);


    

    

    // const location = useLocation(); esta se usa en peliculas grid porque se tiene que usar donde se realiza la busqueda

    // const palabra = ()=>{}
   
   

return(


   <div>
      
      <div className='prestador'>
         <h3>Visualizador de Prestadores</h3>
         <h4>Usted se encuentra en el plan {plan}, para realizar otra busqueda diríjase a <Link className='home' to={'/search'}>Nueva búsqueda</Link></h4>
         


            
         <div className="container">
  <div className="row">
    <div className="col">
      
      <table className='table table-hover'  >
            
            <thead >
            <tr>
                        
                        <th className='datos'> Nombre</th>
                        <th className='datos'> Apellido</th>
                        <th className='datos'> Especialidad </th>
                        <th className='datos'colSpan={3}> Dirección</th>
                        <th className='datos' colSpan={3}>  </th>
                     </tr>
               </thead> 
               <tbody>    
                  
            
            {medicos.map((medico)=>
            <tr key={medico.id}>
            <td className='datos'>{(medico.name)[0].toUpperCase()+(medico.name).slice(1)}</td>
            <td className='datos'>{(medico.lastname)[0].toUpperCase()+(medico.lastname).slice(1)}</td>
            <td className='datos'>{(medico.specialty)[0].toUpperCase()+(medico.specialty).slice(1)}</td>
               
               <td className='datos'>{(medico.street)[0].toUpperCase()+(medico.street).slice(1)}</td>
               <td className='datos'>{medico.number}</td>
               <td className='datos'>{(medico.city)[0].toUpperCase()+(medico.city).slice(1)}</td>
            
            <td><div className='divPerfil' ><img className='imgPerfil' src={medico.url} alt="imagen_perfil" /></div></td>{/*<td>{medico.address.street} {medico.address.number } {medico.address.city }</td>*/} 
         
         
      </tr> )}
            {/*  <td><img src={pic.url} alt="imagen_perfil" /></td> */}
            {/* porque si no agrego el () de los argumentos de la funcion, la misma se ejecuta de una? */}
            
            </tbody>
         </table>
    </div>
    
  </div>
</div>




            {/* <select onChange={(e)=>setplan(e.target.value)}>
               <option value="210">210</option>
               <option value="310">310</option>
               <option value="410">410</option>
            </select> */}
      
         {/* <table><tr><Link to={'/doctors/create'}><tr>Crear prestador</tr></Link></tr></table> */}

         {/* <table className='table table-sm table-dark'>
            
            <thead className='tabla'>
               <tr className="table-success">
               
               <th className='datos'>
                  Nombre
               </th>
               <th className='datos'>
                  Apellido
               </th>
               <th className='datos'>
                  Especialidad
               </th>
               <th className='datos'>
                  Dirección
               </th>
            </tr>
               </thead> 
               <tbody>    
            


            


            {medicos.map((medico)=>
            <tr key={medico.id}>
               <td className='datos'>{(medico.name)[0].toUpperCase()+(medico.name).slice(1)}</td>
               <td className='datos'>{(medico.lastname)[0].toUpperCase()+(medico.lastname).slice(1)}</td>
               <td className='datos'>{(medico.specialty)[0].toUpperCase()+(medico.specialty).slice(1)}</td>
               <td className='datos'>{(medico.street)[0].toUpperCase()+(medico.street).slice(1)}</td>
               <td className='datos'>{medico.number}</td>
               <td className='datos'>{(medico.city)[0].toUpperCase()+(medico.city).slice(1)}</td>
               <td><img src={medico.url} alt="imagen_perfil" /></td> */}
               {/*<td>{medico.address.street} {medico.address.number } {medico.address.city }</td>*/} 
               {/* </tr> )}  */}
            {/*  <td><img src={pic.url} alt="imagen_perfil" /></td> */}
            {/* porque si no agrego el () de los argumentos de la funcion, la misma se ejecuta de una? */}
            
         
            
            
{/*             
            </tbody>
         </table> */}
      
         
      </div>
      <Singout/>
    
   </div> 



   // <div>
   //    <Singout/>
   //    <div>
   //       <h3>Visualizador de Prestadores</h3>
   //       <h4>Usted se encuentra en el plan {plan}, para realizar otra busqueda diríjase a <Link to={'/search'}>Nueva búsqueda</Link></h4>
         
   //          {/* <select onChange={(e)=>setplan(e.target.value)}>
   //             <option value="210">210</option>
   //             <option value="310">310</option>
   //             <option value="410">410</option>
   //          </select> */}
   //    </div>
   //    <div>
         
   //       {/* <table><tr><Link to={'/doctors/create'}><tr>Crear prestador</tr></Link></tr></table> */}


   //       <table>
            
   //          <thead>
   //             <tr>
               
   //             <th>
   //                Nombre
   //             </th>
   //             <th>
   //                Apellido
   //             </th>
   //             <th>
   //                Especialidad
   //             </th>
   //             <th>
   //                Dirección
   //             </th>
   //          </tr>
   //             </thead> 
   //             <tbody>    
            


            


   //          {medicos.map((medico)=><tr key={medico.id}><td>{medico.name}</td><td>{medico.lastname}</td><td>{medico.specialty}</td><td>{medico.street}</td><td>{medico.number}</td><td>{medico.city}</td><td><img src={medico.url} alt="imagen_perfil" /></td>{/*<td>{medico.address.street} {medico.address.number } {medico.address.city }</td>*/} </tr> )} 
   //          {/*  <td><img src={pic.url} alt="imagen_perfil" /></td> */}
   //          {/* porque si no agrego el () de los argumentos de la funcion, la misma se ejecuta de una? */}
            
         
            
            
            
   //          </tbody>
   //       </table>
      
         
   //    </div>
    
    
   // </div> 
      )

   }