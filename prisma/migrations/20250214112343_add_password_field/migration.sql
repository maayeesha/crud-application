-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'changeme',
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("id");
