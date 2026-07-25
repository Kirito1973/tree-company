window.renderClients = function() {
    const list = document.getElementById('clients-list'); if (!list) return; list.innerHTML = '';
    const searchInput = document.getElementById('client-search'); const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    let count = 0;
    window.clientsData.forEach(c => {
        const textToSearch = (c.name + " " + c.phone + " " + c.id).toLowerCase();
        if (searchTerm !== '' && !textToSearch.includes(searchTerm)) return;
        count++;
        list.innerHTML += `<div class="entity-card"><div class="entity-header"><span class="entity-id" style="font-size: 14px; font-weight: 900; color: var(--tree-light);">${c.id}</span><div class="rating-badge">% ${c.discount}</div></div><div class="entity-title" style="margin-top: 8px;">${c.name}</div><div class="entity-meta"><span style="font-weight: 700; color: var(--text);">${c.phone}</span></div></div>`;
    });
    document.getElementById('clients-total-count').innerText = count;
};
if (document.getElementById('client-search')) document.getElementById('client-search').addEventListener('input', window.renderClients);

