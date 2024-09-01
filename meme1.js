// stakingContracts1.js

// Define the token and staking contract ABIs
const tokenContractAbi = [
    // Include all the ABI entries you provided
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const stakingContractAbi = [
    // Include all the ABI entries you provided
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_stakingToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_rewardToken",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Staked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            }
        ],
        "name": "RewardClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "OwnerWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "RewardsDeposited",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ownerWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "viewAPR",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "viewTotalStaked",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "viewStakedAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "viewPendingReward",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "viewTotalClaimedByUser",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "viewTotalClaimed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "viewStakedPercentage",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_dailyReward",
                "type": "uint256"
            }
        ],
        "name": "setDailyReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "depositRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "viewExpectedRewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "daily",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "monthly",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "yearly",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

async function connectWallet() {
    try {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            const userAddress = window.tronWeb.defaultAddress.base58;
            console.log("Connected to wallet:", userAddress);
            document.getElementById("connect-button").style.display = "none"; // Hide the connect button after successful connection
            return userAddress; // Return the user's address for further use
        } else {
            console.error("TronLink not found or not connected.");
            alert("Please install TronLink wallet and connect your wallet.");
            return null;
        }
    } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect wallet. Please try again.");
    }
}

// Initialize the staking functionality
async function initializeStaking1() {
    const tokenContractAddress = 'TTwpF9nE4WpRbBXiEyYkXSfRXaxZWrFmoh';
    const stakingContractAddress = 'TDRQaWbdkyxfjYRvhJn85r3eWCfCM7vBBr';

    const elementIds = {
        stakeButton: 'stake-button-token1',
        unstakeButton: 'unstake-button-token1',
        claimRewardsButton: 'claim-rewards-button1',
        stakeAmount: 'stake-amount-token1',
        totalStaked: 'total-staked-token1',
        stakedAmount: 'staked-amount-token1',
        stakedPercentage: 'staked-percentage-token1',
        claimableRewards: 'claimable-rewards-token1'
        
    };

    let tronWeb, userAddress, stakingContract;

    async function initializeTronWeb() {
        if (!window.tronWeb || !window.tronWeb.defaultAddress.base58) {
            console.error("TronWeb not found or wallet not connected.");
            return;
        }

        tronWeb = window.tronWeb;
        userAddress = tronWeb.defaultAddress.base58;

        stakingContract = await tronWeb.contract(stakingContractAbi, stakingContractAddress);

        await updateStakedDetails();
        await updateClaimableRewards();
        
    }

    async function stakeTokens() {
        const amount = document.getElementById(elementIds.stakeAmount).value;
        if (amount > 0) {
            const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
            const decimals = await tokenContract.methods.decimals().call();

            const amountToStake = BigInt(amount) * BigInt(10 ** decimals);

            await tokenContract.methods.approve(stakingContractAddress, amountToStake.toString()).send();
            await stakingContract.methods.stake(amountToStake.toString()).send();

            await updateStakedDetails();
            await updateClaimableRewards();
            
        } else {
            console.error("Please enter a valid amount to stake.");
        }
    }

    async function unstakeTokens() {
        const amount = document.getElementById(elementIds.stakeAmount).value;
        if (amount > 0) {
            const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
            const decimals = await tokenContract.methods.decimals().call();

            const amountToUnstake = BigInt(amount) * BigInt(10 ** decimals);

            await stakingContract.methods.withdraw(amountToUnstake.toString()).send();

            await updateStakedDetails();
            await updateClaimableRewards();
            
        } else {
            console.error("Please enter a valid amount to unstake.");
        }
    }

    async function claimRewards() {
        await stakingContract.methods.claimReward().send();
        await updateStakedDetails();
        await updateClaimableRewards();
        
    }

    async function updateStakedDetails() {
        const totalStakedRaw = await stakingContract.methods.viewTotalStaked().call();
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
        const decimals = await tokenContract.methods.decimals().call();
        const totalStaked = totalStakedRaw / Math.pow(10, decimals);

        const walletStakedRaw = await stakingContract.methods.viewStakedAmount(userAddress).call();
        const walletStaked = walletStakedRaw / Math.pow(10, decimals);

        let stakedPercentage = 0;
        if (totalStaked > 0) {
            stakedPercentage = (walletStaked / totalStaked) * 100;
        }

        document.getElementById(elementIds.totalStaked).innerText = formatNumber(totalStaked);
        document.getElementById(elementIds.stakedAmount).innerText = formatNumber(walletStaked);
        document.getElementById(elementIds.stakedPercentage).innerText = stakedPercentage.toFixed(2) + " %";
    }

    async function updateClaimableRewards() {
        const claimableRewardsRaw = await stakingContract.methods.viewPendingReward(userAddress).call();
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
        const decimals = await tokenContract.methods.decimals().call();
        const claimableRewards = claimableRewardsRaw / Math.pow(10, decimals);
        document.getElementById(elementIds.claimableRewards).innerText = formatNumber(claimableRewards);
    }

    
    function formatNumber(num) {
        return parseFloat(num).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }

    document.getElementById(elementIds.stakeButton).addEventListener("click", stakeTokens);
    document.getElementById(elementIds.unstakeButton).addEventListener("click", unstakeTokens);
    document.getElementById(elementIds.claimRewardsButton).addEventListener("click", claimRewards);

    document.addEventListener("DOMContentLoaded", initializeTronWeb);
}

initializeStaking1();













