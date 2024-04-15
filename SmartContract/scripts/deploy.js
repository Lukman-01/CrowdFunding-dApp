// Define the main function that encapsulates the deployment logic
const main = async () => {
    // Use Hardhat Runtime Environment (HRE) to get a contract factory for the "CrowdFunding" smart contract.
    // A contract factory is an abstraction used to deploy new smart contracts, so `CrowdFunding` here is a factory for instances of our contract.
    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  
    // Deploy a new instance of the contract to the network. The `deploy()` function initiates the deployment, and returns a Promise
    // that resolves to a contract object. This object represents the deployed contract.
    const crowdFunding = await CrowdFunding.deploy();
  
    // Wait for the contract to be fully deployed to the blockchain; this ensures that the contract is mined and available.
    await crowdFunding.deployed();
  
    // Log the address of the deployed contract. This is useful for verifying that the deployment was successful
    // and for interacting with the contract later on.
    console.log("CrowdFunding contract is deployed to ", crowdFunding.address);
};

// Define the runMain function that runs the main function and handles any errors.
const runMain = async () => {
    try {
        // Attempt to run the main function to deploy the contract
        await main();
        // If main() completes without throwing an error, exit the process with a status code 0 (no error occurred).
        process.exit(0);
    } catch (error) {
        // If an error occurs during the deployment process, log the error and exit the process with a status code 1 (indicating an error).
        console.error(error);
        process.exit(1);
    }
};

// Invoke the runMain function to start the script. This is where the script actually starts executing.
runMain();
