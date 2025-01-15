import { useEffect, useState } from "react";
import { ethers } from "ethers";
import metamask from "../assets/MetaMask-Logo.png";
import Transactions from "../components/Transactions";
import axios from "../axiosConfig";

export default function Balance() {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null); // Store connected account
  const contractAddress = "0xb6E5765385713366d687Ad01e83DbB21A24b4Eb0";


  useEffect(() => {
    axios
      .get("/project/")
      .then((response) => {
        setProjectData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
        setError("Failed to fetch project data. Please try again later.");
      });
  }, []);

  // Function to handle MetaMask connection
  const connectToMetaMask = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed. Please install MetaMask to proceed.");
      return;
    }

    try {
      // Request account access
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      // Check if connected to Sepolia
      const { chainId } = await provider.getNetwork();
      if (chainId !== 11155111) {
        alert("Please switch to the Sepolia testnet in MetaMask.");
        return;
      }

      console.log("Connected account:", address);
      console.log("Connected to Sepolia network");

      // Optionally interact with the contract
      const contract = new ethers.Contract(
        contractAddress,
        [
          // Add ABI of the contract here
        ],
        signer
      );

      // Example interaction
      // const result = await contract.someFunction();
      // console.log("Contract call result:", result);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <div className="bg-gray-800 text-stone-300 -mt-1 px-6 md:px-12">
        {error && <p className="text-red-500 text-center">{error}</p>}
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

      <div className="text-3xl gap-4 py-8 flex justify-center items-center md:py-16 md:gap-6">
        <p className="mb-1">View in</p>
        <button
          onClick={connectToMetaMask}
          className="w-2/5 rounded-lg bg-gray-100 py-0 px-8 cursor-pointer shadow-lg shadow-gray-700 drop-shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-500 md:px-12 max-w-xs"
        >
          <img
            src={metamask}
            alt="MetaMask logo"
            className="w-full max-w-56 mx-auto"
          />
        </button>
      </div>
      {account && (
        <div className="text-center py-4">
          <p>Connected Account: {account}</p>
        </div>
      )}
      <div className="py-8 space-y-4 md:space-y-6 md:py-16">
        <h1 className="text-3xl md:text-4xl">Important Note on MetaMask</h1>
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