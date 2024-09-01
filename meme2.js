async function connectWallet() {
    try {
        await waitForTronLink();
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

async function waitForTronLink() {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 10;
        const interval = setInterval(() => {
            if (window.tronWeb && window.tronWeb.ready) {
                clearInterval(interval);
                resolve();
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                reject(new Error("TronLink is not available or not connected."));
            }
            attempts++;
        }, 500); // Check every 500ms
    });
}

async function initializeStaking2() {
    await waitForTronLink();
    const tokenContractAddress = 'TGyZUWrL97mmmYJwrC7ZCLVrhbzvHmmWPL';
    const stakingContractAddress = 'TXAXaguy6urxDVcQg5ehudtMqHZPhFH6yZ';

    const elementIds = {
        stakeButton: 'stake-button-token2',
        unstakeButton: 'unstake-button-token2',
        claimRewardsButton: 'claim-rewards-button2',
        stakeAmount: 'stake-amount-token2',
        totalStaked: 'total-staked-token2',
        stakedAmount: 'staked-amount-token2',
        stakedPercentage: 'staked-percentage-token2',
        claimableRewards: 'claimable-rewards-token2',
        dailyEarnings: 'daily-earnings-token2',
        monthlyEarnings: 'monthly-earnings-token2',
        yearlyEarnings: 'yearly-earnings-token2'
    };

    let tronWeb, userAddress, stakingContract;

    async function initializeTronWeb() {
        await waitForTronLink();
        tronWeb = window.tronWeb;
        userAddress = tronWeb.defaultAddress.base58;

        stakingContract = await tronWeb.contract(stakingContractAbi, stakingContractAddress);

        await updateStakedDetails();
        await updateClaimableRewards();
        await updateProjectedEarnings();
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
            await updateProjectedEarnings();
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
            await updateProjectedEarnings();
        } else {
            console.error("Please enter a valid amount to unstake.");
        }
    }

    async function claimRewards() {
        await stakingContract.methods.claimReward().send();
        await updateStakedDetails();
        await updateClaimableRewards();
        await updateProjectedEarnings();
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

    async function updateProjectedEarnings() {
        const projectedRewards = await stakingContract.methods.viewExpectedRewards(userAddress).call();
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
        const decimals = await tokenContract.methods.decimals().call();

        const dailyEarnings = projectedRewards.daily / Math.pow(10, decimals);
        const monthlyEarnings = projectedRewards.monthly / Math.pow(10, decimals);
        const yearlyEarnings = projectedRewards.yearly / Math.pow(10, decimals);

        document.getElementById(elementIds.dailyEarnings).innerText = `Daily: ${formatNumber(dailyEarnings)} TRX`;
        document.getElementById(elementIds.monthlyEarnings).innerText = `Monthly: ${formatNumber(monthlyEarnings)} TRX`;
        document.getElementById(elementIds.yearlyEarnings).innerText = `Yearly: ${formatNumber(yearlyEarnings)} TRX`;
    }

    function formatNumber(num) {
        return parseFloat(num).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }

    document.getElementById(elementIds.stakeButton).addEventListener("click", stakeTokens);
    document.getElementById(elementIds.unstakeButton).addEventListener("click", unstakeTokens);
    document.getElementById(elementIds.claimRewardsButton).addEventListener("click", claimRewards);

    await initializeTronWeb();
}

document.addEventListener("DOMContentLoaded", async function () {
    const userAddress = await connectWallet();
    if (userAddress) {
        initializeStaking2(); // Only initialize staking after wallet is connected
    }
});












