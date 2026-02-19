document.addEventListener('DOMContentLoaded', () => {
    // 1. Target the button by the ID we set in the HTML
    const connectBtn = document.getElementById('walletConnectBtn');

    if (connectBtn) {
        connectBtn.addEventListener('click', async () => {
            // 2. Check for Solana provider (Phantom, Solflare, etc.)
            const provider = window?.solana;

            if (provider) {
                try {
                    // 3. Request connection
                    const resp = await provider.connect();
                    const publicKey = resp.publicKey.toString();
                    
                    // 4. Update UI to show success
                    console.log("GM! Connected to:", publicKey);
                    
                    // Slice the address for a clean look (e.g., ABCD...WXYZ)
                    const shortAddr = publicKey.slice(0, 4) + '...' + publicKey.slice(-4);
                    
                    connectBtn.innerText = shortAddr;
                    // Change style to solid green to show it's active
                    connectBtn.style.background = "#10B981"; 
                    connectBtn.style.boxShadow = "0 0 20px rgba(16, 185, 129, 0.4)";
                    
                } catch (err) {
                    // User likely closed the popup without connecting
                    console.warn("Connection cancelled by user.");
                }
            } else {
                // 5. Fallback if no wallet is found
                alert("GM! No Solana wallet found. Please install Phantom to connect.");
                window.open("https://phantom.app/", "_blank");
            }
        });
    } else {
        console.error("Wallet button not found! Make sure the button has id='walletConnectBtn'");
    }
});
