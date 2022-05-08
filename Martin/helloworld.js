//data Company = C [Dept]
var Company = /** @class */ (function () {
    function Company(dept) {
        this.dept = dept;
    }
    return Company;
}());
//data Dept = D Name Manager [SubUnit]
var Dept = /** @class */ (function () {
    function Dept(name, manager, subUnit) {
        this.name = name;
        this.manager = manager;
        this.subUnit = subUnit;
    }
    return Dept;
}());
//data SubUnit = PU Employee | DU Dept
var SubUnit = /** @class */ (function () {
    function SubUnit(employeeOrDept) {
        this.employeeOrDept = employeeOrDept;
    }
    return SubUnit;
}());
//data Employee = E Person Salary
var Employee = /** @class */ (function () {
    function Employee(person, salary) {
        this.person = person;
        this.salary = salary;
    }
    return Employee;
}());
//data Person = P Name Address
var Person = /** @class */ (function () {
    function Person(name, adress) {
        this.name = name;
        this.adress = adress;
    }
    return Person;
}());
//data Salary = S Float
var Salary = /** @class */ (function () {
    function Salary(salary) {
        this.salary = salary;
    }
    return Salary;
}());
//type Manager = Employee
var Manager = /** @class */ (function () {
    function Manager(person, salary) {
        this.person = person;
        this.salary = salary;
    }
    return Manager;
}());
//type Name = String
var Name = /** @class */ (function () {
    function Name(name) {
        this.name = name;
    }
    return Name;
}());
//type Address = String
var Address = /** @class */ (function () {
    function Address(adress) {
        this.adress = adress;
    }
    return Address;
}());
// genCom :: Company
// genCom = C [D "Research" ralf [PU joost, PU marlow],D "Strategy" blair []]
// ralf, joost, marlow, blair :: Employee
// ralf = E (P "Ralf" "Amsterdam") (S 8000)
// joost = E (P "Joost" "Amsterdam") (S 1000)
// marlow = E (P "Marlow" "Cambridge") (S 2000)
// blair = E (P "Blair" "London") (S 100000)
function genCom() {
    var ralf = new Employee(new Person(new Name("Ralf"), new Address("Amsterdam")), new Salary(8000));
    var joost = new Employee(new Person(new Name("Joost"), new Address("Amsterdam")), new Salary(1000));
    var marlow = new Employee(new Person(new Name("Marlow"), new Address("Cambridge")), new Salary(2000));
    var blair = new Employee(new Person(new Name("Blair"), new Address("London")), new Salary(100000));
    return new Company([
        new Dept(new Name("Research"), ralf, [new SubUnit(joost), new SubUnit(marlow)]),
        new Dept(new Name("Strategy"), blair, [])
    ]);
}
// increase :: Float -> Company -> Company
// increase k (C ds) = C (map (incD k) ds)
function increase(k, C) {
    C.dept.forEach(function (department) {
        department = incD(k, department);
    });
    return C;
}
// incD :: Float -> Dept -> Dept
// incD k (D nm mgr us) = D nm (incE k mgr) (map (incU k) us)
function incD(k, D) {
    D.subUnit.forEach(function (subunit) {
        subunit = incU(k, subunit);
    });
    D.manager = incE(k, D.manager);
    return D;
}
// incU :: Float -> SubUnit -> SubUnit
// incU k (PU e) = PU (incE k e)
// incU k (DU d) = DU (incD k d)
function incU(k, SU) {
    if (SU.employeeOrDept instanceof Employee) {
        SU.employeeOrDept = incE(k, SU.employeeOrDept);
        return SU;
    }
    SU.employeeOrDept = incD(k, SU.employeeOrDept);
    return SU;
}
// incE :: Float -> Employee -> Employee
// incE k (E p s) = E p (incS k s)
function incE(k, E) {
    E.salary = incS(k, E.salary);
    return E;
}
// incS :: Float -> Salary -> Salary
// incS k (S s) = S (s * (1+k))
function incS(k, S) {
    S.salary = S.salary * (1 + k);
    return S;
}
var company = genCom();
console.log(JSON.stringify(company));
console.log(JSON.stringify(increase(1, company)));
