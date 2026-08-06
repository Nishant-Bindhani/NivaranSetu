-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'ASSIGNED', 'IN_PROGRESS', 'ESCALATED', 'RESOLVED', 'CLOSED', 'REOPENED');

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "categoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deptId" TEXT,
    "orgId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tickets_userId_createdAt_idx" ON "tickets"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "tickets_categoryId_idx" ON "tickets"("categoryId");

-- CreateIndex
CREATE INDEX "tickets_deptId_idx" ON "tickets"("deptId");

-- CreateIndex
CREATE INDEX "tickets_orgId_idx" ON "tickets"("orgId");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- EnableRowLevelSecurity
ALTER TABLE "tickets" ENABLE ROW LEVEL SECURITY;

-- CreatePolicy
CREATE POLICY tickets_scoped_access ON "tickets"
  FOR ALL
  USING (
    current_setting('app.current_user_role', true) = 'ADMIN'
    OR (current_setting('app.current_user_role', true) = 'CITIZEN'
        AND "userId" = current_setting('app.current_user_id', true)::text)
    OR (current_setting('app.current_user_role', true) = 'OFFICER'
        AND "deptId" = current_setting('app.current_dept_id', true)::text)
    OR (current_setting('app.current_user_role', true) = 'MANAGER'
        AND "orgId" = current_setting('app.current_org_id', true)::text)
  );

-- CreatePolicy (restrictive — narrows DELETE to admin-only, on top of the
-- permissive policy above; AS RESTRICTIVE is required here because
-- PERMISSIVE policies combine with OR, so a second plain policy wouldn't
-- actually narrow access)
CREATE POLICY tickets_delete_restriction ON "tickets"
  AS RESTRICTIVE
  FOR DELETE
  USING (
    current_setting('app.current_user_role', true) = 'ADMIN'
  );
