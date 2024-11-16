import { useEffect, useState } from "react";
import metamask from "../assets/MetaMask-Logo.png";
import Transactions from "../components/Transactions";
import axios from "../axiosConfig";

export default function Tab1() {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get("/project/")
      .then((response) => {
        setProjectData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, []);

  return (
    <div className="bg-gray-800 text-stone-300 -mt-1 px-6 md:px-12">
      <div
        className="flex flex-col md:flex-row items-center justify-evenly py-4
      lg:pt-16 md:gap-8"
      >
        <div className="pb-5 md:pb-0 text-center">
          <h1 className="text-2xl md:text-5xl md:w-full pb-1 md:pb-3 font-bold ">
            {projectData.title}
          </h1>
          <p className="text-lg md:text-2xl md:w-full">
            {projectData.description}
          </p>
        </div>
        <img
          src="https://placehold.co/600x400/gray/FFF"
          className="rounded-xl max-w-xs drop-shadow-xl shadow-lg shadow-gray-700
        h-full lg:max-w-sm"
          alt=""
        />
      </div>
      <div
        className="text-2xl space-y-2 py-8 flex flex-col
      md:flex-row md:flex-wrap md:items-center md:space-y-0 md:gap-4 md:justify-center md:text-5xl md:py-16"
      >
        <Transactions/>
        {
          //Imagen de tokens que tendrá renderizado condicional según la etapa del proyecto
        }
      </div>
      <div
        className="text-3xl gap-4 py-8 flex justify-center items-center
      md:py-16 md:gap-6"
      >
        <p className="mb-1">View in</p>
        <a
          href="#"
          className="w-2/5 rounded-lg bg-gray-100 py-0 px-8 cursor-pointer
          shadow-lg shadow-gray-700 drop-shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-500
          md:px-12 max-w-xs"
        >
          <img
            src={metamask}
            alt="metamask-logo"
            className="w-full max-w-56 mx-auto "
          />
        </a>
      </div>
      <div className="py-8 space-y-4 md:space-y-6 md:py-16">
        <h1 className="text-3xl md:text-4xl">Important Note on Metamask</h1>
        <p className="text-lg md:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aperiam
          id quibusdam deleniti distinctio veniam quaerat natus harum obcaecati
          dolorem magni, facilis explicabo temporibus deserunt quae commodi
          repudiandae voluptate fugit! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Dolorem labore rem, aliquam, repellat accusantium
          neque perferendis possimus, architecto porro sapiente dolores!
          Explicabo minima praesentium fugiat saepe magnam, ea quas accusantium?
        </p>
      </div>
    </div>
  );
}
