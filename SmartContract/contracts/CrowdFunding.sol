// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Project {
        address owner;
        string title;
        string desc;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping (uint256 => Project) public projects;
    uint256 public numberOfProjects = 0;

    event ProjectCreated(uint256 indexed projectId, address indexed owner);
    event DonationReceived(uint256 indexed projectId, address indexed donor, uint256 amount);

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

    function donateToProject(uint256 _id) external payable {
        uint256 amount = msg.value;
        Project storage project = projects[_id];

        project.donators.push(msg.sender);
        project.donations.push(amount);
        project.amountCollected += amount;

        (bool sent, ) = payable(project.owner).call{value: amount}("");
        require(sent, "Failed to send Ether");

        emit DonationReceived(_id, msg.sender, amount);
    }

    function getDonators(uint256 _id) external view returns (address[] memory, uint256[] memory) {
        return (projects[_id].donators, projects[_id].donations);
    }

    function getProjects() external view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](numberOfProjects);
        for (uint i = 0; i < numberOfProjects; i++) {
            Project storage item = projects[i];
            allProjects[i] = item;
        }
        return allProjects;
    }
}
