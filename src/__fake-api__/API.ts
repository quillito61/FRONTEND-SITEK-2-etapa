import axios from "axios";

//const  API = axios.create({baseURL: 'https://api-gessa.jojodev.app/api/'});


// Esta conexion se usa para conectarse al api localhost

const  API = axios.create({baseURL: 'http://186.15.89.24:8098/api/'});

//_____________________________________________________________________________________________

// Esta conexion se usa para conectarse al servidor de produccion   

//const  API = axios.create({baseURL: 'https://api.conexiongessa.com:9444/api/'});

export default API;
