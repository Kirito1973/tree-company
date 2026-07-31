
console.log("Finance module initialized");

window.renderFinance = function() {
    let totalDebt = 0;
    
    // Простейший первичный подсчет: собираем все долги мастеров
    if (window.employeesData && window.employeesData.length > 0) {
        window.employeesData.forEach(emp => {
            if (emp.companyDebt && emp.companyDebt > 0) {
                totalDebt += emp.companyDebt;
            }
        });
    }
    
    // Обновляем UI
    const debtEl = document.getElementById('fin-total-debt');
    if (debtEl) {
        debtEl.innerText = totalDebt.toLocaleString() + ' ֏';
    }
    
    // Место для подсчета общей прибыли компании (пока заглушка)
    const incomeEl = document.getElementById('fin-total-income');
    if (incomeEl) {
        incomeEl.innerText = '0 ֏';
    }
};
