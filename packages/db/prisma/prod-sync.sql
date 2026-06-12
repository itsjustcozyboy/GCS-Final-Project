-- Idempotent production schema sync.
-- Runs on every Vercel build (see vercel.json buildCommand) to keep the
-- Supabase database in step with the Prisma schema without relying on
-- prisma migrate history (the base DB was bootstrapped from supabase_schema.sql).
-- Every statement MUST be safe to run repeatedly. Append new idempotent DDL here
-- whenever schema.prisma changes.

-- User.lastSeenAt (접속중/미접속중 표시용)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "lastSeenAt" TIMESTAMP(3);

-- ConnectionInvite (초대 코드 기반 연결)
CREATE TABLE IF NOT EXISTS "ConnectionInvite" (
    "id"              TEXT NOT NULL,
    "code"            TEXT NOT NULL,
    "childId"         TEXT NOT NULL,
    "acceptedById"    TEXT,
    "connectionId"    TEXT,
    "tone"            "Tone" NOT NULL DEFAULT 'light',
    "intimacy"        INTEGER NOT NULL DEFAULT 3,
    "cohabiting"      BOOLEAN NOT NULL DEFAULT false,
    "responseChannel" TEXT NOT NULL DEFAULT 'app',
    "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt"      TIMESTAMP(3),
    "expiresAt"       TIMESTAMP(3),
    CONSTRAINT "ConnectionInvite_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ConnectionInvite_code_key" ON "ConnectionInvite"("code");
CREATE UNIQUE INDEX IF NOT EXISTS "ConnectionInvite_connectionId_key" ON "ConnectionInvite"("connectionId");
CREATE INDEX IF NOT EXISTS "ConnectionInvite_childId_idx" ON "ConnectionInvite"("childId");
CREATE INDEX IF NOT EXISTS "ConnectionInvite_acceptedById_idx" ON "ConnectionInvite"("acceptedById");
CREATE INDEX IF NOT EXISTS "ConnectionInvite_createdAt_idx" ON "ConnectionInvite"("createdAt");

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ConnectionInvite_childId_fkey') THEN
    ALTER TABLE "ConnectionInvite" ADD CONSTRAINT "ConnectionInvite_childId_fkey"
      FOREIGN KEY ("childId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ConnectionInvite_acceptedById_fkey') THEN
    ALTER TABLE "ConnectionInvite" ADD CONSTRAINT "ConnectionInvite_acceptedById_fkey"
      FOREIGN KEY ("acceptedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ConnectionInvite_connectionId_fkey') THEN
    ALTER TABLE "ConnectionInvite" ADD CONSTRAINT "ConnectionInvite_connectionId_fkey"
      FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- Answer 공개/비공개 + 키워드 답변 (2026-06-12)
ALTER TABLE "Answer" ADD COLUMN IF NOT EXISTS "isPrivate" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Answer" ADD COLUMN IF NOT EXISTS "keywords" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Answer" ADD COLUMN IF NOT EXISTS "aiComposed" BOOLEAN NOT NULL DEFAULT false;
ALTER TYPE "QuestionSource" ADD VALUE IF NOT EXISTS 'custom';

-- 항목별 동의 기록 + 부모 자발 메시지 (2026-06-12, TASK 1·4)
ALTER TYPE "QuestionSource" ADD VALUE IF NOT EXISTS 'parent_message';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'AnswerOrigin') THEN
    CREATE TYPE "AnswerOrigin" AS ENUM ('question_response', 'parent_initiated');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ConsentType') THEN
    CREATE TYPE "ConsentType" AS ENUM ('privacy_required', 'terms_required', 'age_over_14', 'analytics', 'marketing');
  END IF;
END $$;

ALTER TABLE "Answer" ADD COLUMN IF NOT EXISTS "origin" "AnswerOrigin" NOT NULL DEFAULT 'question_response';
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "consentMarketing" BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE IF NOT EXISTS "Consent" (
    "id"        TEXT NOT NULL,
    "userId"    TEXT NOT NULL,
    "type"      "ConsentType" NOT NULL,
    "agreed"    BOOLEAN NOT NULL,
    "version"   TEXT NOT NULL DEFAULT 'v1.0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Consent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Consent_userId_idx" ON "Consent"("userId");
CREATE INDEX IF NOT EXISTS "Consent_type_idx" ON "Consent"("type");

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Consent_userId_fkey') THEN
    ALTER TABLE "Consent" ADD CONSTRAINT "Consent_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
