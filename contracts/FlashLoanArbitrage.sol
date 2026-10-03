// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanReceiver.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FlashLoanArbitrage
 * @notice Flash-loan arbitrage bot on Base mainnet using Aave V3
 * @dev Receives flash loans from Aave, executes swaps, and returns borrowed amount + fee
 */
contract FlashLoanArbitrage is FlashLoanReceiver, Ownable {
    IPool public constant AAVE_POOL = IPool(0xA238Dd80C259a72e81d7e4664a9801593F98d1c6);

    address public constant USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
    address public signer;

    event FlashLoanRequested(address indexed asset, uint256 amount);
    event TokensWithdrawn(address indexed token, uint256 amount);

    constructor(address _signer) FlashLoanReceiver(AAVE_POOL) {
        signer = _signer;
    }

    /**
     * @notice Request a flash loan from Aave
     * @param asset The token to borrow
     * @param amount The amount to borrow
     */
    function requestFlashLoan(address asset, uint256 amount) external onlyOwner {
        require(asset != address(0), "Invalid asset");
        require(amount > 0, "Invalid amount");

        address[] memory assets = new address[](1);
        assets[0] = asset;

        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;

        uint256[] memory modes = new uint256[](1);
        modes[0] = 0; // 0 = no debt

        address onBehalfOf = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;

        AAVE_POOL.flashLoan(
            address(this),
            assets,
            amounts,
            modes,
            onBehalfOf,
            params,
            referralCode
        );

        emit FlashLoanRequested(asset, amount);
    }

    /**
     * @notice Aave callback - execute arbitrage logic here
     * @param asset The borrowed asset
     * @param amount The borrowed amount
     * @param premium The flash-loan fee
     * @param initiator The original caller
     * @param params Additional params
     */
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bytes32) {
        require(msg.sender == address(AAVE_POOL), "Caller must be Aave Pool");
        require(initiator == owner(), "Initiator must be owner");

        // ============= ARBITRAGE LOGIC HERE =============
        // Example: Swap on Uniswap V3, check price differential, profit
        // For now, this is a placeholder - you'd implement your trading logic
        uint256 amountOwed = amount + premium;

        // ============= REPAY LOAN =============
        IERC20(asset).approve(address(AAVE_POOL), amountOwed);

        return keccak256("ERC3156FlashBorrower.onFlashLoan");
    }

    /**
     * @notice Withdraw tokens from the contract
     * @param token The token to withdraw
     */
    function withdrawToken(address token) external onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        require(balance > 0, "No balance to withdraw");
        IERC20(token).transfer(owner(), balance);
        emit TokensWithdrawn(token, balance);
    }

    /**
     * @notice Check contract balance for a token
     * @param tokenAddress The token to check
     */
    function getBalance(address tokenAddress) external view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }

    /**
     * @notice Update signer address
     * @param _signer New signer address
     */
    function setSigner(address _signer) external onlyOwner {
        require(_signer != address(0), "Invalid signer");
        signer = _signer;
    }

    /**
     * @notice Receive ETH
     */
    receive() external payable {}
}
