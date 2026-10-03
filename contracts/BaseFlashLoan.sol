// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "https://github.com/aave/aave-v3-core/blob/master/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "https://github.com/aave/aave-v3-core/blob/master/contracts/interfaces/IPoolAddressesProvider.sol";

/**
 * @title BaseFlashLoan
 * @notice Flash-loan arbitrage bot on Base mainnet using Aave V3
 * @dev Receives flash loans from Aave, executes swaps, and returns borrowed amount + fee
 */
contract BaseFlashLoan is FlashLoanSimpleReceiverBase, Ownable {
    
    // Aave V3 Pool interface
    IPool public aavePool;
    
    event FlashLoanRequested(address indexed asset, uint256 amount);
    event TokensWithdrawn(address indexed token, uint256 amount);
    event OperationExecuted(address indexed asset, uint256 amount, uint256 premium);

    // Pass the Base Aave V3 Addresses Provider to the parent constructor
    constructor(address _addressProvider) 
        FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) 
        Ownable(msg.sender) 
    {
        aavePool = POOL;
    }

    /**
     * @dev This function is called after your contract receives the flash-borrowed amount
     */
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        require(msg.sender == address(aavePool), "Caller must be Aave Pool");
        
        // --- YOUR ARBITRAGE OR LOGIC GOES HERE ---
        // At this point, `amount` of `asset` is in this contract.
        // You can interact with DEXes (Uniswap V3, Aerodrome, etc.) here.
        
        // For now, this is a placeholder flash-loan that simply repays
        // In production, implement your trading strategy here
        // ------------------------------------------

        // Calculate the total amount to repay (Principal + Fee)
        uint256 amountOwed = amount + premium;
        
        // Ensure the contract has enough balance to approve and repay Aave
        require(IERC20(asset).balanceOf(address(this)) >= amountOwed, "Insufficient balance to repay");
        
        IERC20(asset).approve(address(aavePool), amountOwed);

        emit OperationExecuted(asset, amount, premium);
        return true;
    }

    /**
     * @dev Initiate the flash loan from outside
     */
    function requestFlashLoan(address asset, uint256 amount) external onlyOwner {
        require(asset != address(0), "Invalid asset");
        require(amount > 0, "Invalid amount");
        
        address receiverAddress = address(this);
        bytes memory params = ""; // Pass any encoded arguments if needed
        uint16 referralCode = 0;

        aavePool.flashLoanSimple(
            receiverAddress,
            asset,
            amount,
            params,
            referralCode
        );
        
        emit FlashLoanRequested(asset, amount);
    }

    /**
     * @dev Withdraw stuck funds/profits
     */
    function withdraw(address token) external onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        require(balance > 0, "No balance to withdraw");
        IERC20(token).transfer(msg.sender, balance);
        emit TokensWithdrawn(token, balance);
    }

    /**
     * @dev Check contract balance for a token
     */
    function getBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    /**
     * @dev Receive ETH
     */
    receive() external payable {}
}
