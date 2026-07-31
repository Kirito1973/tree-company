
window.renderClients = function() {
    const list = document.getElementById('clients-list'); if (!list) return; list.innerHTML = '';
    const searchInput = document.getElementById('client-search'); const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    let count = 0;
    
    window.clientsData.forEach(c => {
        const textToSearch = (c.name + " " + c.phone + " " + c.id).toLowerCase();
        if (searchTerm !== '' && !textToSearch.includes(searchTerm)) return;
        count++;
        list.innerHTML += `
            <div class="entity-card">
                <div class="entity-header">
                    <span class="entity-id" style="font-size: 14px; font-weight: 900; color: var(--tree-light);">${c.id}</span>
                    <div class="rating-badge">% ${c.discount}</div>
                </div>
                <div class="entity-title" style="margin-top: 8px;">${c.name}</div>
                <div class="entity-meta"><span style="font-weight: 700; color: var(--text);">${c.phone}</span></div>
                
                <div style="display: flex; gap: 6px; margin-top: 12px; border-top: 1px dashed rgba(128,128,128,0.2); padding-top: 12px; align-items: center;">
                    <div style="display: flex; background: rgba(0,0,0,0.05); border-radius: 12px; overflow: hidden; border: 1px solid rgba(128,128,128,0.2);">
                        <button style="width: 36px; height: 36px; border: none; background: transparent; color: var(--text); font-size: 16px; cursor: pointer; border-right: 1px solid rgba(128,128,128,0.2);" onclick="changeDiscount('${c.id}', -5)">-</button>
                        <input type="number" id="discount-input-${c.id}" value="${c.discount}" style="width: 40px; border: none; background: transparent; text-align: center; color: var(--tree-light); font-weight: 900; outline: none; -moz-appearance: textfield;">
                        <button style="width: 36px; height: 36px; border: none; background: transparent; color: var(--text); font-size: 16px; cursor: pointer; border-left: 1px solid rgba(128,128,128,0.2);" onclick="changeDiscount('${c.id}', 5)">+</button>
                    </div>
                    <button class="submit-btn success" style="padding: 0; height: 36px; margin: 0; flex: 1; font-size: 10px;" onclick="updateClientDiscount('${c.id}')">OK</button>
                    <button class="call-btn" style="width: 36px; height: 36px; border-radius: 50%;" onclick="window.location.href='tel:${c.phone.replace(/[^\d+]/g, '')}'"><svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                </div>
            </div>`;
    });
    document.getElementById('clients-total-count').innerText = count;
};

document.addEventListener('DOMContentLoaded', () => { if (document.getElementById('client-search')) document.getElementById('client-search').addEventListener('input', window.renderClients); });

window.changeDiscount = function(id, val) {
    const inp = document.getElementById(`discount-input-${id}`);
    let current = parseInt(inp.value) || 0; let next = current + val;
    if (next < 0) next = 0; if (next > 100) next = 100;
    inp.value = next; if (navigator.vibrate) navigator.vibrate(10);
};

window.updateClientDiscount = function(id) {
    const c = window.clientsData.find(x => x.id === id);
    if (c) { const val = parseInt(document.getElementById(`discount-input-${id}`).value) || 0; c.discount = val; if (navigator.vibrate) navigator.vibrate([20, 50, 20]); window.renderClients(); }
};
