document.addEventListener("DOMContentLoaded", function () {
  const checkBalanceButton = document.getElementById("checkBalanceButton");
  const balanceResult = document.getElementById("balanceResult");

  checkBalanceButton.addEventListener("click", async function () {
    if (typeof window.ethereum !== "undefined") {
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length > 0) {
        const address = accounts[0];
        const balance = await getBalance(address);
        balanceResult.textContent = `Balance: ${balance} BNB`;
      } else {
        balanceResult.textContent = "No accounts found.";
      }
    } else {
      balanceResult.textContent = "Please install MetaMask.";
    }
  });

  async function getBalance(address) {
    const response = await fetch(
      `https://api-testnet.bscscan.com/api?module=account&action=balance&address=${address}&tag=latest&apikey=YOUR_API_KEY`
    );
    const data = await response.json();

    if (data.status === "1") {
      return data.result / 1e18; // Convert balance from wei to BNB
    } else {
      throw new Error("Failed to retrieve balance.");
    }
  }
});
