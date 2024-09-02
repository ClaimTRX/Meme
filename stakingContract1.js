document.addEventListener('DOMContentLoaded', async () => {
    if (await checkTronLinkInstalled()) {
        await initializeTronWeb();
        setInterval(updateAllUI, 60000); // Update UI every minute
    }

    // Event listeners for staking, unstaking, and claiming rewards
    document.getElementById('stake-button-token1').addEventListener('click', async () => {
        const stakeAmount = document.getElementById('stake-amount-token1').value;
        if (stakeAmount) {
            try {
                await stakeTokens('token1', stakeAmount);
                setTimeout(updateAllUI, 4000); // Update the UI 4 seconds after staking
            } catch (error) {
                console.error('Error staking tokens:', error);
            }
        }
    });

    document.getElementById('unstake-button-token1').addEventListener('click', async () => {
        try {
            await unstakeTokens('token1');
            setTimeout(updateAllUI, 4000); // Update the UI 4 seconds after unstaking
        } catch (error) {
            console.error('Error unstaking tokens:', error);
        }
    });

    document.getElementById('claim-rewards-button-token1').addEventListener('click', async () => {
        try {
            await claimRewards('token1');
            setTimeout(updateAllUI, 4000); // Update the UI 4 seconds after claiming rewards
        } catch (error) {
            console.error('Error claiming rewards:', error);
        }
    });
});

// Contract addresses and ABI
const stakingContractAddresses = {
    token1: 'TDRQaWbdkyxfjYRvhJn85r3eWCfCM7vBBr'
};
const tokenContracts = {
    token1: 'TTwpF9nE4WpRbBXiEyYkXSfRXaxZWrFmoh'
};
let stakingContracts = {};

// Initialize staking contracts
async function initializeStakingContracts() {
    for (let token in stakingContractAddresses) {
        stakingContracts[token] = await tronWeb.contract(stakingContractAbi, stakingContractAddresses[token]);
    }
}

// Update the entire UI with current data
async function updateAllUI() {
    try {
        for (let token in stakingContracts) {
            await updateTokenUI(token);
        }
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}

// Update UI for a specific token
async function updateTokenUI(token) {
    try {
        await updateDailyReward(token);
        await updateClaimableRewards(token);
        await updateStakedAmount(token);
        await updateStakedPercentage(token);
        await updateTotalClaimed(token);
        await updateTotalStaked(token);
        await updateTotalClaimedAllUsers(token);
    } catch (error) {
        console.error(`Error updating UI for ${token}:`, error);
    }
}

// Function to update the total staked amount
async function updateTotalStaked(token) {
    try {
        const totalStakedRaw = await stakingContracts[token].methods.viewTotalStaked().call();
        const tokenContract = await tronWeb.contract(tokenAbi, tokenContracts[token]);
        const decimals = await tokenContract.methods.decimals().call();

        const totalStaked = totalStakedRaw / Math.pow(10, decimals);
        document.getElementById(`total-staked-${token}`).innerText = formatNumber(totalStaked) + ' $SUNRAT';
    } catch (error) {
        console.error(`Error fetching total staked TRX for ${token}:`, error);
    }
}

// Function to update the total claimed by all users
async function updateTotalClaimedAllUsers(token) {
    try {
        const totalClaimedAll = await stakingContracts[token].methods.viewTotalClaimed().call();
        document.getElementById(`total-claimed-all-${token}`).innerText = formatNumber(tronWeb.fromSun(totalClaimedAll)) + ' TRX';
    } catch (error) {
        console.error(`Error fetching total claimed TRX for all users for ${token}:`, error);
    }
}

// Function to update the daily reward
async function updateDailyReward(token) {
    try {
        const dailyReward = await stakingContracts[token].methods.dailyReward().call();
        const dailyRewardInTrx = tronWeb.fromSun(dailyReward);
        document.getElementById(`daily-reward-${token}`).innerText = `Daily TRX Reward: ${dailyRewardInTrx} TRX`;
    } catch (error) {
        console.error(`Error fetching daily reward for ${token}:`, error);
        document.getElementById(`daily-reward-${token}`).innerText = 'Daily TRX Reward: Unable to fetch';
    }
}

// Function to update claimable rewards
async function updateClaimableRewards(token) {
    try {
        const claimableRewards = await stakingContracts[token].methods.viewPendingReward(userAddress).call();
        document.getElementById(`claimable-rewards-${token}`).innerText = formatNumber(tronWeb.fromSun(claimableRewards)) + ' TRX';
    } catch (error) {
        console.error(`Error fetching claimable rewards for ${token}:`, error);
    }
}

// Function to update the staked amount
async function updateStakedAmount(token) {
    try {
        const stakedAmountRaw = await stakingContracts[token].methods.viewStakedAmount(userAddress).call();
        const tokenContract = await tronWeb.contract(tokenAbi, tokenContracts[token]);
        const decimals = await tokenContract.methods.decimals().call();

        const stakedAmount = stakedAmountRaw / Math.pow(10, decimals);
        document.getElementById(`staked-amount-${token}`).innerText = formatWholeNumber(stakedAmount) + ' $SUNRAT';
    } catch (error) {
        console.error(`Error fetching staked amount for ${token}:`, error);
    }
}

// Function to update the staked percentage
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

// Function to update the total claimed amount by the user
async function updateTotalClaimed(token) {
    try {
        const totalClaimed = await stakingContracts[token].methods.viewTotalClaimedByUser(userAddress).call();
        document.getElementById(`total-claimed-${token}`).innerText = formatNumber(tronWeb.fromSun(totalClaimed)) + ' TRX';
    } catch (error) {
        console.error(`Error fetching total claimed TRX for ${token}:`, error);
    }
}

// Function to stake tokens
async function stakeTokens(token, amount) {
    try {
        const tokenContract = await tronWeb.contract(tokenAbi, tokenContracts[token]);
        const decimals = await tokenContract.methods.decimals().call();

        const amountToStake = BigInt(amount) * BigInt(Math.pow(10, decimals));

        await tokenContract.methods.approve(stakingContractAddresses[token], maxUint256).send();
        await stakingContracts[token].methods.stake(amountToStake.toString()).send();

        await updateStakedAmount(token);
    } catch (error) {
        console.error(`Error staking tokens for ${token}:`, error);
    }
}

// Function to unstake tokens
async function unstakeTokens(token) {
    try {
        const unstakeAmount = document.getElementById(`stake-amount-token1`).value;
        if (unstakeAmount) {
            const tokenContract = await tronWeb.contract(tokenAbi, tokenContracts[token]);
            const decimals = await tokenContract.methods.decimals().call();

            const amountToUnstake = BigInt(unstakeAmount) * BigInt(Math.pow(10, decimals));

            await stakingContracts[token].methods.withdraw(amountToUnstake.toString()).send();

            await updateStakedAmount(token);
        }
    } catch (error) {
        console.error(`Error unstaking tokens for ${token}:`, error);
    }
}

// Function to claim rewards
async function claimRewards(token) {
    try {
        await stakingContracts[token].methods.claimReward().send();
        await updateClaimableRewards(token);
        await updateTotalClaimed(token);
    } catch (error) {
        console.error(`Error claiming rewards for ${token}:`, error);
    }
}

// Format number with commas
function formatNumber(num) {
    return parseFloat(num).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// Format whole number with commas
function formatWholeNumber(num) {
    return Math.floor(parseFloat(num)).toLocaleString('en-US');
}
