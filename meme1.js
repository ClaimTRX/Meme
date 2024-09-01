document.addEventListener("DOMContentLoaded", async function() {
    // Force TronWeb to use a specific node
    const fullNode = 'https://api.trongrid.io';
    const solidityNode = 'https://api.trongrid.io';
    const eventServer = 'https://api.trongrid.io';

    // Set up TronWeb with specific nodes
    window.tronWeb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        window.tronWeb.defaultPrivateKey // Use TronLink's private key
    );

    const userAddress = await connectWallet();
    if (userAddress) {
        initializeStaking1();
    }
});

async function connectWallet() {
    try {
        while (typeof window.tronWeb === 'undefined' || !window.tronWeb.defaultAddress.base58) {
            console.log('Waiting for TronLink to be connected...');
            await new Promise(resolve => setTimeout(resolve, 500)); // wait for 500ms and check again
        }

        const userAddress = window.tronWeb.defaultAddress.base58;
        console.log("Connected to wallet:", userAddress);
        document.getElementById("connect-button").style.display = "none"; // Hide the connect button after successful connection
        return userAddress; // Return the user's address for further use
    } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect wallet. Please try again.");
        return null;
    }
}

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
        } else {
            console.error("Please enter a valid amount to unstake.");
        }
    }

    async function claimRewards() {
        await safeContractCall(() => stakingContract.methods.claimReward().send());
        await updateStakedDetails();
        await updateClaimableRewards();
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
















