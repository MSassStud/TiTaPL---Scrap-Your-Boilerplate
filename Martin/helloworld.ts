import * as lib from '../Lib/dist/index';

//data Company = C [Dept]
class Company implements lib.Company {
  constructor(public dept:lib.Typeable[]) {}
  gmapT(k: number) {
    this.dept.forEach(d => {
      d.gmapT(k);
    });
  }
}
//data Dept = D Name Manager [SubUnit]
class Dept implements lib.Dept {
  constructor(public name:lib.Name, public manager:lib.Typeable, public subUnit:lib.SubUnit[]) {}
  gmapT(k: number) {
    this.manager.gmapT(k);
    this.subUnit.forEach(SU => {
      SU.gmapT(k);
    });
  }
}
//data SubUnit = PU Employee | DU Dept
class SubUnit implements lib.SubUnit{
  constructor(public employeeOrDept:lib.Typeable) {}

  gmapT(k: number) {
    this.employeeOrDept.gmapT(k);
  }
}
//data Employee = E Person Salary
class Employee implements lib.Employee{
  constructor(public person:lib.Person, public salary:lib.Salary) {}

  gmapT(k:number) {
    this.salary = lib.incS(k, this.salary);
  }
}

// genCom :: Company
// genCom = C [D "Research" ralf [PU joost, PU marlow],D "Strategy" blair []]
// ralf, joost, marlow, blair :: Employee
// ralf = E (P "Ralf" "Amsterdam") (S 8000)
// joost = E (P "Joost" "Amsterdam") (S 1000)
// marlow = E (P "Marlow" "Cambridge") (S 2000)
// blair = E (P "Blair" "London") (S 100000)
function genCom() : Company {
  let ralf:lib.Employee = new Employee({name:{name: "Ralf"},adress:{adress:"Amsterdam"}}, {salary:8000});
  let joost:lib.Employee = new Employee({name:{name: "Joost"},adress:{adress:"Amsterdam"}}, {salary:1000});
  let marlow:lib.Employee = new Employee({name:{name: "Marlow"},adress:{adress:"Cambridge"}}, {salary:2000});
  let blair:lib.Employee = new Employee({name:{name: "Blair"},adress:{adress:"London"}}, {salary:100000});

return new Company(
  [
    new Dept({name:"Research"}, ralf, [new SubUnit(joost), new SubUnit(marlow)]), 
    new Dept({name:"Strategy"},blair,[])
  ]);
}

///////////////////////////
// HelloWorld testing area
///////////////////////////

let company = genCom();
console.log(JSON.stringify(company));
console.log(JSON.stringify(lib.inc(0.1, company)));
