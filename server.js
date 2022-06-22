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
    conn.query(query, function (err, res) {
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
    conn.query(query, function (err, res) {
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
    conn.query(query, function (err, res) {
        if (err) throw err;
        let roleArray = [];
        res.forEach(role => roleArray.push(role));
        console.table(roleArray);
        userQuery();
    });
}

const addEmp = async () => {
        console.log('ADD EMPLOYEE');

        let roles = await conn.query("SELECT * FROM role");

        let managers = await conn.query("SELECT * FROM employee");

        let answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'First Name?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Last Name?'
            },
            {
                name: 'employeeRoleId',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: "Role id?"
            },
            {
                name: 'employeeManagerId',
                type: 'list',
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
                message: "What is this Employee's Manager's Id?"
            }
        ])

        let result = await conn.query("INSERT INTO employee SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: (answer.employeeRoleId),
            manager_id: (answer.employeeManagerId)
        });

        console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
        userQuery();

}

const addDep = async () => {
    console.log('ADD DEPT');

    let answer = await inquirer.prompt([
        {
            name: 'deptName',
            type: 'input',
            message: 'New department name?'
        }
    ]);

    let result = await conn.query("INSERT INTO department SET ?", {
        department_name: answer.deptName
    });

    console.log(`${answer.deptName} added successfully to departments.\n`)
    userQuery();
}

const addRole = async () => {
    console.log('Role Add');

        let departments = await conn.query("SELECT * FROM department")

        let answer = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Role Name?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Role Salary?'
            },
            {
                name: 'departmentId',
                type: 'list',
                choices: departments.map((departmentId) => {
                    return {
                        name: departmentId.department_name,
                        value: departmentId.id
                    }
                }),
                message: 'Department ID?',
            }
        ]);
        
        let chosenDepartment;
        for (i = 0; i < departments.length; i++) {
            if(departments[i].dept_id === answer.choice) {
                chosenDepartment = departments[i];
            };
        }
        let result = await conn.query("INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            dept_id: answer.departmentId
        })

        console.log(`${answer.title} role added successfully.\n`)
        userQuery();
    }

const upRole = async () => {
        console.log('EMPLOYEE UPDATE');
        
        let employees = await conn.query("SELECT * FROM employee");

        let employeeSelection = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    }
                }),
                message: 'Which employee are you trying to update?'
            }
        ]);

        let roles = await conn.query("SELECT * FROM role");

        let roleSelection = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: 'Employee Role?'
            }
        ]);

        let result = await conn.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelection.role }, { id: employeeSelection.employee }]);

        console.log(`The role was successfully updated.\n`);
        userQuery();
    }