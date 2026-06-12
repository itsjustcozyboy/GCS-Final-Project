-- AlterTable: User consent fields
ALTER TABLE "User" ADD COLUMN "consentAnalytics" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN "consentAt" TIMESTAMP(3);

-- CreateTable: AccessLog
CREATE TABLE "AccessLog" (
    "id"        TEXT NOT NULL,
    "userId"    TEXT,
    "email"     TEXT,
    "name"      TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "path"      TEXT,
    "referrer"  TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AccessLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Admin
CREATE TABLE "Admin" (
    "id"     TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable: AdminAudit
CREATE TABLE "AdminAudit" (
    "id"        TEXT NOT NULL,
    "adminId"   TEXT NOT NULL,
    "action"    TEXT NOT NULL,
    "targetIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AccessLog_userId_idx" ON "AccessLog"("userId");
CREATE INDEX "AccessLog_createdAt_idx" ON "AccessLog"("createdAt");
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");
CREATE INDEX "Admin_userId_idx" ON "Admin"("userId");
CREATE INDEX "AdminAudit_adminId_idx" ON "AdminAudit"("adminId");

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
