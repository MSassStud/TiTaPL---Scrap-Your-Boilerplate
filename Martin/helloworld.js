"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib = require("../Lib/dist/index");
//data Company = C [Dept]
var Company = /** @class */ (function () {
    function Company(dept) {
        this.dept = dept;
    }
    Company.prototype.gmapT = function (k) {
        this.dept.forEach(function (d) {
            d.gmapT(k);
        });
    };
    return Company;
}());
//data Dept = D Name Manager [SubUnit]
var Dept = /** @class */ (function () {
    function Dept(name, manager, subUnit) {
        this.name = name;
        this.manager = manager;
        this.subUnit = subUnit;
    }
    Dept.prototype.gmapT = function (k) {
        this.manager.gmapT(k);
        this.subUnit.forEach(function (sU) {
            sU.gmapT(k);
        });
    };
    return Dept;
}());
//data SubUnit = PU Employee | DU Dept
var SubUnit = /** @class */ (function () {
    function SubUnit(employeeOrDept) {
        this.employeeOrDept = employeeOrDept;
    }
    SubUnit.prototype.gmapT = function (k) {
        this.employeeOrDept.gmapT(k);
    };
    return SubUnit;
}());
//data Employee = E Person Salary
var Employee = /** @class */ (function () {
    function Employee(person, salary) {
        this.person = person;
        this.salary = salary;
    }
    Employee.prototype.gmapT = function (k) {
        this.salary = lib.incS(k, this.salary);
    };
    return Employee;
}());
// genCom :: Company
// genCom = C [D "Research" ralf [PU joost, PU marlow],D "Strategy" blair []]
// ralf, joost, marlow, blair :: Employee
// ralf = E (P "Ralf" "Amsterdam") (S 8000)
// joost = E (P "Joost" "Amsterdam") (S 1000)
// marlow = E (P "Marlow" "Cambridge") (S 2000)
// blair = E (P "Blair" "London") (S 100000)
function genCom() {
    // da typeScript die Strukturen der objekte auf gleichheit vergleicht braucht man hier den new operator nicht um ein Name, Adresse oder Salary zu erstellen
    var ralf = new Employee({ name: { name: "Ralf" }, adress: { adress: "Amsterdam" } }, { salary: 8000 });
    var joost = new Employee({ name: { name: "Joost" }, adress: { adress: "Amsterdam" } }, { salary: 1000 });
    var marlow = new Employee({ name: { name: "Marlow" }, adress: { adress: "Cambridge" } }, { salary: 2000 });
    var blair = new Employee({ name: { name: "Blair" }, adress: { adress: "London" } }, { salary: 100000 });
    return new Company([
        new Dept({ name: "Research" }, ralf, [new SubUnit(joost), new SubUnit(marlow)]),
        new Dept({ name: "Strategy" }, blair, [])
    ]);
}
///////////////////////////
// HelloWorld testing area
///////////////////////////
var company = genCom();
console.log(JSON.stringify(company));
console.log(JSON.stringify(lib.inc(0.1, company)));
//# sourceMappingURL=helloworld.js.map