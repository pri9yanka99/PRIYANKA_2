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
