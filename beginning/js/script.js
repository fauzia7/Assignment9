// CREATE AN ARRAY OF EMPLOYEES
let employees = [
    {ID: 50002121 , Name: 'Paul Richard', Ext: 4002, Email: 'paul@gm.co',Department: 'Engineering'},
    {ID: 50002121 , Name: 'Annie Wirk', Ext: 4003, Email: 'annie@gm.co',Department: 'Sales'},
    {ID: 50002121 , Name: 'Justin Lodg', Ext: 4004, Email: 'justin@gm.co',Department: 'Engineering'},
    {ID: 50002121 , Name: 'Vicky Ristf', Ext: 4005, Email: 'vicky@gm.co',Department: 'Marketing'},
    {ID: 50002121 , Name: 'Ronny', Ext: 4006, Email: 'ronny@gm.co',Department: 'Administrative'}
   
];
// GET DOM ELEMENTS
let empForm     = document.querySelector('#addForm');
let empTable    = document.querySelector('#employees');
let tcount = document.getElementById('empCount');
// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS

// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
let  empData = JSON.parse(localStorage.getItem('empdetails'));
if (! empData) {
    empData = employees;
  };

  // GET DOM ELEMENTS
  let tbody = document.getElementsByTagName('tbody');



// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();


//ADD EMPLOYEE
empForm.addEventListener('submit', (e) => {
  
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
  
    let digit = document.getElementById("id").value;
    let name =document.getElementById('name').value;
    let extt =document.getElementById('extension').value;
    let ema =document.getElementById('email').value;
    let dept =document.getElementById('department').value;

     
    let deleteBtn   = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger delete';
    deleteBtn.appendChild(document.createTextNode('X'));
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEmployee = {ID: digit, Name: name, Ext: extt, Email: ema, Department: dept};
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);
    // BUILD THE GRID
    buildGrid();
    let tdBtn = document.createElement('td');
    tdBtn.appendChild(deleteBtn);
    let trDelete = document.getElementsByTagName('tr');
    for (let row of trDelete ) {
        row.appendChild(tdBtn);   
    } 
       
    // RESET THE FORM
    document.querySelector('#addForm').reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    document.querySelector('#id').focus();

});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this employee?')) {
    

        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
        empTable.deleteRow(e.target.parentNode.parentNode.rowIndex);
        
        console.log(e.target.parentElement.parentElement.parentElement.childNodes.length);

        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(employees.length - 1, 1);
            localStorage.removeItem('employees', employees[employees.length - 1]);

        // BUILD THE GRID
        buildGrid();
    }
}
});


// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    let listItem = document.getElementsByTagName('tbody')[0];
    listItem.parentNode.removeChild(listItem); 
    // REBUILD THE TBODY FROM SCRATCH
    let tbBody = document.createElement('tbody');
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    employees.forEach((employee) => {
        let tr = document.createElement('tr');
        Object.values(employee).forEach((cell) => {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode((cell)));
            tr.appendChild(td);
        });
        tbBody.appendChild(tr);
    });
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbBody);
    // UPDATE EMPLOYEE COUNT
    let count = empTable.rows.length - 1;
    $('tcount').value = `(${count})`;
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees', JSON.stringify(employees));
};