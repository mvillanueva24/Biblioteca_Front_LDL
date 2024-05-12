import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import Libros from "./components/libros/Libros";
import Reservas from "./components/reservas/Reservas";
import {
  LuBook,
  LuMusic,
  LuCalendarDays,
  LuCalendarClock,
} from "react-icons/lu";
import { Outlet, useNavigation } from "react-router-dom";

import { RotatingLines } from "react-loader-spinner";
import WithPermission from "./withPermissions.jsx";

function index() {
  // const { currentUser, userToken, setCurrentUser } =
  //   useStateContext();
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       if (!userToken) {
  //         // Manejar la situación en la que no hay token disponible
  //         console.error("No hay token disponible");
  //         return;
  //       }

  //       // Realiza la solicitud GET a la ruta '/me' incluyendo el token en el encabezado de Authorization
  //       const response = await fetch(`${url}/api/yo`, {
  //         method: "GET",
  //         headers: {
  //           "ngrok-skip-browser-warning": "69420",
  //           Authorization: `Bearer ${token}`,
  //           // Puedes incluir otros encabezados según sea necesario
  //         },
  //         // Puedes incluir otras opciones de configuración según tus necesidades
  //       });

  //       if (!response.ok) {
  //         throw new Error("Error al obtener datos del servidor");
  //       }

  //       // Parsea la respuesta como JSON
  //       const data = await response.json();

  //       // Actualiza el estado del usuario con los datos recibidos
  //       setCurrentUser(data.user);
  //     } catch (error) {
  //       console.error(error);
  //       // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
  //     }
  //   };

  //   // Llama a la función para obtener y establecer los datos del usuario
  //   fetchUserData();
  // }, []);
  const domain_url = import.meta.env.VITE_DOMAIN_DB;
  const subMenusEntregas = [
    { text: "No entregados", icon: "LuBook", path: "no-entregado" },
    { nombre: "Entregados", icon: "LuBook", path: "entregado" },
    { nombre: "Devueltos", icon: "LuMusic", path: "devuelto" },
  ];

  // const user = localStorage.getItem("USER");

  // if (currentUser.rol != user ) {
  //   history.back()
  // }
  const { state } = useNavigation();

  return (
    <WithPermission roleRequired="Admin">
    <div>
      {/* <Navbar /> */}

      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<LuMusic size={27} />}
            text="Asignaturas"
            path="/admin/asignaturas"
          />
          <SidebarItem
            icon={<LuBook size={27} />}
            text="Libros"
            path="/admin/libros"
          />
          <SidebarItem
            icon={<LuCalendarClock size={27} />}
            text="Reservas"
            path="/admin/reservas"
          />
          <SidebarItem
            icon={<LuCalendarDays size={27} />}
            text="Entregas"
            name="entregas"
            path={null}
            items={[
              {
                text: "No Entregado",
                path: "entregas/no-entregado",
                icon: "LuCalendarX",
              },
              {
                text: "Entregado",
                path: "entregas/entregado",
                icon: "LuBookOpen",
              },
              {
                text: "Devuelto",
                path: "entregas/devuelto",
                icon: "LuBookOpenCheck",
              },
            ]}
          />
        </Sidebar>
        
        <div className="w-full p-10 px-24">
          {state == "loading" ? (
            <div className="h-full flex content-center justify-center">
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <Outlet />
          )}
        </div>

      </div>
    </div>
    </WithPermission>
  );
}

export default index;
