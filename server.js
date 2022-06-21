const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');

let conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'employ_db'
});

conn.query = util.promisify(conn.query);

conn.connect(function err {
    if (err) throw err;
    userQuery();
})

const userQuery = async () => {
    let ans = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Select option.',
        choices: [
            'View Employees',
            'View Departments',
            'View Roles',
            'Add Employees',
            'Add Departments',
            'Add Roles',
            'Update Employee Role',
        ]
    });
    switch (ans.action) {
        case 'View Employees':
            viewEmp();
            break;
        case 'View Departments':
            viewDep();
            break;
        case 'View Roles':
            viewRole();
            break;
        case 'Add Employees':
            addEmp();
            break;
        case 'Add Departments':
            addDep();
            break;
        case 'Add Roles':
            addRole();
            break;
    };
}

