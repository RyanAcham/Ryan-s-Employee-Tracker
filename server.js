const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');

const PORT = process.env.PORT || 3001;
const app = express();

let conn = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'employ_db'
});

conn.query = util.promisify(conn.query);

conn.connect(function (err) {
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
        case 'Update Roles':
            upRole();
            break;
    };
}

const viewEmp = async () => {
    console.log('VIEW ALL EMPLOYEES')
    let query = 'SELECT * FROM employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        let employeeArray = [];
        res.forEach(employee => employeeArray.push(employee));
        console.table(employeeArray);
        userQuery();
    });
}

const viewDep = async () => {
    console.log('VIEW ALL DEPEARTMENTS')
    let query = 'SELECT * FROM dept';
    connection.query(query, function (err, res) {
        if (err) throw err;
        let deptArray = [];
        res.forEach(dept => deptArray.push(dept));
        console.table(deptArray);
        userQuery();
    });
}

const viewRole = async () => {
    console.log('VIEW ALL ROLES')
    let query = 'SELECT * FROM role';
    connection.query(query, function (err, res) {
        if (err) throw err;
        let roleArray = [];
        res.forEach(role => roleArray.push(role));
        console.table(roleArray);
        userQuery();
    });
}

const addEmp = async () => {

}

const addDep = async () => {

}

const addRole = async () => {

}

const upRole = async () => {

}