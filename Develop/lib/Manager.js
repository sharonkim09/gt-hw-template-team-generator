// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// In addition to `Employee`'s properties and methods, `Manager` will also have:

//   * officeNumber

//   * getRole() // Overridden to return 'Manager'
const Employee = require("./Employee")

class Manager extends Employee{
    constructor(name,id,email,officeNumber){

        super(name,id,email)
        this.officeNumber = officeNumber;
    }
    getRole(){
        return Manager.name
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}
    // const manager= new Manager("Heidi",2,"test2@gmail.com", 100)
    // console.log(manager)
    module.exports = Manager
