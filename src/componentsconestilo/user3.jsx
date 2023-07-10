import {useState, useEffect} from 'react'
import {auth,bd} from '../firebase/conexion'
import {Home} from './home'
import {Register} from './register'
import { onAuthStateChanged } from "firebase/auth";
// import {bd}from '../firebase/conexion'
import {getDoc,doc} from 'firebase/firestore'
import { async } from '@firebase/util';
import {useNavigate} from 'react-router-dom'



export const UserLoged = ()=>{


    

    // const recibirRol = async(id)=>{

    //     console.log('ID DESDE RECIBIR ROL', id);
    //     const ref = doc(bd,'users',id)
    //     const usuDoc = await getDoc(ref)
    //     const rol = await usuDoc.data().rol
    //     console.log('ROLAn',rol);
    //     return rol
    // }
   

    const [user, setuser] = useState(null)  //Existe usuario?

    useEffect(()=>{getuser()},[user])

    const getuser = ()=>{

    onAuthStateChanged(auth, (FireBaseUser) => {
        if (FireBaseUser) {
            if(!user){
                
                setuser({id:FireBaseUser.uid,
                    mail: FireBaseUser.email,
                    
                    
             }) 

        //    const rols = setTimeout(() => {recibirRol(FireBaseUser.uid)  }, 10000);
        //    setuser({id:FireBaseUser.uid,
        //              mail: FireBaseUser.email,
        //              rol: rols,})
                // then(rol=>setuser({id:FireBaseUser.uid,
                //                             mail: FireBaseUser.email,
                //                             rol: rol,
                                            
                //                     }) 
                // ,console.log('ROL DESDE REC TIME',user.rol))
                                    
                //                 }, 10000);

                    
                    
            console.log('EL USUARIO ESTA LOGUEADO', /*'INFORMACION DE USUARIO DESDE USER', FireBaseUser*/);
            // navigate('/home')
        }
        } else {
            console.log('EL USUARIO ESTA DESLOGUEADO');
            setuser(null)
            // navigate('/')
            
        }

        console.log('LA INFO DEL USUARIO ES:',user);
        });
   

       

    }
    return(

        <div><Register/></div>
       
    )

}

