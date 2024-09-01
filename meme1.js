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

async function initializeStaking1() {
    await waitForTronLink();
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
        await waitForTronLink();
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

    // Attach event listeners after DOM content is fully loaded
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById(elementIds.stakeButton).addEventListener("click", stakeTokens);
        document.getElementById(elementIds.unstakeButton).addEventListener("click", unstakeTokens);
        document.getElementById(elementIds.claimRewardsButton).addEventListener("click", claimRewards);

        initializeTronWeb(); // Initialize TronWeb after event listeners are attached
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    const userAddress = await connectWallet();
    if (userAddress) {
        initializeStaking1(); // Only initialize staking after wallet is connected
    }
});



















