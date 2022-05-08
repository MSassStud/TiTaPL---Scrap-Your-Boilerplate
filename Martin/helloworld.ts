interface EmployeeOrManager {
  person:Person, 
  salary:Salary
}

//data Company = C [Dept]
class Company {
  constructor(public dept:Dept[]) {}
}
//data Dept = D Name Manager [SubUnit]
class Dept {
  constructor(public name:Name, public manager:EmployeeOrManager, public subUnit:SubUnit[]) {}
}
//data SubUnit = PU Employee | DU Dept
class SubUnit {
  constructor(public employeeOrDept:Employee|Dept) {}
}
//data Employee = E Person Salary
class Employee implements EmployeeOrManager{
  constructor(public person:Person, public salary:Salary) {}
}
//data Person = P Name Address
class Person {
  constructor(public name:Name, public adress:Address) {}
}
//data Salary = S Float
class Salary {
  constructor(public salary:number) {}
}
//type Manager = Employee
class Manager implements EmployeeOrManager {
  constructor(public person:Person, public salary:Salary) {}
}
//type Name = String
class Name {
  constructor(public name:String) {}
}
//type Address = String
class Address {
  constructor(public adress:String) {}
}

// genCom :: Company
// genCom = C [D "Research" ralf [PU joost, PU marlow],D "Strategy" blair []]
// ralf, joost, marlow, blair :: Employee
// ralf = E (P "Ralf" "Amsterdam") (S 8000)
// joost = E (P "Joost" "Amsterdam") (S 1000)
// marlow = E (P "Marlow" "Cambridge") (S 2000)
// blair = E (P "Blair" "London") (S 100000)
function genCom() : Company {
  let ralf = new Employee(new Person(new Name("Ralf"), new Address("Amsterdam")),new Salary(8000));
  let joost = new Employee(new Person(new Name("Joost"), new Address("Amsterdam")), new Salary(1000));
  let marlow = new Employee(new Person(new Name("Marlow"), new Address("Cambridge")), new Salary(2000));
  let blair = new Employee(new Person(new Name("Blair"), new Address("London")), new Salary(100000));

return new Company(
  [
    new Dept(new Name("Research"), ralf, [new SubUnit(joost), new SubUnit(marlow)]), 
    new Dept(new Name("Strategy"),blair,[])
  ]);
}

// increase :: Float -> Company -> Company
// increase k (C ds) = C (map (incD k) ds)
function increase(k:number, C:Company) : Company {
  C.dept.forEach(department => {
    department = incD(k, department);
  });

  return C;
}

// incD :: Float -> Dept -> Dept
// incD k (D nm mgr us) = D nm (incE k mgr) (map (incU k) us)
function incD(k:number, D:Dept) : Dept {
  D.subUnit.forEach(subunit => {
    subunit = incU(k, subunit);
  });

  D.manager = incE(k, D.manager);

  return D;
}

// incU :: Float -> SubUnit -> SubUnit
// incU k (PU e) = PU (incE k e)
// incU k (DU d) = DU (incD k d)
function incU(k:number, SU:SubUnit) : SubUnit {
  if (SU.employeeOrDept instanceof Employee) {
    SU.employeeOrDept = incE(k, SU.employeeOrDept);
    return SU;
  }

  SU.employeeOrDept = incD(k, SU.employeeOrDept);
  return SU;
}

// incE :: Float -> Employee -> Employee
// incE k (E p s) = E p (incS k s)
function incE(k:number, E: Employee): Employee {
  E.salary = incS(k, E.salary);
  return E;
}

// incS :: Float -> Salary -> Salary
// incS k (S s) = S (s * (1+k))
function incS(k:number, S:Salary) : Salary {
  S.salary = S.salary * (1 + k);
  return S;
}

let company = genCom();
console.log(JSON.stringify(company));
console.log(JSON.stringify(increase(1, company)));


