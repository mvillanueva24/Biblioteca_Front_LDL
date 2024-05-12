import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../scenes/header";

export default function NotFound() {
  return (
    <div className="relative">
      <Header />
      <section class="bg-gray-50 h-[screen -60px]">
        <div class="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto lg:py-10">
        <h3
          class="flex items-center mb-6 text-[4rem] font-semibold text-gray-900 "
        >
          Página no encontrada
        </h3>
        <Link
                to="/asignaturas"
                className="py-2 px-3 bg-[#3386c3] hover:bg-[#236aa6] text-white text-xl
                  hover:text-white rounded transition duration-300 shadow"
              >
                Volver a la página de inicio
              </Link>
        </div>
      </section>
    </div>
  );
}
