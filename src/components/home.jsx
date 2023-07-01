import {Singout} from './singout'
import {Grid} from './DocGrid'
import {Search} from './search'

export const Home = ({})=>{


    return(
        <div>
        <Singout/>
        <h1>Estas en home</h1>
        {/* {user.rol=='admin'?<Grid/>:<Search>} */}
        </div>
        
    )

}