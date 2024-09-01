// stakingContracts.js

// Define the token contract ABI
const tokenContractAbi = [
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
    // Add more functions and events as necessary
];

// Define the staking contract ABI
const stakingContractAbi = [
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

// Initialize the staking functionality
async function initializeStaking(
  tokenContractAddress,
  stakingContractAddress,
  elementIds
) {
  let tronWeb, userAddress, stakingContract;

  async function initializeTronWeb() {
    try {
      if (!window.tronWeb || !window.tronWeb.defaultAddress.base58) {
        console.error("TronWeb not found or wallet not connected.");
        return;
      }

      tronWeb = window.tronWeb;
      userAddress = tronWeb.defaultAddress.base58;

      console.log("TronWeb initialized:", tronWeb);
      console.log("User Address:", userAddress);

      document.getElementById("connect-button").style.display = "none";

      // Initialize the staking contract using the ABI and address
      stakingContract = await tronWeb.contract(stakingContractAbi, stakingContractAddress);

      // Update the UI with staked details and claimable rewards
      await updateStakedDetails();
      await updateClaimableRewards();
      await updateProjectedMonthlyEarnings();
    } catch (error) {
      console.error("Error initializing TronWeb:", error);
    }
  }

  async function checkTronLinkInstalled() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (window.tronWeb && window.tronWeb.ready) {
          clearInterval(interval);
          resolve(true);
        } else {
          console.warn("TronLink not detected or not ready.");
        }
      }, 1000);
    });
  }

  async function connectWallet() {
    if (await checkTronLinkInstalled()) {
      await initializeTronWeb();
    } else {
      console.error("TronLink is not installed.");
    }
  }

  async function stakeToken(amount) {
    try {
      const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
      const decimals = await tokenContract.methods.decimals().call();
      const amountInDecimals = amount * Math.pow(10, decimals);

      // Approve the staking contract to spend the tokens
      await tokenContract.methods.approve(stakingContractAddress, amountInDecimals).send();

      // Stake the tokens
      await stakingContract.methods.stake(amountInDecimals).send();

      console.log("Tokens staked successfully.");
    } catch (error) {
      console.error("Error staking tokens:", error);
    }
  }

  async function unstakeToken(amount) {
    try {
      const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
      const decimals = await tokenContract.methods.decimals().call();
      const amountInDecimals = amount * Math.pow(10, decimals);

      // Unstake the tokens
      await stakingContract.methods.withdraw(amountInDecimals).send();

      console.log("Tokens unstaked successfully.");
    } catch (error) {
      console.error("Error unstaking tokens:", error);
    }
  }

  async function claimRewards() {
    try {
      await stakingContract.methods.claimReward().send();

      console.log("Rewards claimed successfully.");
    } catch (error) {
      console.error("Error claiming rewards:", error);
    }
  }

  async function updateStakedDetails() {
    try {
      // Fetch total staked tokens
      const totalStakedRaw = await stakingContract.methods.viewTotalStaked().call();
      const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
      const decimals = await tokenContract.methods.decimals().call();
      const totalStaked = totalStakedRaw / Math.pow(10, decimals);

      // Fetch wallet's staked tokens
      const walletStakedRaw = await stakingContract.methods.viewStakedAmount(userAddress).call();
      const walletStaked = walletStakedRaw / Math.pow(10, decimals);

      // Calculate the wallet's percentage of staked tokens
      let stakedPercentage = 0;
      if (totalStaked > 0) {
        stakedPercentage = (walletStaked / totalStaked) * 100;
      }

      // Display the total staked tokens
      document.getElementById(elementIds.totalStaked).innerText = formatNumber(totalStaked);

      // Display the wallet's staked tokens
      document.getElementById(elementIds.stakedAmount).innerText = formatNumber(walletStaked);

      // Display the wallet's staked percentage
      document.getElementById(elementIds.stakedPercentage).innerText = stakedPercentage.toFixed(2) + " %";
    } catch (error) {
      console.error("Error updating staked details:", error);
    }
  }

  async function updateClaimableRewards() {
    try {
      const claimableRewardsRaw = await stakingContract.methods.viewPendingReward(userAddress).call();
      const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
      const decimals = await tokenContract.methods.decimals().call();
      const claimableRewards = claimableRewardsRaw / Math.pow(10, decimals);
      document.getElementById(elementIds.claimableRewards).innerText = formatNumber(claimableRewards);
    } catch (error) {
      console.error("Error fetching claimable rewards:", error);
    }
  }

  async function updateProjectedMonthlyEarnings() {
    try {
      const projectedRewards = await stakingContract.methods.viewExpectedRewards(userAddress).call();
      const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
      const decimals = await tokenContract.methods.decimals().call();
      document.getElementById(elementIds.expectedRewards).innerText = `
        Daily: ${formatNumber(projectedRewards.daily / Math.pow(10, decimals))},
        Monthly: ${formatNumber(projectedRewards.monthly / Math.pow(10, decimals))},
        Yearly: ${formatNumber(projectedRewards.yearly / Math.pow(10, decimals))}
      `;
    } catch (error) {
      console.error("Error fetching projected monthly earnings:", error);
    }
  }

  function formatNumber(num) {
    return parseFloat(num).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  // Event listeners
  document.getElementById(elementIds.stakeButton).addEventListener("click", async () => {
    const amount = document.getElementById(elementIds.stakeAmount).value;
    if (amount > 0) {
      await stakeToken(amount);
      setTimeout(async () => {
        await updateStakedDetails();
        await updateClaimableRewards();
        await updateProjectedMonthlyEarnings();
      }, 4000);
    } else {
      console.error("Please enter a valid amount to stake.");
    }
  });

  document.getElementById(elementIds.unstakeButton).addEventListener("click", async () => {
    const amount = document.getElementById(elementIds.stakeAmount).value;
    if (amount > 0) {
      await unstakeToken(amount);
      setTimeout(async () => {
        await updateStakedDetails();
        await updateClaimableRewards();
        await updateProjectedMonthlyEarnings();
      }, 4000);
    } else {
      console.error("Please enter a valid amount to unstake.");
    }
  });

  document.getElementById(elementIds.claimRewardsButton).addEventListener("click", async () => {
    await claimRewards();
    setTimeout(async () => {
      await updateStakedDetails();
      await updateClaimableRewards();
      await updateProjectedMonthlyEarnings();
    }, 4000);
  });

  document.getElementById("connect-button").addEventListener("click", async () => {
    await connectWallet();
  });

  // Initialize TronWeb when the document is ready
  document.addEventListener("DOMContentLoaded", async () => {
    await connectWallet();
  });
}



