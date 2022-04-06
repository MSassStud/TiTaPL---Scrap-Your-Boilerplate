increase :: Float -> Company -> Company
increase k = everywhere (mkT (incS k))

-- Type extension
-- 3.1 An abstract class
class Typeable
-- A type-safe cast operator
cast :: (Typeable a, Typeable b) => a -> Maybe b

-- Prelude> (cast ’a’) :: Maybe Char
-- Just ’a’
-- Prelude> (cast ’a’) :: Maybe Bool
-- Nothing
-- Prelude> (cast True) :: Maybe Bool
-- Just True

mkT :: (Typeable a, Typeable b)
=> (b -> b) -> a -> a
mkT f = case cast f of
Just g -> g
Nothing -> id

-- Prelude> (mkT not) True
-- False
-- Prelude> (mkT not) ’a’
-- ’a’

inc :: Typeable a => Float -> a -> a
inc k = mkT (incS k)

-- 3.2 One-layer traversal
class Typeable a => Term a where
gmapT :: (forall b. Term b => b -> b) -> a -> a

instance Term Employee where
gmapT f (E per sal) = E (f per) (f sal)

gmapT f (C t1 ... tn) = C (f t1) ... (f tn)

instance Term Bool where
gmapT f x = x

instance Term a => Term [a] where
gmapT f [] = []
gmapT f (x:xs) = f x : f xs

-- 3.3 Recursive traversal

-- Apply a transformation everywhere, bottom-up
everywhere :: Term a
=> (forall b. Term b => b -> b)
-> a -> a
everywhere f x = f (gmapT (everywhere f) x)

-- Apply a transformation everywhere, top-down
everywhere´ :: Term a
=> (forall b. Term b => b -> b)
-> a -> a
everywhere´ f x = gmapT (everywhere´ f) (f x)

-- 3.4 Another example
flatten :: Name -> Company -> Company
flatten d = everywhere (mkT (flatD d))
flatD :: Name -> Dept -> Dept
flatD d (D n m us)
= D n m (concatMap unwrap us)
where
unwrap :: SubUnit -> [SubUnit]
unwrap (DU (D d’ m us)) | d==d’ = PU m : us
unwrap u

-- 3.5 Summary
forall a. Term a => a -> a

forall a. Term a => a -> R

salaryBill :: Company -> Float