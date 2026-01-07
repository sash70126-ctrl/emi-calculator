const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const tenure = document.getElementById("tenure");

loanAmount.addEventListener("input", calculateEMI);
interestRate.addEventListener("input", calculateEMI);
tenure.addEventListener("input", calculateEMI);

function calculateEMI() {
  const P = parseFloat(loanAmount.value);
  const annualRate = parseFloat(interestRate.value);
  const years = parseFloat(tenure.value);

  if (!P || !annualRate || !years) {
    document.getElementById("emi").innerText = "0";
    document.getElementById("totalInterest").innerText = "0";
    document.getElementById("totalPayment").innerText = "0";
    return;
  }

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi =
    (P * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  document.getElementById("emi").innerText = emi.toFixed(0);
  document.getElementById("totalPayment").innerText = totalPayment.toFixed(0);
  document.getElementById("totalInterest").innerText = totalInterest.toFixed(0);

  generateAmortizationTable(P, r, n, emi);
}

function generateAmortizationTable(P, r, n, emi) {
  let balance = P;
  const tableBody = document.querySelector("#amortizationTable tbody");
  tableBody.innerHTML = "";

  for (let month = 1; month <= n; month++) {
    const interest = balance * r;
    const principal = emi - interest;
    balance -= principal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${month}</td>
      <td>${emi.toFixed(0)}</td>
      <td>${interest.toFixed(0)}</td>
      <td>${principal.toFixed(0)}</td>
      <td>${balance > 0 ? balance.toFixed(0) : 0}</td>
    `;
    tableBody.appendChild(row);
  }
}

// page load par bhi calculate ho
calculateEMI();
document.getElementById("loanAmount").addEventListener("input", calculateEMI);
document.getElementById("interestRate").addEventListener("input", calculateEMI);
document.getElementById("tenure").addEventListener("input", calculateEMI);
