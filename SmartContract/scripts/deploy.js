const main = async () => {
    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  
    const crowdFunding = await CrowdFunding.deploy();
  
    await crowdFunding.deployed();
  
    console.log("CrowdFunding contract is deployed to ", crowdFunding.address);
  
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();