//data Company = C [Dept]
class Company {
  constructor(dept:Dept[]) {}
}
//data Dept = D Name Manager [SubUnit]
class Dept {
  constructor(name:Name, manager:Manager, subUnit:SubUnit[]) {}
}
//data SubUnit = PU Employee | DU Dept
enum SubUnit {
  EMPLOYEE,
  DEPT
}
//data Employee = E Person Salary
class Employee {
  constructor(person:Person, salary:Salary) {}
}
//data Person = P Name Address
class Person {
  constructor(name:Name, adress:Address) {}
}
//data Salary = S Float
class Salary {
  constructor(salary:number) {}
}
//type Manager = Employee
class Manager {
  constructor(person:Person, salary:Salary) {}
}
//type Name = String
class Name {
  constructor(name:String) {}
}
//type Address = String
class Address {
  constructor(adress:String) {}
}