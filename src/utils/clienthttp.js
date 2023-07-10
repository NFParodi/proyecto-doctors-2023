
const URL = 'https://betterdoctor.p.rapidapi.com/api.betterdoctor.com/2016-03-01'

const credenciales = {

    
	headers: {
		Authorization:'Bearer 29259c93ffmshac0dfba5f4475f9p1a4770jsn42ad21cfe71f',
		'Content-Type': 'application/json;charset=utf-8',
        'X-RapidAPI-Host': 'betterdoctor.p.rapidapi.com'
	}

  };


export const get = ()=>{

    return(
        fetch(URL, credenciales).then(response=>response.json())
    )



}