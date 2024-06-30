
# MODULE 2 PROJECT

This program is a Module 2 Project program that demonstrates the basic syntax and functionality of the Solidity programming language and Javascript.
## Description

This program is a simple contract written in Solidity, a programming language used for developing smart contracts on the Ethereum blockchain .The purpose of this project is to create a simple contract with 2-3 functions. Then show the values of those functions in frontend of the application. This program serves as a simple and straightforward introduction to Solidity programming, and can be used as a stepping stone for more complex projects in the future.

## Getting Started

### Executing solidity program

To run only solidity program, you can use Remix, an online Solidity IDE. To get started, go to the Remix website at https://remix.ethereum.org/.

Once you are on the Remix website, create a new file by clicking on the "+" icon in the left-hand sidebar. Save the file with a.sol extension (e.g., Assessment.sol). Copy and paste the following code into the file:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }



    //MATHEMATICAL OPERATIONS

    uint256 public a_value;
    uint256 public b_value;
    uint256 public sum ;
    uint256 public subtraction ;
    uint256 public multiplication ;
    uint256 public division ;
    uint256 public power;
    uint256 public modulus;
    
    function getA() public view returns(uint256){
        return a_value;
    }
    
    function getB() public view returns(uint256){
        return b_value;
    
    }
    function getSum() public view returns(uint256){
        return sum;
    }
    
    function getSubtraction() public view returns(uint256){
        return subtraction;
    }
    
    function getMultiplication() public view returns(uint256){
        return multiplication;
    }

    function getDivision() public view returns(uint256){
        return division;
    }
    
    function getPower() public view returns(uint256){
        return power;
    }

    function getModulus() public view returns(uint256){
        return modulus;
    }

    function operations(uint256 a, uint256 b) public { 
        a_value = a;
        b_value = b;
        sum =  a+b;
        if(a>=b){
            subtraction = a-b;
        }
        else{
            subtraction = 0;
        }
        multiplication = a*b;
        if(b!=0){
            division = a/b;
        }
        else{
            division = 0;
        }
        power = a**b;
        modulus = a%b;
    }   
}
```

To compile the code, click on the "Solidity Compiler" tab in the left-hand sidebar. Make sure the "Compiler" option is set to "0.8.26" (or another compatible version), and then click on the "Compile Assessment.sol" button.

Once the code is compiled, you can deploy the contract by clicking on the "Deploy & Run Transactions" tab in the left-hand sidebar. Select the "Assessment - Assessment.sol" contract from the dropdown menu, and then click on the "Deploy" button.

Once the contract is deployed, you can interact with it by calling all the functions. 

# To run the entire project you can use this steps:

You will want to do the following steps to run the project :-

1. First of all , install the metamask wallet on Browser.
2. Clone the Github repository(make sure each file here is available).
3. Open VS Code.
4. Inside the project directory, in the terminal type: npm i and wait for it to complete.
5. Open two additional terminals in your VS code.
6. In the second terminal type: npx hardhat node
7. In Metamask , you have to Create a localhost network to run this project. In metamask , click on left upper side icon to change network , then click on "Add Network" button . After this , click on "Add a network manually" button . Then start filling details , choose Network name as your choice . In New RPC URL box , copy link from terminal ("http://127.0.0.1:8545/") and paste in box. Enter Chain ID as "31337" and Currency symbol as "ETH". Click on "Save" button . Localhost network is added and click on "Switch to your network name" button.
8. In this we have to add an account to metamask . In metamask , Click on Account 1 above and then click on "Add account or hardware wallet" button. After this , click on "Import account" button . choose select type as Private key and copy the private key of any account from the terminal(prefer Account #0 private key) and paste in the "Enter your private key string here:" box . click on Import button . Our Account is added to the Metamask.
9. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
10. Copy deployed to "address" from terminal and paste it in index.js variable "contractAddress" .
11. Back in the first terminal, type npm run dev to launch the front-end.
12. open the URL link from terminal in the browser on which we have added metamask account , localhost network and Account.
13. The project will be running on your localhost. Typically at http://localhost:3000/
14. Project is successfully completed. 
 
## Author
PRIYANKA KUMARI
STUDENT
CHANDIGARH UNIVERSITY
