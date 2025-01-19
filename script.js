let items = [];
let invoices = [];
let userRole = ''; // دور المستخدم

// تسجيل الدخول
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    if (username === 'admin' && password === 'admin') {
        userRole = 'viewer'; // دور المشاهد فقط
        document.getElementById('admin-actions').style.display = 'none'; // إخفاء أزرار الإضافة
    } else if (username === 'admin1' && password === 'admin123') {
        userRole = 'admin'; // دور المدير
        document.getElementById('admin-actions').style.display = 'block'; // إظهار أزرار الإضافة
    } else {
        loginError.style.display = 'block'; // عرض رسالة الخطأ
        return;
    }

    // إظهار الشاشة الرئيسية
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
}

// تسجيل الخروج
function logout() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    userRole = ''; // إعادة تعيين الدور
}

// عرض نموذج إضافة صنف (للإدارة فقط)
function showAddItemForm() {
    if (userRole === 'admin') {
        document.getElementById('add-item-form').style.display = 'block';
        document.getElementById('add-invoice-form').style.display = 'none';
    }
}

// عرض نموذج إضافة فاتورة (للإدارة فقط)
function showAddInvoiceForm() {
    if (userRole === 'admin') {
        document.getElementById('add-invoice-form').style.display = 'block';
        document.getElementById('add-item-form').style.display = 'none';
    }
}

// عرض قائمة الأصناف
function viewItems() {
    document.getElementById('items-list').style.display = 'block';
    document.getElementById('invoices-list').style.display = 'none';
    renderItems();
}

// عرض قائمة الفواتير
function viewInvoices() {
    document.getElementById('invoices-list').style.display = 'block';
    document.getElementById('items-list').style.display = 'none';
    renderInvoices();
}

// إضافة صنف جديد
function addItem() {
    if (userRole === 'admin') {
        const name = document.getElementById('item-name').value;
        const type = document.getElementById('item-type').value;
        const price = document.getElementById('item-price').value;
        const productionDate = document.getElementById('item-production-date').value;
        const expiryDate = document.getElementById('item-expiry-date').value;

        // تحقق من أن البيانات المطلوبة موجودة
        if (!name || !type || !price || !productionDate || !expiryDate) {
            alert("من فضلك أكمل جميع الحقول.");
            return;
        }

        const newItem = { name, type, price, productionDate, expiryDate };
        items.push(newItem);

        cancelAddItem();
        renderItems();
    } else {
        alert("لا تملك صلاحية الإضافة.");
    }
}

// إضافة فاتورة جديدة
function addInvoice() {
    if (userRole === 'admin') {
        const itemName = document.getElementById('invoice-item-name').value;
        const itemType = document.getElementById('invoice-item-type').value;
        const price = document.getElementById('invoice-price').value;
        const counter = document.getElementById('invoice-counter').value;
        const total = price * counter;

        // تحقق من أن البيانات المطلوبة موجودة
        if (!itemName || !itemType || !price || !counter) {
            alert("من فضلك أكمل جميع الحقول.");
            return;
        }

        const newInvoice = { itemName, itemType, price, counter, total };
        invoices.push(newInvoice);

        cancelAddInvoice();
        renderInvoices();
    } else {
        alert("لا تملك صلاحية الإضافة.");
    }
}

// إلغاء إضافة صنف
function cancelAddItem() {
    document.getElementById('add-item-form').style.display = 'none';
    // مسح البيانات بعد الإضافة
    document.getElementById('item-name').value = '';
    document.getElementById('item-type').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-production-date').value = '';
    document.getElementById('item-expiry-date').value = '';
}

// إلغاء إضافة فاتورة
function cancelAddInvoice() {
    document.getElementById('add-invoice-form').style.display = 'none';
    // مسح البيانات بعد الإضافة
    document.getElementById('invoice-item-name').value = '';
    document.getElementById('invoice-item-type').value = '';
    document.getElementById('invoice-price').value = '';
    document.getElementById('invoice-counter').value = '';
}

