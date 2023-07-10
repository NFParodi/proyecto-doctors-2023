import { useEffect,useState } from 'react'
import {bd, storage} from '../firebase/conexion'
import {collection,doc,getDoc,getDocs,deleteDoc,setDoc,addDoc} from 'firebase/firestore'
import 'bootstrap'
import { getStorage ,ref, getBytes, getDownloadURL,uploadBytes} from "firebase/storage";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useNavigate} from 'react-router-dom'
import {v4} from 'uuid'
import "../css/register.css"


export const Create =()=>{


    const [plan,setplan] = useState('210')
    const [name, setname] = useState('');
    const [lastname, setlastname] = useState('');
    const [specialty, setspecialty] = useState('');
    // const [nombrearchivo, setnombrearchivo] = useState('');
    const [archivo, setarchivo] = useState(''); //Elarchivo no me importa porque lo voy a referenciar mediante una url
    // const [address, setaddress] = useState( {});
    const [street, setstreet] = useState('')
    const [number, setnumber] = useState('')
    const [city, setcity] = useState('')
    const [url,seturl] = useState('')
    
    const navigate = useNavigate();
   
    
    
    const upload =async(archivo)=>{
        const StorageReference = ref(storage,v4())  //lugar donde se encuentran las imagenes //v4 me genera un ID 
        console.log('PROPIEDADES DEL ARCHIVO',uploadBytes(StorageReference, archivo));
        await (uploadBytes(StorageReference, archivo))
        const url = await getDownloadURL(StorageReference) 
        console.log('LA URL DE LA IMAGEN ES:' ,url);
        seturl(url)
        return  url
        }

    // const geturl =async(archivo)=>{
    //         const StorageReference = ref(storage)  //lugar donde se encuentran las imagenes //v4 me genera un ID
    //         // const archivopath = StorageReference.child(archivo.name)  //conexion a las imagenes 
            
            
            
           
            
    //         }

    
  
    const doctores = collection(bd,plan);

    const createdoctor = async (e)=>{
        e.preventDefault(); //esto lo pongo para que el formulario no envie los datos ya que no es neceario porque se ejecuta una funcion que impacta en la BD
        // setaddress(e)
        await addDoc(doctores,{  //aca lo de la izquierda es la clave lo de la derecha el valor que voy a pasar medianyte el input
            name: name,
            lastname: lastname,
            specialty: specialty,
            // // archivo:archivo,
            // address: address,
            street: street,
            city:city,
            number:number,
            url: await upload(archivo),
        });
        
        // upload(archivo)
        navigate('/doctors');
      };


return(

    <form onSubmit={createdoctor}>

        <div>
        <label className="prestacion">Elija en que plan agregar prestador:</label>
        <select className="btn" onChange={(e)=>setplan(e.target.value)}>
            <option value="210">210</option>
            <option value="310">310</option>
            <option value="410">410</option>
            </select>
        </div>
        <div>    
            <label> </label>
            <input placeholder='Ingrese nombre' type='text' value = {name} onChange = {(e)=>setname(e.target.value.toLocaleLowerCase())} />
        </div>
        <div>    
            <label> </label>
            <input placeholder="Ingrese apellido" type='text' value = {lastname} onChange = {(e)=>setlastname(e.target.value.toLocaleLowerCase())} />
        </div>
        <div>    
            <label> </label>
            <input placeholder='Ingrese especialidad' type='text' value = {specialty} onChange = {(e)=>setspecialty(e.target.value.toLocaleLowerCase())} />
        </div>
        <div >    
            <label> </label>
        <div>
            <input placeholder='Ingrese dirección (calle)' type='text'value = {street} onChange = {(e)=>setstreet(e.target.value)} />
            <input placeholder='Ingrese numeración' type='text'value = {number} onChange = {(e)=>setnumber(e.target.value)} />
            <input placeholder='Ingrese ciudad'type='text' value = {city}  onChange = {(e)=>setcity(e.target.value)}/>
            
        </div>
        </div>
        {/* <div>
            <label> Ingrese nombre archivo:</label>
            <input type="text" value={nombrearchivo} onChange={(e)=>setnombrearchivo(e.target.value)}/>
        </div> */}
        <div className='especialista'>
            <label className="archivo"> Ingrese archivo:</label>
            <input className='file' type="file"  onChange={(e)=>setarchivo(e.target.files[0])}/> {/*aqui hago qe cambie el estado para despues cargar el nuevo estado en una funcion que se ejecute cuando haga submit*/}
        </div>
{/* setarchivo(e.target.files[0]) */}
        <button className="btn registro" type='submit'>Crear prestador</button>
    </form>

);


}