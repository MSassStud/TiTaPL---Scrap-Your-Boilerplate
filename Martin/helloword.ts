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

let ralf = new Employee(new Person(new Name("Ralf"), new Address("Amsterdam")),new Salary(8000));
let joost = new Employee(new Person(new Name("Joost"), new Address("Amsterdam")), new Salary(1000));
let marlow = new Employee(new Person(new Name("Marlow"), new Address("Cambridge")), new Salary(2000));
let blair = new Employee(new Person(new Name("Blair"), new Address("London")), new Salary(100000));

let company = new Company(
  [
    new Dept(new Name("Research"), ralf, [new SubUnit(joost), new SubUnit(marlow)]), 
    new Dept(new Name("Strategy"),blair,[])
  ]);

