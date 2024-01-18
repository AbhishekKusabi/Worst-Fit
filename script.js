function worstFit(blockSize, processSize) {
    const m = blockSize.length;
    const n = processSize.length;
    const allocation = new Array(n).fill(-1);

    for (let i = 0; i < n; i++) {
        let worstIdx = -1;
        for (let j = 0; j < m; j++) {
            if (blockSize[j] >= processSize[i]) {
                if (worstIdx === -1 || blockSize[j] > blockSize[worstIdx]) {
                    worstIdx = j;
                }
            }
        }

        if (worstIdx !== -1) {
            allocation[i] = worstIdx;
            blockSize[worstIdx] -= processSize[i];
        }
    }
    try{
    displayMemoryRow(blockSize);
    displayProcessRow(processSize, allocation);
    // displayUnallocatedProcessRow(processSize, allocation);
    }catch(err){
        alert("Please enter valid input"+err);
    }
}

function displayMemoryRow(blockSize) {
    const memoryRow = document.getElementById('memory-row');
    memoryRow.innerHTML = '';

    blockSize.forEach((size, index) => {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add('memory-block');
        blockDiv.innerHTML = `<div class="text">${size} KB</div>`;
        blockDiv.style.width = `${size}px`;
        memoryRow.appendChild(blockDiv);
    });
}

function displayProcessRow(processSize, allocation) {
    const processRow = document.getElementById('process-row');
    processRow.innerHTML = '';

    const processOrder = [];
    for (let i = 0; i < processSize.length; i++) {
        processOrder.push({ size: processSize[i], index: i, blockIndex: allocation[i] });
    }

    processOrder.sort((a, b) => a.blockIndex - b.blockIndex);

    processOrder.forEach((process, index) => {
        const processDiv = document.createElement('div');
        processDiv.classList.add('process-bar');
        processDiv.innerHTML = `<div class="text">${process.size} KB</div>`;
        if (allocation[process.index] !== -1) {
            processDiv.classList.add('allocated-bar');
            processDiv.innerHTML += `<div class="allocated-text">Process ${process.index + 1}</div>`;
        }
        processDiv.style.width = `${process.size}px`;
        processRow.appendChild(processDiv);
    });
}
function allocateMemory() {
    const memoryInput = document.getElementById('memory-input').value;
    const processInput = document.getElementById('process-input').value;

    const memoryBlocks = memoryInput.split(',').map(Number);
    const processes = processInput.split(',').map(Number);

    worstFit(memoryBlocks, processes);
}