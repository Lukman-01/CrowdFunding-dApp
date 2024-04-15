// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Define a smart contract named CrowdFunding for managing crowdfunding projects.
contract CrowdFunding {
    // A struct to hold detailed information about each crowdfunding project.
    struct Project {
        address owner;             // The address of the project creator.
        string title;              // Title of the project.
        string desc;               // A short description of the project.
        uint256 target;            // Funding target for the project (in wei).
        uint256 deadline;          // Deadline by which the project needs to raise funds.
        uint256 amountCollected;   // Total amount collected for the project (in wei).
        string image;              // URL of a project image.
        address[] donators;        // List of addresses who have donated to the project.
        uint256[] donations;       // Corresponding list of amounts donated by each address.
    }

    // A mapping from a project ID to its corresponding Project struct.
    mapping (uint256 => Project) public projects;
    // A counter for the total number of projects created.
    uint256 public numberOfProjects = 0;

    // Event emitted when a new project is created.
    event ProjectCreated(uint256 indexed projectId, address indexed owner);
    // Event emitted when a donation is received for a project.
    event DonationReceived(uint256 indexed projectId, address indexed donor, uint256 amount);

    /**
     * @dev Creates a new crowdfunding project and stores it in the blockchain.
     * @param _owner The address of the project creator.
     * @param _title The title of the project.
     * @param _desc A short description of the project.
     * @param _target The funding goal in wei.
     * @param _deadline The deadline timestamp for fundraising.
     * @param _image URL of a project image.
     * @return The project ID of the newly created project.
     */
    function createProject(
        address _owner, 
        string memory _title, 
        string memory _desc, 
        uint256 _target, 
        uint256 _deadline, 
        string memory _image
    ) external returns (uint256) {
        require(_deadline > block.timestamp, "Invalid deadline: Deadline must be in the future");

        Project storage project = projects[numberOfProjects];
        project.owner = _owner;
        project.title = _title;
        project.desc = _desc;
        project.target = _target;
        project.deadline = _deadline;
        project.amountCollected = 0;
        project.image = _image;

        emit ProjectCreated(numberOfProjects, _owner);

        numberOfProjects++;
        return numberOfProjects - 1;
    }

    /**
     * @dev Allows a user to donate to a specific project using the project ID.
     * @param _id The project ID to donate to.
     */
    function donateToProject(uint256 _id) external payable {
        uint256 amount = msg.value;
        Project storage project = projects[_id];

        project.donators.push(msg.sender);
        project.donations.push(amount);
        project.amountCollected += amount;

        // Attempt to transfer the donation amount to the project owner.
        (bool sent, ) = payable(project.owner).call{value: amount}("");
        require(sent, "Failed to send Ether");

        emit DonationReceived(_id, msg.sender, amount);
    }

    /**
     * @dev Retrieves the list of donors and their donation amounts for a given project.
     * @param _id The project ID.
     * @return Two arrays containing the addresses of the donators and their corresponding donation amounts.
     */
    function getDonators(uint256 _id) external view returns (address[] memory, uint256[] memory) {
        return (projects[_id].donators, projects[_id].donations);
    }

    /**
     * @dev Returns all projects currently active in the crowdfunding contract.
     * @return An array of Project structs representing each project.
     */
    function getProjects() external view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](numberOfProjects);
        for (uint i = 0; i < numberOfProjects; i++) {
            Project storage item = projects[i];
            allProjects[i] = item;
        }
        return allProjects;
    }
}
