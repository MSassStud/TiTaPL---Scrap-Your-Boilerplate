//data Company = C [Dept]
class Company {
  constructor(public dept:Dept[]) {}
}
//data Dept = D Name Manager [SubUnit]
class Dept {
  constructor(public name:Name, public manager:EmployeeOrManager, public subUnit:SubUnit[]) {}
}
//data SubUnit = PU Employee | DU Dept
enum SubUnit {
  EMPLOYEE,
  DEPT
}
//data Employee = E Person Salary
class Employee {
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
class Manager {
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