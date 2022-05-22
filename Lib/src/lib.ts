
export interface Typeable {
  gmapT(k:number);
};

export function inc(k:number, a:Typeable) {
  a.gmapT(k);
  return a;
}

export function incS(k:number, S:Salary) : Salary {
  S.salary = S.salary * (1 + k);
  return S;
}

export interface Name {
  name:String;
}

export interface Address {
  adress:String;
}

export interface Person {
  name:Name;
  adress:Address;
}

export interface Salary {
  salary:number;
}

export interface Company extends Typeable {
  dept:Typeable[];
}

export interface Dept extends Typeable {
  name:Name;
  manager:Typeable;
  subUnit:Typeable[];
}

export interface SubUnit extends Typeable{
  employeeOrDept:Typeable;
}

export interface Employee extends Typeable{
  person:Person;
  salary:Salary;
}