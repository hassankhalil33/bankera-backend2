-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "money" SET DEFAULT 0,
ALTER COLUMN "money" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;