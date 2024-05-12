import React, {useEffect} from "react"
import { useStateContext } from "../../contexts/ContextProvider"

const useRole = () => {

    let user = {}

	const _user = localStorage.getItem("USER")
	if (_user) {
		user = JSON.parse(_user)
	}
	if (user) {
		return user.role
	}
}

const url = import.meta.env.VITE_DOMAIN_DB;
const token = localStorage.getItem("TOKEN");

const WithPermission = (props) => {

    const { userToken, setCurrentUser, currentUser } =
    useStateContext();
    useEffect(() => {
        const fetchUserData = async () => {
        try {
            if (!userToken) {
            // Manejar la situación en la que no hay token disponible
            console.error("No hay token disponible");
            return;
            }

            // Realiza la solicitud GET a la ruta '/me' incluyendo el token en el encabezado de Authorization
            const response = await fetch(`${url}/api/yo`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69420",
                Authorization: `Bearer ${token}`,
                // Puedes incluir otros encabezados según sea necesario
            },
            // Puedes incluir otras opciones de configuración según tus necesidades
            });

            if (!response.ok) {
            throw new Error("Error al obtener datos del servidor");
            }

            // Parsea la respuesta como JSON
            const data = await response.json();

            // Actualiza el estado del usuario con los datos recibidos
            setCurrentUser(data.user);
        } catch (error) {
            console.error(error);
            // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
        }
        };

        // Llama a la función para obtener y establecer los datos del usuario
        fetchUserData();
    }, []);

	const {roleRequired, children} = props
	const role = useRole()
    // if (currentUser.rol != role ) {
    //     history.back()
    // }
	return (
		// <>{currentUser.rol != role ? 
        //     (roleRequired === role ? 
        //     children : 
        //     <h3>No tiene permisos</h3>) : 
        //     (history.back()) }</> 
        <>{currentUser.rol == role && roleRequired == role ? 
            children : 
            <h3>No tiene permisos</h3>}</> 
	)
}

export default WithPermission