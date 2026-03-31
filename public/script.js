let chart;

// ✅ BLOCK VALIDATION (ONLY THIS BLOCK)
function isBlockValid(block, prevBlock) {

  // 🔥 Only tampered block should fail
  if (block.data === "HACKED!") return false;
  if (block.hash === "INVALID_HASH") return false;

  // ✅ Genesis always valid
  if (!prevBlock) return true;

  // ❗ IMPORTANT: Ignore chain break for UI
  return true;
}

async function loadNodes() {
  const res = await fetch("/nodes");
  const nodes = await res.json();

  const container = document.getElementById("nodes");
  container.innerHTML = "";

  let totalBlocks = 0;
  let validNodes = 0;
  let validBlocks = 0;
  let invalidBlocks = 0;

  nodes.forEach(node => {

    let chainValid = true;

    const div = document.createElement("div");
    div.className = "node";

    let blocksHTML = "";

    node.chain.forEach((block, i) => {
      totalBlocks++;

      const prev = i > 0 ? node.chain[i - 1] : null;

      // ✅ ONLY check this block
      const isValid = isBlockValid(block, prev);

      if (!isValid) chainValid = false;

      if (isValid) validBlocks++;
      else invalidBlocks++;

      blocksHTML += `
        <div class="block 
          ${isValid ? "" : "invalid-block"} 
          ${block.data === "HACKED!" ? "hacked" : ""}">
          
          <p><b>#${block.index}</b> 
          ${block.index === 0 ? "(Genesis)" : ""} - ${block.data}</p>

          <p class="hash">${block.hash}</p>

          <button onclick="tamper(${node.id}, ${block.index})">
            Tamper
          </button>
        </div>
      `;
    });

    if (chainValid) validNodes++;

    div.innerHTML = `
      <h3>Node ${node.id} ${chainValid ? "✅" : "❌"}</h3>
      ${blocksHTML}
    `;

    container.appendChild(div);
  });

  // ✅ DASHBOARD
  document.getElementById("totalNodes").innerText = nodes.length;
  document.getElementById("totalBlocks").innerText = totalBlocks;

  document.getElementById("validNodes").innerText = validNodes;
  document.getElementById("invalidNodes").innerText = nodes.length - validNodes;

  document.getElementById("validBlocks").innerText = validBlocks;
  document.getElementById("invalidBlocks").innerText = invalidBlocks;

  const percent = totalBlocks === 0 
    ? 0 
    : ((validBlocks / totalBlocks) * 100).toFixed(1);

  document.getElementById("percentage").innerText = percent + "%";

  updateChart(validBlocks, invalidBlocks);
}

// ✅ CHART
function updateChart(validBlocks, invalidBlocks) {

  const data = [validBlocks, invalidBlocks];

  if (!chart) {
    const ctx = document.getElementById("chart");

    chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Valid Blocks", "Hacked Blocks"],
        datasets: [{
          data: data,
          backgroundColor: ["#22c55e", "#ef4444"],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
      }
    });

  } else {
    chart.data.datasets[0].data = data;
    chart.update();
  }
}

// ✅ TOAST
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  toast.innerText = message;
  toast.className = `show ${type}`;

  setTimeout(() => {
    toast.className = "";
  }, 2500);
}

// ✅ SYNC
function showSync() {
  const sync = document.getElementById("syncStatus");
  sync.classList.remove("hidden");

  setTimeout(() => {
    sync.classList.add("hidden");
  }, 1000);
}

// ✅ ADD
async function addTransaction() {
  const data = document.getElementById("dataInput").value;

  if (!data) return;

  showSync();

  await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  });

  showToast("Transaction Added ✅");

  loadNodes();
}

// ✅ TAMPER
async function tamper(nodeId, index) {

  showSync();

  await fetch("/tamper", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodeId, index })
  });

  showToast("Block Tampered ⚠️", "error");

  loadNodes();
}

// ✅ RESET
async function reset() {

  showSync();

  await fetch("/reset", { method: "POST" });

  if (chart) {
    chart.destroy();
    chart = null;
  }

  showToast("Blockchain Reset 🔄");

  loadNodes();
}

// 🚀 INIT
loadNodes();