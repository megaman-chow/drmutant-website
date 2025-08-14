const API_URL = 'https://api.dexscreener.com/latest/dex/pairs/ethereum/0xf706b758d0cc86205ed6c3e8973990e92efdb67f';

async function updateStats() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const pair = data.pair;

    if (!pair) throw new Error("No pair data found");

    document.getElementById('price').innerText = `Price: $${Number(pair.priceUsd).toFixed(6)}`;
    document.getElementById('market-cap').innerText = `Market Cap: $${Math.floor(pair.fdv).toLocaleString()}`;
    document.getElementById('liquidity').innerText = `Liquidity: $${Math.floor(pair.liquidity.usd).toLocaleString()}`;

    console.log("✅ Stats updated");
  } catch (err) {
    console.error("❌ Failed to fetch stats:", err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  updateStats(); // Initial load
  setInterval(updateStats, 15000); // Refresh every 15 seconds
});
