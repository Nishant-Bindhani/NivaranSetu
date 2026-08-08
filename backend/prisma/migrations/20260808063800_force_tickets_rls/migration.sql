-- By default, Postgres exempts the table owner from RLS policies — since
-- the app's own DB connection uses the owning role, the policies from the
-- earlier migration were silently never being enforced. FORCE makes RLS
-- apply even to the owner.
ALTER TABLE "tickets" FORCE ROW LEVEL SECURITY;
