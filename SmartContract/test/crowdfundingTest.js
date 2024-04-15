// Import necessary modules from Chai and Hardhat. Chai is used for writing test assertions and Hardhat provides development environment functionalities.
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describe a test suite for the CrowdFunding contract
describe("CrowdFunding", function () {
  // Variables to hold the instances of contracts and signers
  let funding;        // This will hold the deployed CrowdFunding contract
  let owner, donor;   // These will represent different user roles interacting with the contract
  const deadlineFuture = Math.floor(Date.now() / 1000) + 86400; // Calculate a timestamp for 24 hours in the future to use as a deadline

  // Before each test case, deploy a new instance of the contract
  beforeEach(async function () {
    [owner, donor] = await ethers.getSigners(); // Get signers from Hardhat's local Ethereum network
    const CrowdFunding = await ethers.getContractFactory("CrowdFunding"); // Get the contract factory for CrowdFunding
    funding = await CrowdFunding.deploy(); // Deploy a new instance of CrowdFunding
    await funding.deployed(); // Ensure it is fully deployed before proceeding
  });

  // Nested describe block specifically for testing project creation functionality
  describe("Project creation", function () {
    // Test case to verify that a new project can be created and the appropriate event is emitted
    it("should allow creating a new project and emit event", async function () {
      const tx = await funding.createProject(owner.address, "Project 1", "Description here", ethers.utils.parseEther("10"), deadlineFuture, "http://image.url");
      // Expect the transaction to emit a ProjectCreated event with specified arguments
      await expect(tx).to.emit(funding, "ProjectCreated").withArgs(0, owner.address);
      // Fetch the project details and verify the title is correctly set
      const project = await funding.projects(0);
      expect(project.title).to.equal("Project 1");
    });
  });

  // Nested describe block for testing donation functionality
  describe("Donations", function () {
    // Before each donation test, create a default project to donate to
    beforeEach(async function () {
      await funding.createProject(owner.address, "Project 1", "Description here", ethers.utils.parseEther("10"), deadlineFuture, "http://image.url");
    });

    // Test case to verify that donations are accepted and correctly recorded
    it("should accept donations and emit event", async function () {
      // Simulate a donation action from the donor
      const tx = await funding.connect(donor).donateToProject(0, { value: ethers.utils.parseEther("1") });
      // Expect the transaction to emit a DonationReceived event with specified arguments
      await expect(tx).to.emit(funding, "DonationReceived").withArgs(0, donor.address, ethers.utils.parseEther("1"));
      // Fetch the updated project details and verify the amount collected is as expected
      const project = await funding.projects(0);
      expect(project.amountCollected).to.equal(ethers.utils.parseEther("1"));
    });

    // Test case to check if donor details are updated correctly after making a donation
    it("should update donor details correctly", async function () {
      // Perform a donation action
      await funding.connect(donor).donateToProject(0, { value: ethers.utils.parseEther("1") });
      // Retrieve donor details for the project
      const [donators, donations] = await funding.getDonators(0);
      // Check that the donor's address and donation amount are correctly recorded
      expect(donators[0]).to.equal(donor.address);
      expect(donations[0]).to.equal(ethers.utils.parseEther("1"));
    });
  });
});
