import * as lib from '../Lib/dist/index';

////////////////////
// helper START
////////////////////
interface Maybe<T> {}

class Nothing<T> implements Maybe<T> {}

class Just<T> implements Maybe<T> {
  constructor(private value:T) {}
  getValue():T|null {
    return this.value;
  }
}

////////////////////
// helper END
////////////////////

///////////////////////
// 3.1 Type Extensions
///////////////////////

// class Typeable
// cast :: (Typeable a, Typeable b) => a -> Maybe b
interface Typeable extends lib.Typeable {}

///////////////////////////
// 3.1 Type Extensions END
///////////////////////////

// interface EmployeeOrManager extends Typeable {
//   person:Person, 
//   salary:Salary
// }

//data Company = C [Dept]
class Company implements Typeable {
  constructor(public dept:Typeable[]) {}
  gmapT(k: number) {
    this.dept.forEach(d => {
      d.gmapT(k);
    });
  }
}
//data Dept = D Name Manager [SubUnit]
class Dept implements Typeable {
  constructor(public name:Name, public manager:Typeable, public subUnit:Typeable[]) {}
  gmapT(k: number) {
    this.manager.gmapT(k);
    this.subUnit.forEach(SU => {
      SU.gmapT(k);
    });
  }
}
//data SubUnit = PU Employee | DU Dept
class SubUnit implements Typeable{
  constructor(public employeeOrDept:Typeable) {}

  gmapT(k: number) {
    this.employeeOrDept.gmapT(k);
  }
}
//data Employee = E Person Salary
class Employee implements Typeable{
  constructor(public person:Person, public salary:Salary) {}

  gmapT(k:number) {
    this.salary = incS(k, this.salary);
  }
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
// class Manager implements EmployeeOrManager {
//   constructor(public person:Person, public salary:Salary) {}
//   gmapT(k: number) {
//     this.salary = incS(k, this.salary);
//   }
// }
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
// function increase(k:number, C:Company) : Company {
//   C.dept.forEach(department => {
//     department = incD(k, department);
//   });

//   return C;
// }

// incD :: Float -> Dept -> Dept
// incD k (D nm mgr us) = D nm (incE k mgr) (map (incU k) us)
// function incD(k:number, D:Dept) : Dept {
//   D.subUnit.forEach(subunit => {
//     subunit = incU(k, subunit);
//   });

//   D.manager = incE(k, D.manager);

//   return D;
// }

// incU :: Float -> SubUnit -> SubUnit
// incU k (PU e) = PU (incE k e)
// incU k (DU d) = DU (incD k d)
// function incU(k:number, SU:SubUnit) : SubUnit {
//   if (SU.employeeOrDept instanceof Employee) {
//     SU.employeeOrDept = incE(k, SU.employeeOrDept);
//     return SU;
//   }

//   SU.employeeOrDept = incD(k, SU.employeeOrDept);
//   return SU;
// }

// incE :: Float -> Employee -> Employee
// incE k (E p s) = E p (incS k s)
// function incE(k:number, E: Employee): Employee {
//   E.salary = incS(k, E.salary);
//   return E;
// }

// incS :: Float -> Salary -> Salary
// incS k (S s) = S (s * (1+k))
function incS(k:number, S:Salary) : Salary {
  S.salary = S.salary * (1 + k);
  return S;
}

//////////////////
// 3 Our Solution
//////////////////
// increase :: Float -> Company -> Company
// increase k = everywhere (mkT (incS k))

//cast :: (Typeable a, Typeable b) => a -> Maybe b

// mkT :: (Typeable a, Typeable b) => (b -> b) -> a -> a
// mkT f = case cast f of
//          Just g -> g
//          Nothing -> id

function cast(a:Typeable, b:Typeable): Typeable|null {
  if(a.constructor === b.constructor) {
    return a;
  }
  return null;
}

// Diese Funktion ist miner meinung nicht nötig da die Objekte miteinander verschachtelt sind.
function mkt(a:Typeable, b:Typeable): Typeable|null {
  if(cast(a,b) !== null) {
    return a;
  }
  return null;
}

// function inc(k:number, a:Typeable) : Typeable {
//    a.gmapT(k);
//    return a;
// }

///////////////////////////
// HelloWorld testing area
///////////////////////////

// let company = genCom();
// console.log(JSON.stringify(company));
// console.log(JSON.stringify(increase(0.1, company)));

let company2 = genCom();
console.log(JSON.stringify(company2));
console.log(JSON.stringify(lib.inc(0.1, company2)));

let a = new Employee(new Person(new Name("Ralf"), new Address("Amsterdam")),new Salary(8000));
console.log(mkt(a, a));
