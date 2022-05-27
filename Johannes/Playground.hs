
data Company = C [Dept]
data Dept = D Name Manager [SubUnit]
data SubUnit = PU Employee | DU Dept
data Employee = E Person Salary
data Person = P Name Address
data Salary = S Float
type Manager = Employee
type Name = String
type Address = String

genCom :: Company
genCom = C [D "Research" ralf [PU joost, PU marlow], D "Strategy" blair []]
ralf, joost, marlow, blair :: Employee
ralf = E (P "Ralf" "Amsterdam") (S 8000)
joost = E (P "Joost" "Amsterdam") (S 1000)
marlow = E (P "Marlow" "Cambridge") (S 2000)
blair = E (P "Blair" "London") (S 100000)


-- Code for outputting calculated stuff

--calculatedSalary :: Salary
--calculatedSalary = (\(E _ salary) -> salary) blair
--
--outputSalary :: Float
--outputSalary = (\(S float) -> float) calculatedSalary
--
--person :: Person
--person = (\(E person _) -> person) blair
--
--personName :: Name
--personName = (\(P name _) -> name) person
--
--
--main :: IO ()
--main = do
--  print personName
--  print outputSalary

increase :: Float -> Company -> Company

increase k (C ds) = C (map (incD k) ds)
incD :: Float -> Dept -> Dept
incD k (D nm mgr us) = D nm (incE k mgr) (map (incU k) us)
incU :: Float -> SubUnit -> SubUnit
incU k (PU e) = PU (incE k e)
incU k (DU d) = DU (incD k d)
incE :: Float -> Employee -> Employee
incE k (E p s) = E p (incS k s)
incS :: Float -> Salary -> Salary
incS k (S s) = S (s * (1+k))