// عرض البيانات في جدول الأصناف
function renderItems() {
    const table = document.getElementById('items-table').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    items.forEach((item, index) => {
        const row = table.insertRow();
        row.insertCell(0).innerHTML = `<input type="checkbox" class="select-item" onclick="toggleSelectItem(${index})">`;
        row.insertCell(1).innerText = item.name;
        row.insertCell(2).innerText = item.type;
        row.insertCell(3).innerText = item.price + ' ريال';
        row.insertCell(4).innerText = item.productionDate;
        row.insertCell(5).innerText = item.expiryDate;
        row.insertCell(6).innerHTML = `<button onclick="deleteItem(${index})">حذف</button>`;
    });
}

// عرض البيانات في جدول الفواتير
function renderInvoices() {
    const table = document.getElementById('invoices-table').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    invoices.forEach((invoice, index) => {
        const row = table.insertRow();
        row.insertCell(0).innerHTML = `<input type="checkbox" class="select-invoice" onclick="toggleSelectInvoice(${index})">`;
        row.insertCell(1).innerText = invoice.itemName;
        row.insertCell(2).innerText = invoice.itemType;
        row.insertCell(3).innerText = invoice.price + ' ريال';
        row.insertCell(4).innerText = invoice.total + ' ريال';
        row.insertCell(5).innerHTML = `<button onclick="deleteInvoice(${index})">حذف</button>`;
    });
}

// حذف صنف
function deleteItem(index) {
    items.splice(index, 1);
    renderItems();
}

// حذف فاتورة
function deleteInvoice(index) {
    invoices.splice(index, 1);
    renderInvoices();
}

// طباعة الأصناف
function printItems() {
    let printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>طباعة الأصناف</title><style>table {width: 100%; border-collapse: collapse;} th, td {border: 1px solid #ddd; padding: 8px; text-align: center;} th {background-color: #0044cc; color: white;} tr:nth-child(even) {background-color: #f9f9f9;} </style></head><body>');
    printWindow.document.write('<h1 style="text-align:center; color:red;">السنمي للأدوية</h1>');
    printWindow.document.write('<table><thead><tr><th>اسم الصنف</th><th>النوع</th><th>السعر</th><th>تاريخ الإنتاج</th><th>تاريخ انتهاء الصلاحية</th></tr></thead><tbody>');
    items.forEach(item => {
        printWindow.document.write(`<tr><td>${item.name}</td><td>${item.type}</td><td>${item.price} ريال</td><td>${item.productionDate}</td><td>${item.expiryDate}</td></tr>`);
    });
    printWindow.document.write('</tbody></table>');
    printWindow.document.write('<footer style="position:fixed; bottom:10px; width:100%; text-align:center;">');
    printWindow.document.write('التاريخ: ' + new Date().toLocaleString() + ' | المهندس: إبراهيم عبدالله أحمد علي السنمي | الرقم: 778091233</footer>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// طباعة الفواتير
function printInvoices() {
    let printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>طباعة الفواتير</title><style>table {width: 100%; border-collapse: collapse;} th, td {border: 1px solid #ddd; padding: 8px; text-align: center;} th {background-color: #0044cc; color: white;} tr:nth-child(even) {background-color: #f9f9f9;} </style></head><body>');
    printWindow.document.write('<h1 style="text-align:center; color:red;">السنمي للأدوية</h1>');
    printWindow.document.write('<table><thead><tr><th>اسم الصنف</th><th>النوع</th><th>السعر</th><th>الإجمالي</th></tr></thead><tbody>');
    invoices.forEach(invoice => {
        printWindow.document.write(`<tr><td>${invoice.itemName}</td><td>${invoice.itemType}</td><td>${invoice.price} ريال</td><td>${invoice.total} ريال</td></tr>`);
    });
    printWindow.document.write('</tbody></table>');
    printWindow.document.write('<footer style="position:fixed; bottom:10px; width:100%; text-align:center;">');
    printWindow.document.write('التاريخ: ' + new Date().toLocaleString() + ' | المهندس: إبراهيم عبدالله أحمد علي السنمي | الرقم: 778091233</footer>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}