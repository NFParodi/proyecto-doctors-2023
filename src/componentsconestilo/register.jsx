
import {Singout} from './singout'
import {useNavigate, Link} from 'react-router-dom'
import {auth} from '../firebase/conexion'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect,useState } from 'react'
import {bd, storage} from '../firebase/conexion'
import {collection,doc,getDoc,getDocs,deleteDoc,setDoc,addDoc} from 'firebase/firestore'
import 'bootstrap'
import { getStorage ,ref, getBytes, getDownloadURL,uploadBytes} from "firebase/storage";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {v4} from 'uuid'
import { onAuthStateChanged } from "firebase/auth";
import { async } from '@firebase/util';
import "../css/register.css"



export const Register = ()=>{
    const [visibilidad, setvisibilidad] = useState( false)
    const [visible, setvisible] = useState( 'none')
    const [registrando, setregistrando] = useState(false)
    const navigate = useNavigate();
    const [password,setpass] = useState('')
    const [email, setmail] = useState('')
    const [name, setname] = useState('');
    const [lastname, setlastname] = useState('');
    const [rol,setrol] = useState('usuario')
    const [archivo, setarchivo] = useState(''); //Elarchivo no me importa porque lo voy a referenciar mediante una url
    const [url,seturl] = useState('')
    

    //funcion generacion URL foto
    const upload =async(archivo)=>{
        const StorageReference = ref(storage,v4())  //lugar donde se encuentran las imagenes //v4 me genera un ID 
        console.log('PROPIEDADES DE LA IMAGEN',uploadBytes(StorageReference, archivo));
        await (uploadBytes(StorageReference, archivo))
        const url = await getDownloadURL(StorageReference) 
        console.log('LA URL DE LA IMAGEN ES:' ,url);
        seturl(url)
        return  url
        }



    // const usuarios = collection(bd,'users');

    //funcion de registro de usuario (uuid y mail) y creacion db usuarios (datos personales + uid) 
    const userRegister = async(e)=>{
        try {
            const userData = await createUserWithEmailAndPassword(auth,email,password).then((FireBaseUser)=>{return FireBaseUser}) //esta es una funciona que me devuelve la info del usuario
            // navigate('/')
            console.log('ROL DESDE REGISTER',rol);
            console.log('RECIBIDO DESDE REGISTER', userData.user.uid); //aqui extraigo el id unico para despues crear el usuario en mi bd
            await setDoc(doc(bd,'users',`${userData.user.uid}`),{  //aca lo de la izquierda es la clave lo de la derecha el valor que voy a pasar medianyte el input
                name: name,
                lastname: lastname,
                email: email,
                rol:rol,
                url: await upload(archivo),
                });
                navigate('/search')

          
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
            console.log('Error al crear el usuario');
        }
    }


        //funcion login
    const userLogin = async()=>{
        try {
            await signInWithEmailAndPassword(auth,email,password)
            console.log('INGRESO CORRECTO');
            navigate('/search')
                               
        } catch (error) {
           const errorCode = error.code;
           const errorMessage = error.message;
           console.log(errorCode,errorMessage);
            console.log('Error al acceder, mail o cotraseña incorrecto');            
        }
    }


    

    const createUser =async(e)=>{
        e.preventDefault();
        

            if (registrando){
                // setvisible('text')
                //funcion para registrar
                
                console.log('VISIBLE?',visible);
                await userRegister();   
                console.log('LLAMO REGISTRADO');
                

            }else{
                 //funcion para loguear
                
                await userLogin();    //ME FALTABA EL PUTO AWAIT
                console.log('LLAMO LOGIN')
                
            }                  
    }
    
         const cambioFormulario = (e)=>{
            setregistrando(!registrando)
            setvisibilidad(!visibilidad)
            visibilidad? setvisible('none'): setvisible('')
                console.log('VISIBLE', visible);
         }

return(

    <div className='login'>

    <h1>{registrando ? 'Registro':'Inicio de sesión'}</h1>

    <form  onSubmit={createUser}>
 
        <div style={{display:visible}} >    
            <input placeholder='Ingrese nombre' type='text' value = {name} onChange = {(e)=>setname(e.target.value.toLocaleLowerCase())} />
        </div>
        <div  style={{display:visible}}>    
            <input placeholder='Ingrese apellido' type='text' value = {lastname} onChange = {(e)=>setlastname(e.target.value.toLocaleLowerCase())} />
        </div>
        <div className='check'>
            <input placeholder="Ingrese su email" type='text' value = {email} onChange = {(e)=>setmail(e.target.value.toLocaleLowerCase())} />
             <input type="password" placeholder="Ingrese una contraseña"  onChange={(e)=>setpass(e.target.value)}/>
        </div>
        <div style={{display:visible}}>    
            <label className='rol'> Ingrese Rol:</label>
            <select className="btn"onChange={(e)=>setrol(e.target.value)}>
            <option value="user" selected>usuario</option>
            <option value="admin">administrador</option>
            </select>
        </div>

        <div style={{display:visible}}>
            <label className='archivo'> Ingrese archivo:</label>
            <input className='file' type="file"  onChange={(e)=>setarchivo(e.target.files[0])}/> {/*aqui hago qe cambie el estado para despues cargar el nuevo estado en una funcion que se ejecute cuando haga submit*/}
        </div>

        <button className="btn" type='submit'>{registrando ? 'Registrarme':'Iniciar sesión'}</button> 
    </form>

    <button className="btn registro" onClick={()=>cambioFormulario()/*setregistrando(!registrando)*/}>{registrando ? 'Ya tengo cuenta':'Quiero registrarme'}</button>

    </div>

);


}

   