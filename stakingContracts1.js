let tronWeb, userAddress;
const maxUint256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

// Contract Addresses
const tokenContract1 = 'TTwpF9nE4WpRbBXiEyYkXSfRXaxZWrFmoh';
const stakingContract1 = 'TDRQaWbdkyxfjYRvhJn85r3eWCfCM7vBBr';

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
                },
                {
                    "internalType": "uint256",
                    "name": "_dailyReward",
                    "type": "uint256"
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
            "name": "RewardClaimed",
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
            "name": "viewTotalClaimedRewards",
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
            "name": "viewDailyReward",
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
            "stateMutability": "payable",
            "type": "receive"
        }
    ];
const tokenContractAbi = [/* ABI content here */];

// Common Initialization and TronWeb setup
async function initializeTronWeb() {
    try {
        tronWeb = window.tronWeb;
        userAddress = tronWeb.defaultAddress.base58;

        console.log('Connected to TronLink.');
        console.log('User Address:', userAddress);

        document.getElementById('connect-button').style.display = 'none';
        stakingContracts['token1'] = await tronWeb.contract(stakingContractAbi, stakingContract1);

        await updateToken1UI();
    } catch (error) {
        console.error('Error initializing TronWeb:', error);
    }
}

// Update UI for $SUNRAT token
async function updateToken1UI() {
    try {
        await updateClaimableRewards('token1');
        await updateStakedAmount('token1');
        await updateStakedPercentage('token1');
        await updateTotalStaked('token1');
    } catch (error) {
        console.error('Error updating UI for token1:', error);
    }
}

// Stake tokens for $SUNRAT
document.getElementById('stake-button-token1').addEventListener('click', async () => {
    const stakeAmount = document.getElementById('stake-amount-token1').value;
    if (stakeAmount) {
        try {
            await stakeTokens('token1', stakeAmount);
            setTimeout(async () => {
                await updateToken1UI();
            }, 4000); // 4-second delay after staking
        } catch (error) {
            console.error('Error staking tokens:', error);
        }
    }
});

// Unstake tokens for $SUNRAT
document.getElementById('unstake-button-token1').addEventListener('click', async () => {
    try {
        await unstakeTokens('token1');
        setTimeout(async () => {
            await updateToken1UI();
        }, 4000); // 4-second delay after unstaking
    } catch (error) {
        console.error('Error unstaking tokens:', error);
    }
});

// Claim rewards for $SUNRAT
document.getElementById('claim-rewards-button-token1').addEventListener('click', async () => {
    try {
        await claimRewards('token1');
        setTimeout(async () => {
            await updateToken1UI();
        }, 4000); // 4-second delay after claiming rewards
    } catch (error) {
        console.error('Error claiming rewards:', error);
    }
});

// Additional utility functions related to staking
async function updateTotalStaked(token) {
    try {
        const totalStakedRaw = await stakingContracts[token].methods.viewTotalStaked().call();
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContract1);
        const decimals = await tokenContract.methods.decimals().call();
        const totalStaked = totalStakedRaw / Math.pow(10, decimals);
        document.getElementById(`total-staked-${token}`).innerText = formatNumber(totalStaked);
    } catch (error) {
        console.error(`Error fetching total staked for ${token}:`, error);
    }
}

async function updateClaimableRewards(token) {
    try {
        const claimableRewardsRaw = await stakingContracts[token].methods.viewPendingReward(userAddress).call();
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContract1);
        const decimals = await tokenContract.methods.decimals().call();
        const claimableRewards = claimableRewardsRaw / Math.pow(10, decimals);
        document.getElementById(`claimable-rewards-${token}`).innerText = formatNumber(claimableRewards);
    } catch (error) {
        console.error(`Error fetching claimable rewards for ${token}:`, error);
    }
}

async function updateStakedAmount(token) {
    try {
        const stakedAmountRaw = await stakingContracts[token].methods.viewStakedAmount(userAddress).call();
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContract1);
        const decimals = await tokenContract.methods.decimals().call();
        const stakedAmount = stakedAmountRaw / Math.pow(10, decimals);
        document.getElementById(`staked-amount-${token}`).innerText = formatWholeNumber(stakedAmount);
    } catch (error) {
        console.error(`Error fetching staked amount for ${token}:`, error);
    }
}

async function updateStakedPercentage(token) {
    try {
        const stakedAmount = await stakingContracts[token].methods.viewStakedAmount(userAddress).call();
        const totalStaked = await stakingContracts[token].methods.viewTotalStaked().call();
        let stakedPercentage = 0;

        if (totalStaked > 0) {
            stakedPercentage = (stakedAmount / totalStaked) * 100;
        }

        document.getElementById(`staked-percentage-${token}`).innerText = stakedPercentage.toFixed(2) + ' %';
    } catch (error) {
        console.error(`Error fetching staked percentage for ${token}:`, error);
    }
}

async function stakeTokens(token, amount) {
    try {
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContract1);
        const decimals = await tokenContract.methods.decimals().call();
        const amountToStake = BigInt(amount) * BigInt(Math.pow(10, decimals));
        await tokenContract.methods.approve(stakingContract1, maxUint256).send();
        await stakingContracts[token].methods.stake(amountToStake.toString()).send();
        await updateStakedAmount(token);
    } catch (error) {
        console.error(`Error staking tokens for ${token}:`, error);
    }
}

async function unstakeTokens(token) {
    try {
        const unstakeAmount = document.getElementById(`stake-amount-${token}`).value;
        if (unstakeAmount) {
            const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContract1);
            const decimals = await tokenContract.methods.decimals().call();
            const amountToUnstake = BigInt(unstakeAmount) * BigInt(Math.pow(10, decimals));
            await stakingContracts[token].methods.withdraw(amountToUnstake.toString()).send();
            await updateStakedAmount(token);
        }
    } catch (error) {
        console.error(`Error unstaking tokens for ${token}:`, error);
    }
}

async function claimRewards(token) {
    try {
        await stakingContracts[token].methods.claimReward().send();
        await updateClaimableRewards(token);
    } catch (error) {
        console.error(`Error claiming rewards for ${token}:`, error);
    }
}

function formatNumber(num) {
    return parseFloat(num).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function formatWholeNumber(num) {
    return Math.floor(parseFloat(num)).toLocaleString('en-US');
}
