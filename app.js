var currencies = [1, 5, 10, 20, 100, 200, 500];
var text = document.querySelector('#output-text');
var submit = document.querySelector('#submit-btn');

submit.addEventListener('click', (e)=> {
    e.preventDefault();

    var countNotes = {};
    text.textContent = '';
    var tableArr = document.querySelectorAll('.remove');
    if (tableArr) {
        tableArr.forEach(element => {
            element.remove()
        })
    }
    billAmount = document.querySelector('#bill-amount').valueAsNumber;
    cashPaid = document.querySelector('#cash-paid').valueAsNumber;
    if (isNaN(billAmount) || isNaN(cashPaid)) {
        text.textContent = 'Please fill the required fields!';
    }
    else if  (billAmount === cashPaid) {
        text.textContent = 'You have paid the exact amount!';
    }
    else if (billAmount > cashPaid) {
        text.textContent = 'You have paid less cash than the total bill amount!';
    }
    else if (billAmount < cashPaid) {
        var amtDiff = cashPaid - billAmount;
        var note = 0;
        var lowest = cashPaid;
        text.textContent = `Amount to collect: ${amtDiff} Rupees`;
        while (amtDiff > 0) {
            currencies.forEach(currency => {
                var remainder = amtDiff % currency;
                if (remainder <= lowest) {
                    lowest = remainder
                    note = currency
                }
            });
            if (countNotes[note]) {
                countNotes[note] += 1
            }
            else {
                countNotes[note] = 1
            }
            amtDiff -= note 
        }
        var table = document.getElementById('emp-Table');
        console.log(table);
        // table.setAttribute('id', 'empTable');
        table.classList.add('main-content');
        var arrHead = ['Currency Note', 'Quantity'];
        var entries = Object.entries(countNotes);
        var tr = table.insertRow(-1);
        tr.classList.add('remove');
        for (var h=0; h<arrHead.length; h++) {
            var th = document.createElement('th');
            th.classList.add('remove');
            th.innerHTML = arrHead[h];
            tr.appendChild(th); 
        }
        for (var c = 0; c < entries.length; c++) {
            tr = table.insertRow(-1);
            tr.classList.add('remove');
            for (var j = 0; j < arrHead.length; j++) {
                var td = document.createElement('td');          
                td.classList.add('remove');
                td = tr.insertCell(-1);
                td.innerHTML = entries[c][j];            
            }
            
        }
        // document.body.appendChild(table);
        }
    document.getElementById('bill-amount').value = '';
    document.getElementById('cash-paid').value = '';
});

