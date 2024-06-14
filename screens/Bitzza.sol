// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BitzzaCoin is Initializable, ERC20Upgradeable {
    uint256 private constant _cap = 100000000 ether;

    // prices per unit of ingredient
    uint256 private constant _wheatPrice = 30;
    uint256 private constant _milkFlowerPrice = 60;
    uint256 private constant _tomatoPrice = 10;
    uint256 private constant _oilPrice = 18;
    uint256 private constant _waterPrice = 30;
    uint256 private constant _basilPrice = 15;
    uint256 private constant _pizzaManWorkerPrice = 90;
    uint256 private constant _deliveryGuyPrice = 60;
    uint256 private constant _pizzaOvenManPrice = 75;
    uint256 private constant _waiterPrice = 70;
    uint256 private constant _runnerPrice = 60;
    uint256 private constant _gasPrice = 221;
    uint256 private constant _rentPrice = 21;
    uint256 private constant _electricityPrice = 213;
    



    function initialize() initializer public {
        __ERC20_init("Bitzza Coin", "BITZZA");
        _mint(msg.sender, _cap);
    }

    function buyWithEth() payable public {
        require(msg.value > 0, "Amount must be greater than zero");

        uint256 bitzzaAmount = calculateBitzzaAmount(msg.value);
        _transfer(address(this), msg.sender, bitzzaAmount);
    }

    function buyWithUsdt(uint256 usdtAmount) public {
        require(usdtAmount > 0, "Amount must be greater than zero");

        uint256 bitzzaAmount = calculateBitzzaAmount(usdtAmount);
        _transfer(address(this), msg.sender, bitzzaAmount);
    }

    function calculateBitzzaAmount(uint256 paymentAmount) public view returns (uint256) {
        // calculate the total cost of making a pizza
        uint256 ingredientsCost = (_wheatPrice * 300 + _milkFlowerPrice * 100 + _tomatoPrice * 100 + _oilPrice * 10 + _waterPrice * 30 + _basilPrice) * 1e18 / 1e20; // divide by 1e20 to adjust decimals
        uint256 laborCosts = (_pizzaManWorkerPrice * 3 + _deliveryGuyPrice * 3 + _pizzaOvenManPrice * 3 + _waiterPrice + _runnerPrice) * 1e18 / (60 * 1e18); // divide by 60*1e18 to convert from seconds to minutes and adjust decimals
        uint256 overheadCosts = (_gasPrice * 3 + _rentPrice * 3 + _electricityPrice * 3) * 1e18 / (60 * 1e18); // divide by 60*1e18 to convert from seconds to minutes and adjust decimals
        uint256 totalCosts = ingredientsCost + laborCosts + overheadCosts;

        // calculate the amount of Bitzza Coins to be issued
        uint256 bitzzaAmount = paymentAmount * 1e18 / totalCosts;

        return bitzzaAmount;
    }
}
