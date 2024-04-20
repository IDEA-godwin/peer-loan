// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Ego{
    address owner;
    mapping(address=>uint256) public  loan_amount;
    event LoanDeposited(uint256 amount, address borrowerAddress);
    event LoanWithdrawn(uint256 amount, address borrowerAddress);

    constructor(){
        owner = payable(msg.sender);
    }

    function depositLoanAmount() public payable{
        require(loan_amount[msg.sender] == 0, "You have an unpaid loan");
        require(msg.value > 0, "Invalid amount");
        loan_amount[msg.sender] = msg.value;
        emit LoanDeposited(msg.value, msg.sender);
    }

    function withdrawLoanAmount() public {
        uint256 amountInVault = loan_amount[msg.sender];
        require(amountInVault > 0, "You have no loan to settle");
        loan_amount[msg.sender] = 0;
        bool result = payable(msg.sender).send(amountInVault);
        require(result, "an error occured while withdrawing");
    }

}