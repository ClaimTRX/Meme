document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('connect-button').addEventListener('click', connectWallet);
    if (await checkTronLinkInstalled()) {
        await initializeTronWeb();
    }
});

let tronWeb, userAddress;

// Check if TronLink is installed
async function checkTronLinkInstalled() {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                clearInterval(interval);
                resolve(true);
            }
        }, 1000);
    });
}

// Connect the wallet using TronLink
async function connectWallet() {
    if (await checkTronLinkInstalled()) {
        await initializeTronWeb();
    } else {
        console.error('TronLink is not installed.');
    }
}

// Initialize TronWeb and set the global variables
async function initializeTronWeb() {
    try {
        tronWeb = window.tronWeb;
        userAddress = tronWeb.defaultAddress.base58;

        console.log('Connected to TronLink.');
        console.log('User Address:', userAddress);

        document.getElementById('connect-button').style.display = 'none';

        // Trigger UI update on initialization
        if (typeof updateAllUI === 'function') {
            await updateAllUI();
        }
    } catch (error) {
        console.error('Error initializing TronWeb:', error);
    }
}
