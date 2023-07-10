import { async } from "@firebase/util";
import { signOut } from "firebase/auth"
import {auth} from '../firebase/conexion'
import {useNavigate} from 'react-router-dom'

export const Singout = ()=>{

    const navigate = useNavigate();
    const out=async()=>{
        try {
             await signOut(auth)
             console.log('logout exitoso');
             navigate('/')
            // Sign-out successful.

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
            console.log('Error al salir'); 
        }    
           
         

        }


    return(
        <div className="imagen" style={{marginRight:25}}>
            <button className="btn registro" onClick={out}>Salir</button>
        </div>
    )    


    }