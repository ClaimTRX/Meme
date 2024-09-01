document.addEventListener("DOMContentLoaded", function() {
    initializeStaking2();
});

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

async function initializeStaking2() {
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

    let tronWeb, stakingContract;

    async function initializeTronWeb() {
        if (!window.tronWeb || !window.tronWeb.defaultAddress.base58) {
            console.error("TronWeb not found or wallet not connected.");
            return;
        }

        tronWeb = window.tronWeb;

        stakingContract = await tronWeb.contract(stakingContractAbi, stakingContractAddress);

        await updateStakedDetails();
        await updateClaimableRewards();
        await updateProjectedEarnings();
    }

    async function safeContractCall(callFunction, retries = 3, delay = 1000) {
        for (let i = 0; i < retries; i++) {
            try {
                return await callFunction();
            } catch (error) {
                console.error(`Error on attempt ${i + 1}:`, error);
                if (i < retries - 1) {
                    await new Promise(resolve => setTimeout(resolve, delay)); // wait before retrying
                } else {
                    throw error; // rethrow the last error if out of retries
                }
            }
        }
    }

    async function stakeTokens() {
        const amount = document.getElementById(elementIds.stakeAmount).value;
        if (amount > 0) {
            const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
            const decimals = await tokenContract.methods.decimals().call();

            const amountToStake = BigInt(amount) * BigInt(10 ** decimals);

            await safeContractCall(() => tokenContract.methods.approve(stakingContractAddress, amountToStake.toString()).send());
            await safeContractCall(() => stakingContract.methods.stake(amountToStake.toString()).send());

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

            await safeContractCall(() => stakingContract.methods.withdraw(amountToUnstake.toString()).send());

            await updateStakedDetails();
            await updateClaimableRewards();
            await updateProjectedEarnings();
        } else {
            console.error("Please enter a valid amount to unstake.");
        }
    }

    async function claimRewards() {
        await safeContractCall(() => stakingContract.methods.claimReward().send());
        await updateStakedDetails();
        await updateClaimableRewards();
        await updateProjectedEarnings();
    }

    async function updateStakedDetails() {
        const totalStakedRaw = await safeContractCall(() => stakingContract.methods.viewTotalStaked().call());
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
        const decimals = await tokenContract.methods.decimals().call();
        const totalStaked = totalStakedRaw / Math.pow(10, decimals);

        const walletStakedRaw = await safeContractCall(() => stakingContract.methods.viewStakedAmount(window.tronWeb.defaultAddress.base58).call());
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
        const claimableRewardsRaw = await safeContractCall(() => stakingContract.methods.viewPendingReward(window.tronWeb.defaultAddress.base58).call());
        const tokenContract = await tronWeb.contract(tokenContractAbi, tokenContractAddress);
        const decimals = await tokenContract.methods.decimals().call();
        const claimableRewards = claimableRewardsRaw / Math.pow(10, decimals);
        document.getElementById(elementIds.claimableRewards).innerText = formatNumber(claimableRewards);
    }

    async function updateProjectedEarnings() {
        const projectedRewards = await safeContractCall(() => stakingContract.methods.viewExpectedRewards(window.tronWeb.defaultAddress.base58).call());
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

    if (document.getElementById(elementIds.stakeButton)) {
        document.getElementById(elementIds.stakeButton).addEventListener("click", stakeTokens);
    }
    if (document.getElementById(elementIds.unstakeButton)) {
        document.getElementById(elementIds.unstakeButton).addEventListener("click", unstakeTokens);
    }
    if (document.getElementById(elementIds.claimRewardsButton)) {
        document.getElementById(elementIds.claimRewardsButton).addEventListener("click", claimRewards);
    }

    await initializeTronWeb();
}












