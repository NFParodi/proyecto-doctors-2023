import {bd} from'../firebase/conexion'
import {collection,doc,getDoc,getDocs,deleteDoc,updateDoc} from 'firebase/firestore'
import { useState,useEffect } from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {storage} from '../firebase/conexion'
import {ref, getDownloadURL,uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'

export const Edit = ()=>{

    const {id} = useParams();
    

    const [plan, setplan] = useState('210')
    const [name,setname]=useState('')
    const [lastname,setlastname]=useState('')
    const [specialty,setspecialty]=useState('')
    // const [address,setaddress]=useState('')
    const [archivo,setarchivo] = useState('')
    const [url,seturl] = useState('')
    // const [file,setfile] = useState('')
    const [street, setstreet] = useState('')
    const [number, setnumber] = useState('')
    const [city, setcity] = useState('')


    const selectDoc = async(id)=>{
        
        
        console.log('IDDDD',id,'PLAN',plan);
        const document = await getDoc(doc(bd, plan, id));


        if (document.exists()) {
            setname(document.data().name)
            setlastname(document.data().lastname)
            setspecialty(document.data().specialty)
            setstreet(document.data().street)
            setnumber(document.data().number)
            setcity(document.data().city)
            // setarchivo(document.data().archivo) //no tengo archivo dentro de la bd doctors
            seturl(document.data().url)

            // setaddress(document.data().address)
            console.log("Document data:", document.data());
          } else {
            // document.data() will be undefined in this case
            console.log("No such document!");
            navigate('/pagenotfound')
          }
          

          //buscar imagen en el bucket


       

        console.log('LOS DATOS SON:', document.data());
        
    }
        const navigate = useNavigate();
        
        const update =async(e)=>{
            e.preventDefault();
            updateDoc(doc(bd,plan,id),{
                 //aca lo de la izquierda es la clave lo de la derecha el valor que voy a pasar medianyte el input
                    name: name,
                    lastname: lastname,
                    specialty: specialty,
                    street: street,
                    city:city,
                    number:number,
                    url: await upload(archivo),
                    // address: address
        
                
            })
    
    navigate('/doctors')
    }


    
     useEffect(()=>{selectDoc(id)},[])  //no olvidarse del parametro!!!



     const upload =async(archivo)=>{
        const StorageReference = ref(storage,v4())  //lugar donde se encuentran las imagenes //v4 me genera un ID 
        // console.log('PROPIEDADES DEL ARCHIVO',uploadBytes(StorageReference, archivo));
        await (uploadBytes(StorageReference, archivo))
        const url = await getDownloadURL(StorageReference) 
        console.log('LA URL DE LA IMAGEN ES:' ,url);
        // seturl(url)
        return  url
        }
  
   

    return(
        

        
        <form onSubmit={update}>

        {/* <div>
            <label>Elija de que plan editar el prestador:</label>
            <select onChange={(e)=>setplan(e.target.value)}>
                <option value="210">210</option>
                <option value="310">310</option>
                <option value="410">410</option>
            </select>
        </div> */}

            <div>    
                
                <input placeholder="Nombre" type='text' value = {name} onChange = {(e)=>setname(e.target.value).toLocaleLowerCase()} />
            </div>
            <div>    
                
                <input placeholder="Apellido" type='text' value = {lastname} onChange = {(e)=>setlastname(e.target.value.toLocaleLowerCase())} />
            </div>
            <div>    
                
                <input placeholder="Especialidad"type='text' value = {specialty} onChange = {(e)=>setspecialty(e.target.value.toLocaleLowerCase())} />
            </div>
            <div>    
                
                <input placeholder="direccion: calle"type='text'value = {street} onChange = {(e)=>setstreet(e.target.value.toLocaleLowerCase())} />
                <input placeholder="direccion: número"type='text'value = {number} onChange = {(e)=>setnumber(e.target.value)} />
                <input placeholder="direccion: ciudad" type='text' value = {city}  onChange = {(e)=>setcity(e.target.value.toLocaleLowerCase())}/>
            </div>

            <div>
                <img src={url} alt="imagen_perfil" />
                <input type="file" velue = {archivo}   onChange={(e)=>setarchivo(e.target.files[0])}/> {/*aqui hago qe cambie el estado para despues cargar el nuevo estado en una funcion que se ejecute cuando haga submit*/}
            </div>

            <button className="btn" type='submit'>Editar prestador</button>
        </form>
    
    )


}