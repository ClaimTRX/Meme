const tokenContract2 = 'TGyZUWrL97mmmYJwrC7ZCLVrhbzvHmmWPL';
const stakingContract2 = 'TXtzEHaSk1FpfYQ2Vwvf8RmKG7jpPY2YYC';

// Update UI for $BBT token
async function updateToken2UI() {
    try {
        await updateClaimableRewards('token2');
        await updateStakedAmount('token2');
        await updateStakedPercentage('token2');
        await updateTotalStaked('token2');
    } catch (error) {
        console.error('Error updating UI for token2:', error);
    }
}

// Stake tokens for $BBT
document.getElementById('stake-button-token2').addEventListener('click', async () => {
    const stakeAmount = document.getElementById('stake-amount-token2').value;
    if (stakeAmount) {
        try {
            await stakeTokens('token2', stakeAmount);
            setTimeout(async () => {
                await updateToken2UI();
            }, 4000); // 4-second delay after staking
        } catch (error) {
            console.error('Error staking tokens:', error);
        }
    }
});

// Unstake tokens for $BBT
document.getElementById('unstake-button-token2').addEventListener('click', async () => {
    try {
        await unstakeTokens('token2');
        setTimeout(async () => {
            await updateToken2UI();
        }, 4000); // 4-second delay after unstaking
    } catch (error) {
        console.error('Error unstaking tokens:', error);
    }
});

// Claim rewards for $BBT
document.getElementById('claim-rewards-button-token2').addEventListener('click', async () => {
    try {
        await claimRewards('token2');
        setTimeout(async () => {
            await updateToken2UI();
        }, 4000); // 4-second delay after claiming rewards
    } catch (error) {
        console.error('Error claiming rewards:', error);
    }
});

// Additional utility functions related to staking
async function updateTotalStaked(token) {
    try {
        const totalStakedRaw = await stakingContracts[token].methods.viewTotalStaked().call();
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContract2);
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
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContract2);
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
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContract2);
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
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContract2);
        const decimals = await tokenContract.methods.decimals().call();
        const amountToStake = BigInt(amount) * BigInt(Math.pow(10, decimals));
        await tokenContract.methods.approve(stakingContract2, maxUint256).send();
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
            const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContract2);
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
