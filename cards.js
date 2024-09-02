document.addEventListener("DOMContentLoaded", function () {
    initializeStaking(
        'TTwpF9nE4WpRbBXiEyYkXSfRXaxZWrFmoh', // tokenContractAddress
        'TDRQaWbdkyxfjYRvhJn85r3eWCfCM7vBBr', // stakingContractAddress
        {
            stakeButton: 'stake-button-token1',
            unstakeButton: 'unstake-button-token1',
            claimRewardsButton: 'claim-rewards-button-token1',
            stakeAmount: 'stake-amount-token1',
            totalStaked: 'total-staked-token1',
            stakedAmount: 'staked-amount-token1',
            stakedPercentage: 'staked-percentage-token1',
            claimableRewards: 'claimable-rewards-token1',
        }
    );

    initializeStaking(
        'TGyZUWrL97mmmYJwrC7ZCLVrhbzvHmmWPL', // tokenContractAddress (token2)
        'TR8twAsnRHCDTy4MWdCtNaNBPwWaeUFeRs', // stakingContractAddress (token2)
        {
            stakeButton: 'stake-button-token2',
            unstakeButton: 'unstake-button-token2',
            claimRewardsButton: 'claim-rewards-button-token2',
            stakeAmount: 'stake-amount-token2',
            totalStaked: 'total-staked-token2',
            stakedAmount: 'staked-amount-token2',
            stakedPercentage: 'staked-percentage-token2',
            claimableRewards: 'claimable-rewards-token2',
            dailyEarnings: 'daily-earnings-token2',
            monthlyEarnings: 'monthly-earnings-token2',
            yearlyEarnings: 'yearly-earnings-token2'
        }
    );
});
