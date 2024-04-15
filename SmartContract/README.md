# Smart Contract Repository for CrowdFunding

Welcome to the CrowdFunding Smart Contract repository! This project contains all the necessary components for deploying and managing a crowdfunding platform built on Ethereum using Solidity.

## Description

This project implements a simple yet robust crowdfunding system where users can create projects and receive donations in Ether. This system features project creation, donation handling, and queries for data regarding projects and their funding status.

## Features

- **Create Projects**: Users can create a new crowdfunding project by specifying details such as title, description, financial target, and a deadline for funds to be raised.
- **Donate**: Allow users to send Ether to projects they wish to support.
- **Query Projects**: Users can view all projects and specific details about each project, including total funds raised.
- **Events**: The system emits events for project creation and when donations are received, facilitating the tracking of these occurrences on the blockchain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com/)) installed on your computer.
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- An IDE or text editor of your choice (we recommend [Visual Studio Code](https://code.visualstudio.com/download)).

### Installation

1. **Clone the repo**
   ```sh
   git clone https://github.com/Lukman-01/CrowdFunding-dApp.git
   ```
2. **Navigate to the project directory**
   ```sh
   cd crowdfunding
   cd SmartContract
   ```
3. **Install NPM packages**
   ```sh
   npm install
   ```
4. **Create a `.env` file in the root directory**
   - Populate it with your private key and Alchemy API URL (or other provider)
     ```
     PRIVATE_KEY=your-private-key-here
     ALCHEMY_HTTP_URL=your-alchemy-api-url-here
     ```

### Running Tests

To run the predefined unit tests, use:

```sh
npx hardhat test
```

This command will execute the test scripts defined in the `test` folder to verify that the contracts function as expected.

## Deployment

To deploy the contracts on the Sepolia test network (or any other configured network), run:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Ensure your `.env` file is set up with the correct details for successful deployment.

