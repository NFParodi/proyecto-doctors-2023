
import {Link,useNavigate} from 'react-router-dom'
import "../css/notFound.css"

export const Notfound = ()=>{

    return(<div className='notFound'>  <h1>PAGINA NO ENCONTRADA, vuelve a <Link className='home' to={'/'}>Home</Link></h1>  </div> )


}