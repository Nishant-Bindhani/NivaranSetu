/*
  Warnings:

  - Added the required column `emailAttempted` to the `login_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "login_history" ADD COLUMN     "emailAttempted" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "login_history_emailAttempted_createdAt_idx" ON "login_history"("emailAttempted", "createdAt");
