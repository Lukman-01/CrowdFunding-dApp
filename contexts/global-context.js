// import { createContext, useContext, useMemo, useState, useEffect } from "react";
// import {
//   useAddress,
//   useContract,
//   useMetamask,
//   useContractWrite,
// } from "@thirdweb-dev/react";
// import { ContractAddr } from "@/constants";
// import { ethers } from "ethers";
// import ErrorSnackbar from "@/components/error-snackbar";
// import { useRouter } from "next/router";

// const GlobalContext = createContext();

// export default function GlobalProvider({ children }) {
//   const { contract } = useContract(ContractAddr);
//   const [loading, setLoading] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMsg, setAlertMsg] = useState("");
//   const [walletConnected, setWalletConnected] = useState(false);
//   const router = useRouter();
//   const { mutateAsync: createProject } = useContractWrite(
//     contract,
//     "createProject"
//   );
//   const address = useAddress();
//   const connect = useMetamask();

//   const publishProject = async (form) => {
//     try {
//       const data = await createProject([
//         address,
//         form.title,
//         form.desc,
//         form.target,
//         new Date(form.deadline).getTime(),
//         form.image,
//       ]);

//       console.log("contract call success", data);
//     } catch (error) {
//       console.log("contract call failure", error);
//     }
//   };

//   const getProjects = async () => {
//     const projects = await contract.call("getProjects");

//     const parsedProjects = projects.map((project, i) => ({
//       owner: project.owner,
//       title: project.title,
//       desc: project.desc,
//       target: ethers.utils.formatEther(project.target.toString()),
//       deadline: project.deadline.toNumber(),
//       amountCollected: ethers.utils.formatEther(
//         project.amountCollected.toString()
//       ),
//       image: project.image,
//       pId: i,
//     }));

//     return parsedProjects.reverse();
//   };

//   const getUserProjects = async () => {
//     const allProjects = await getProjects();

//     const filteredProjects = allProjects.filter(
//       (project) => project.owner === address
//     );

//     return filteredProjects;
//   };

//   const donate = async (pId, amount) => {
//     const data = await contract.call("donateToProject", pId, {
//       value: ethers.utils.parseEther(amount),
//     });

//     return data;
//   };

//   const getDonations = async (pId) => {
//     const donations = await contract.call("getDonators", pId);
//     const numberOfDonations = donations[0].length;

//     const parsedDonations = [];

//     for (let i = 0; i < numberOfDonations; i++) {
//       parsedDonations.push({
//         donator: donations[0][i],
//         donation: ethers.utils.formatEther(donations[1][i].toString()),
//       });
//     }

//     return parsedDonations;
//   };

//   const connectWallet = async () => {
//     if (window.ethereum === undefined) {
//       console.error("No ethereum object found");
//       setAlertMsg("No Ethereum provider found! Please install a wallet extension like MetaMask or use a browser like Brave and set up a wallet.");
//       setShowAlert(true);
//       if (router.pathname !== "/") router.push("/");
//       return;
//     }
//     setLoading(true);

//     try {
//       const connectData = await connect();
//       if (connectData && connectData.data) {
//         setWalletConnected(true);
//         setTimeout(async () => {
//           const provider = new ethers.providers.Web3Provider(window.ethereum);
//           const network = await provider.getNetwork();
//           console.log("Current network chain ID:", network.chainId);
//           if (network.chainId !== 11155111) {
//             setAlertMsg("Please change to Sepolia network and refresh.");
//             setShowAlert(true);
//           } else {
//             setShowAlert(false);
//           }
//         }, 1000);
//       }
//       setLoading(false);
//     } catch (err) {
//       console.error("Connection error:", err.message);
//       setAlertMsg(`Error: ${err.message}`);
//       setShowAlert(true);
//       setLoading(false);
//     }
//   };

//   const globalValues = useMemo(() => {
//     return {
//       loading,
//       setLoading,
//       address,
//       contract,
//       createProject: publishProject,
//       getProjects,
//       getUserProjects,
//       getDonations,
//       donate,
//       connectWallet,
//       showAlert,
//       setShowAlert,
//       alertMsg,
//       setAlertMsg,
//       walletConnected,
//     };
//   }, [loading, address, showAlert, alertMsg, contract]);

