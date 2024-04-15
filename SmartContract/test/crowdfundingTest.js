const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PlatinodeFunding", function () {
  let funding;
  let owner, donor;
  const deadlineFuture = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now

  beforeEach(async function () {
    [owner, donor] = await ethers.getSigners();
    const PlatinodeFunding = await ethers.getContractFactory("PlatinodeFunding");
    funding = await PlatinodeFunding.deploy();
    await funding.deployed();
  });

  describe("Project creation", function () {
    it("should allow creating a new project and emit event", async function () {
      const tx = await funding.createProject(owner.address, "Project 1", "Description here", ethers.utils.parseEther("10"), deadlineFuture, "http://image.url");
      await expect(tx).to.emit(funding, "ProjectCreated").withArgs(0, owner.address);
      const project = await funding.projects(0);
      expect(project.title).to.equal("Project 1");
    });
  });

  describe("Donations", function () {
    beforeEach(async function () {
      await funding.createProject(owner.address, "Project 1", "Description here", ethers.utils.parseEther("10"), deadlineFuture, "http://image.url");
    });

    it("should accept donations and emit event", async function () {
      const tx = await funding.connect(donor).donateToProject(0, { value: ethers.utils.parseEther("1") });
      await expect(tx).to.emit(funding, "DonationReceived").withArgs(0, donor.address, ethers.utils.parseEther("1"));
      const project = await funding.projects(0);
      expect(project.amountCollected).to.equal(ethers.utils.parseEther("1"));
    });

    it("should update donor details correctly", async function () {
      await funding.connect(donor).donateToProject(0, { value: ethers.utils.parseEther("1") });
      const [donators, donations] = await funding.getDonators(0);
      expect(donators[0]).to.equal(donor.address);
      expect(donations[0]).to.equal(ethers.utils.parseEther("1"));
    });
  });
});
