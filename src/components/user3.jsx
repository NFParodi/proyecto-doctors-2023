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

    //Esta registrado?

    // const registrated = async(mail,constraseña)=>{

    //     console.log('ID DESDE RECIBIR ROL', id);
    //     const ref = doc(bd,'users',id)
    //     const usuDoc = await getDoc(ref)
    //     const rol = await usuDoc.data().rol
    //     console.log('ROLAn',rol);
    //     return rol
    // }

   
    const navigate = useNavigate()
    const [user, setuser] = useState(null)  //Esta logueado el usuario?
    const [rol, setrol] = useState('')
    const [regis,setregis] = useState(true)

    useEffect(()=>{getuser()},[user])

    const getuser = ()=>{

    onAuthStateChanged(auth, (FireBaseUser) => {
        console.log('FIREBASSE USER ANTES DEL IF', FireBaseUser);
        if (FireBaseUser) {
             if(!user){
                // console.log('EJECUTADO DESDE !USER');
                //     if(regis==true)    {
                        
                        setuser({id:FireBaseUser.uid,
                            mail: FireBaseUser.email,
                            // rol:rol, 
                        })
                            // setregis(!regis)
                        //  }else{
                            // recibirRol(FireBaseUser.uid).then(rol=>{setrol(rol)})
                                //  setuser({id:FireBaseUser.uid,
                                        // mail: FireBaseUser.email,
                                        // rol:rol, })
                                        navigate('/search')
                         } 
                    // }
            
            
            //  else if (!user){
            //     console.log('EJECUTADO DESDE USER, EL USUARIO RECIEN SE REGISTRA');
            //     setuser({id:FireBaseUser.uid,
            //          mail: FireBaseUser.email,
                     
            //     })


            // }







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
            console.log('LA INFO DEL USUARIO LOGUEADO ES:',user);
            
        // } else {
            // console.log('LA INFO DEL USUARIO YA REGISTRADO ES:', user);
        // }
        // navigate('/search')
        } else {
            console.log('EL USUARIO ESTA DESLOGUEADO');
            setuser(null)
            navigate('/')
            
        }

        console.log('LA INFO DEL USUARIO ES:',user);
        });
   

       

    }
    return(

        <div><Register/></div>
       
    )

}