//   useEffect(() => {
//     connectWallet();
//   }, [router.pathname]);

//   return (
//     <GlobalContext.Provider value={globalValues}>
//       <ErrorSnackbar />
//       {children}
//     </GlobalContext.Provider>
//   );
// }

// export function useGlobalContext() {
//   return useContext(GlobalContext);
// }


import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
//import ErrorSnackbar from '@/components/ErrorSnackbar';
import { useRouter } from 'next/router';
import { ABI, ContractAddr } from '@/constants';

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [walletConnected, setWalletConnected] = useState(false);
    const router = useRouter();

    const connectWallet = async () => {
        if (!window.ethereum) {
            setAlertMsg("Please install MetaMask!");
            setShowAlert(true);
            return;
        }

        try {
            const providerTemp = new ethers.providers.Web3Provider(window.ethereum);
            await providerTemp.send("eth_requestAccounts", []);
            setProvider(providerTemp);
            const signer = providerTemp.getSigner();
            const contractTemp = new ethers.Contract(ContractAddr, ABI, signer);
            setContract(contractTemp);
            setWalletConnected(true);
        } catch (error) {
            console.error("Error connecting to MetaMask", error);
            setAlertMsg("Failed to connect MetaMask: " + error.message);
            setShowAlert(true);
        }
    };

    useEffect(() => {
        if (router.isReady) {
            connectWallet();
        }
    }, [router.isReady]);

    const publishProject = async (form) => {
        if (!contract) {
            console.log("Contract not initialized.");
            return;
        }

        try {
            const transaction = await contract.createProject([
                form.title,
                form.desc,
                ethers.utils.parseEther(form.target.toString()),
                Math.floor(new Date(form.deadline).getTime() / 1000),
                form.image
            ]);
            const receipt = await transaction.wait();
            console.log("Transaction successful:", receipt);
        } catch (error) {
            console.error("Transaction failed:", error);
            setAlertMsg("Transaction Failed: " + error.message);
            setShowAlert(true);
        }
    };

    const getProjects = async () => {
        if (!contract) {
            console.log("Contract not initialized.");
            return;
        }

        try {
            const projects = await contract.getProjects();
            return projects.map((project, index) => ({
                ...project,
                id: index
            }));
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            setAlertMsg("Failed to fetch projects: " + error.message);
            setShowAlert(true);
            return [];
        }
    };

    const getUserProjects = async () => {
        const projects = await getProjects();
        const userAddress = await provider.getSigner().getAddress();
        return projects.filter(project => project.owner.toLowerCase() === userAddress.toLowerCase());
    };

    const donate = async (projectId, amount) => {
        if (!contract) {
            console.log("Contract not initialized.");
            return;
        }

        try {
            const transaction = await contract.donateToProject(projectId, { value: ethers.utils.parseEther(amount.toString()) });
            const receipt = await transaction.wait();
            console.log("Donation successful:", receipt);
        } catch (error) {
            console.error("Donation failed:", error);
            setAlertMsg("Donation Failed: " + error.message);
            setShowAlert(true);
        }
    };

    const getDonations = async (projectId) => {
        if (!contract) {
            console.log("Contract not initialized.");
            return [];
        }

        try {
            const donations = await contract.getDonators(projectId);
            return donations.map((donation, index) => ({
                ...donation,
                id: index
            }));
        } catch (error) {
            console.error("Failed to fetch donations:", error);
            setAlertMsg("Failed to fetch donations: " + error.message);
            setShowAlert(true);
            return [];
        }
    };

    const contextValue = useMemo(() => ({
        loading,
        setLoading,
        showAlert,
        setShowAlert,
        alertMsg,
        setAlertMsg,
        walletConnected,
        setWalletConnected,
        publishProject,
        getProjects,
        getUserProjects,
        donate,
        getDonations,
        connectWallet
    }), [loading, showAlert, alertMsg, walletConnected, contract]);

    return (
        <GlobalContext.Provider value={contextValue}>
            {/* {showAlert && <ErrorSnackbar message={alertMsg} onClose={() => setShowAlert(false)} />} */}
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}
