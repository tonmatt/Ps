let walletConnected = false;
let btcBalance = 0;
let tokenBalance = 0;
let loanAmount = 0;
let repayments = [];

document.addEventListener("DOMContentLoaded", () => {
  const walletStatus = document.getElementById("wallet-status");
  const depositBtn = document.getElementById("deposit-btn");
  const borrowBtn = document.getElementById("borrow-btn");
  const repayBtn = document.getElementById("repay-btn");
  const connectBtn = document.getElementById("connect-wallet-btn");

  connectBtn.addEventListener("click", () => {
    walletConnected = true;
    walletStatus.innerHTML = "<span style='color:green'>✅ Wallet connected</span>";
  });

  depositBtn.addEventListener("click", () => {
    if (!walletConnected) return alert("Connect your wallet first!");
    const depositInput = document.getElementById("deposit-amount");
    const amount = parseFloat(depositInput.value);
    if (isNaN(amount) || amount <= 0) return alert("Enter valid BTC amount");
    btcBalance += amount;
    document.getElementById("btc-balance").innerText = `BTC Balance: ${btcBalance}`;
    depositInput.value = "";
  });

  borrowBtn.addEventListener("click", () => {
    if (!walletConnected) return alert("Connect your wallet first!");
    const borrowInput = document.getElementById("borrow-amount");
    const amount = parseFloat(borrowInput.value);
    if (isNaN(amount) || amount <= 0 || amount > btcBalance) {
      return alert("Invalid borrow amount or insufficient collateral");
    }
    const interest = amount * 0.1;
    loanAmount = amount + interest;
    tokenBalance += amount;
    document.getElementById("token-balance").innerText = `Token Balance: ${tokenBalance}`;
    document.getElementById("loan-info").innerText = `Loan + Interest: ${loanAmount} tokens`;
    repayments.push({ amount, interest, date: new Date().toLocaleDateString() });
    updateLoanHistory();
    borrowInput.value = "";
  });

  repayBtn.addEventListener("click", () => {
    if (!walletConnected) return alert("Connect your wallet first!");
    if (loanAmount <= 0) return alert("No active loan to repay");
    tokenBalance -= loanAmount;
    document.getElementById("token-balance").innerText = `Token Balance: ${tokenBalance}`;
    loanAmount = 0;
    document.getElementById("loan-info").innerText = "Loan + Interest: 0 tokens";
    updateRepaymentProgress();
  });

  function updateLoanHistory() {
    const table = document.getElementById("loan-history-body");
    table.innerHTML = "";
    repayments.forEach(r => {
      const row = `<tr><td>${r.amount}</td><td>${r.interest}</td><td>${r.date}</td></tr>`;
      table.innerHTML += row;
    });
  }

  function updateRepaymentProgress() {
    const section = document.getElementById("repayment-progress");
    section.innerText = "Loan fully repaid.";
  }
});