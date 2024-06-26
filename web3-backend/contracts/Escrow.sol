//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
@title Escrow contract for P2P marketplace
@author Neeraj Choubisa (Nikku.Dev)
@notice This contract is used to escrow the tokens for a P2P marketplace.
 */
contract Escrow {
    uint256 private _counters;
    IERC20 private _stableToken;
    address private stableTokenAddress;
    enum OrderStatus {
        CREATED,
        FULFILLED,
        WITHDRAWN
    }
    enum OrderType {
        BUY,
        SELL
    }

    struct Order {
        OrderType orderType;
        OrderStatus status;
        uint stableTokenAmount;
        uint margin; //Only for sellers
        address token1;
        address token2;
        address seller;
        address buyer;
    }

    Order[] orders;

    mapping(address => uint) ghoSellerMapping;
    mapping(address => uint) ghoBuyerMapping;
    mapping(uint => Order) ordersMapping;
    mapping(address => bool) whiteListedTokens;

    //Whitelist tokens that are allowed to be exchanged on the P2P marketplace
    //GHO Sepolia: 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60
    //DAI Sepolia: 0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357
    // constructor(address[] memory whiteListedTokenAddresses) {
    //     for(uint i = 0; i < whiteListedTokenAddresses.length; i++) {
    //         whiteListedTokens[whiteListedTokenAddresses[i]] = true;
    //     }
    // }

    constructor(address _stableTokenAddress) {
        stableTokenAddress = _stableTokenAddress;
        _stableToken = IERC20(_stableTokenAddress);
    }
    /**
        @dev Function to sell Stable TOKEN 
        @param amount - Amount of Stable Token to be sold
        @param margin - Margin to be kept by the seller
        @return counter - Order number of the order created
     */
    function sellStableCoin(uint amount, uint margin) public payable returns (uint) {
        //Current function is only to check for GHO but can be extended to any ERC20 token
        require(
            _stableToken.balanceOf(msg.sender) >= amount,
            "User doesn't have enought balance"
        );
        _counters += 1;
        uint counter = _counters;
        _stableToken.transferFrom(msg.sender, address(this), amount);

        Order memory newOrder = Order(
            OrderType.SELL,
            OrderStatus.CREATED,
            amount,
            margin,
            stableTokenAddress,
            address(0),
            msg.sender,
            address(0)
        );
        orders.push(newOrder);
        ordersMapping[counter] = newOrder;

        return counter;
    }

    /**
        @dev Function to buy Stable TOKEN 
        @param amount - Amount of Stable Token to be bought
        @param token1 - Token to be used to buy Stable Token
        @return counter - Order number of the order created
     */
    function buyStableCoin(uint amount, address token1) public returns (uint) {
        require(token1 != address(0), "Token should be valid");
        require(
            IERC20(token1).balanceOf(msg.sender) >= amount,
            "User doesn't have enought balance"
        );

        _counters += 1;
        uint counter = _counters;
       
        IERC20(stableTokenAddress).transferFrom(msg.sender, address(this), amount);

        Order memory newOrder = Order(
            OrderType.BUY,
            OrderStatus.CREATED,
            amount,
            0,
            token1,
            stableTokenAddress,
            address(0),
            msg.sender
        );
        orders.push(newOrder);
        ordersMapping[counter] = newOrder;

        return counter;
    }

    /**
        @dev Function to fulfill an existing sell order
        @param orderNumSeller - Order number of the sell order
        @param token1 - Token to be used to buy Stable Token
        @param amount - Amount of Stable Token to be bought
     */

    function fulfillSellOrder(
        uint orderNumSeller,
        address token1,
        uint amount
    ) public payable {
        require(
            ordersMapping[orderNumSeller].status == OrderStatus.CREATED,
            "Sell Order has been fulfilled or withdrawn"
        ); 
        require(token1 != address(0), "Token1 should be a valid token address");

        require(
            IERC20(token1).balanceOf(msg.sender) >= amount,
            "User balance is not sufficient."
        );
    
        address tokenBuyer = token1;
        address tokenSeller = stableTokenAddress;
        address _buyer = msg.sender;
        address _seller = ordersMapping[orderNumSeller].seller;
        uint _amountSeller = ordersMapping[orderNumSeller].stableTokenAmount;
        IERC20(tokenBuyer).transferFrom(msg.sender, _seller, amount);
        IERC20(tokenSeller).transfer(_buyer, _amountSeller);

        Order storage order = ordersMapping[orderNumSeller];
        order.status = OrderStatus.FULFILLED;
        order.buyer = msg.sender;

    }

    /**
        @dev Function to fulfill an existing buy order
        @param orderNumBuyer - Order number of the buy order
        @param amount - Amount of Stable Token to be bought
     */

    function fulfillBuyOrder(uint orderNumBuyer, uint amount) public payable {
        require(
            ordersMapping[orderNumBuyer].status == OrderStatus.CREATED,
            "Buy Order has been fulfilled or withdrawn"
        );

        
        require(
            _stableToken.balanceOf(
                msg.sender
            ) >= amount,
            "User balance is not sufficient."
        );
     
        address tokenBuyer = ordersMapping[orderNumBuyer].token1;
        address tokenSeller = stableTokenAddress;
        address _seller = msg.sender;
        address _buyer = ordersMapping[orderNumBuyer].buyer;
        uint _amountBuyer = ordersMapping[orderNumBuyer].stableTokenAmount;
        if (tokenBuyer == 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) {
            payable(_seller).transfer(_amountBuyer);
        } else {
            IERC20(tokenBuyer).transfer(_seller, _amountBuyer);
        }

        IERC20(tokenSeller).transferFrom(msg.sender, _buyer, amount);

        Order storage order = ordersMapping[orderNumBuyer];
        order.status = OrderStatus.FULFILLED;
        order.buyer = msg.sender;

       
    }

    function getOrderByOrderNum(
        uint orderNum
    ) public view returns (Order memory) {
        return ordersMapping[orderNum];
    }

    function getAllOrders() public view returns (Order[] memory) {
        return orders;
    }
}
