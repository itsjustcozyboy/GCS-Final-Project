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

-- 서비스 문의 (2026-06-12, 문의/피드백 기능)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'InquiryCategory') THEN
    CREATE TYPE "InquiryCategory" AS ENUM ('bug', 'feature', 'payment', 'privacy', 'etc');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'InquiryStatus') THEN
    CREATE TYPE "InquiryStatus" AS ENUM ('new', 'in_progress', 'resolved');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "Inquiry" (
    "id"        TEXT NOT NULL,
    "userId"    TEXT,
    "email"     TEXT NOT NULL,
    "category"  "InquiryCategory",
    "message"   TEXT NOT NULL,
    "status"    "InquiryStatus" NOT NULL DEFAULT 'new',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Inquiry_status_idx" ON "Inquiry"("status");
CREATE INDEX IF NOT EXISTS "Inquiry_createdAt_idx" ON "Inquiry"("createdAt");
CREATE INDEX IF NOT EXISTS "Inquiry_userId_idx" ON "Inquiry"("userId");

-- 방문자 전환율(퍼널) 추적 (2026-06-13)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ConversionType') THEN
    CREATE TYPE "ConversionType" AS ENUM ('signup_started', 'signup_completed', 'first_login', 'onboarding_completed');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "Visitor" (
    "anonymousId"     TEXT NOT NULL,
    "firstSeen"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitCount"      INTEGER NOT NULL DEFAULT 0,
    "ftSource"        TEXT,
    "ftMedium"        TEXT,
    "ftCampaign"      TEXT,
    "ftContent"       TEXT,
    "ftTerm"          TEXT,
    "ltSource"        TEXT,
    "ltMedium"        TEXT,
    "ltCampaign"      TEXT,
    "ltContent"       TEXT,
    "ltTerm"          TEXT,
    "convertedUserId" TEXT,
    "convertedAt"     TIMESTAMP(3),
    "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("anonymousId")
);
CREATE INDEX IF NOT EXISTS "Visitor_convertedUserId_idx" ON "Visitor"("convertedUserId");
CREATE INDEX IF NOT EXISTS "Visitor_ftSource_idx" ON "Visitor"("ftSource");
CREATE INDEX IF NOT EXISTS "Visitor_firstSeen_idx" ON "Visitor"("firstSeen");

CREATE TABLE IF NOT EXISTS "VisitorEvent" (
    "id"          TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "path"        TEXT,
    "referrer"    TEXT,
    "utmSource"   TEXT,
    "utmMedium"   TEXT,
    "utmCampaign" TEXT,
    "utmContent"  TEXT,
    "utmTerm"     TEXT,
    "fbclid"      TEXT,
    "gclid"       TEXT,
    "deviceType"  TEXT,
    "ipHash"      TEXT,
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VisitorEvent_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "VisitorEvent_anonymousId_idx" ON "VisitorEvent"("anonymousId");
CREATE INDEX IF NOT EXISTS "VisitorEvent_createdAt_idx" ON "VisitorEvent"("createdAt");
CREATE INDEX IF NOT EXISTS "VisitorEvent_utmSource_idx" ON "VisitorEvent"("utmSource");

CREATE TABLE IF NOT EXISTS "ConversionEvent" (
    "id"          TEXT NOT NULL,
    "anonymousId" TEXT,
    "userId"      TEXT,
    "type"        "ConversionType" NOT NULL,
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ConversionEvent_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "ConversionEvent_anonymousId_idx" ON "ConversionEvent"("anonymousId");
CREATE INDEX IF NOT EXISTS "ConversionEvent_userId_idx" ON "ConversionEvent"("userId");
CREATE INDEX IF NOT EXISTS "ConversionEvent_type_idx" ON "ConversionEvent"("type");
CREATE INDEX IF NOT EXISTS "ConversionEvent_createdAt_idx" ON "ConversionEvent"("createdAt");

-- FK (있으면 건너뜀)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'VisitorEvent_anonymousId_fkey') THEN
    ALTER TABLE "VisitorEvent" ADD CONSTRAINT "VisitorEvent_anonymousId_fkey"
      FOREIGN KEY ("anonymousId") REFERENCES "Visitor"("anonymousId") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ConversionEvent_anonymousId_fkey') THEN
    ALTER TABLE "ConversionEvent" ADD CONSTRAINT "ConversionEvent_anonymousId_fkey"
      FOREIGN KEY ("anonymousId") REFERENCES "Visitor"("anonymousId") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
