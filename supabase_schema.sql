-- ============================================================
-- 마음 잇기 — Supabase 전체 스키마
-- Supabase 대시보드 → SQL Editor → 새 쿼리 → 붙여넣기 → Run
-- ============================================================

-- Enums
CREATE TYPE "Role" AS ENUM ('child', 'parent', 'both');
CREATE TYPE "Tone" AS ENUM ('light', 'deep');
CREATE TYPE "SensitiveStatus" AS ENUM ('active', 'paused_health', 'deceased', 'memorial');
CREATE TYPE "AnswerFormat" AS ENUM ('text', 'photo', 'video', 'audio');
CREATE TYPE "BookStatus" AS ENUM ('draft', 'generated', 'delivered');
CREATE TYPE "BookEditionType" AS ENUM ('interim', 'final');
CREATE TYPE "QuestionSource" AS ENUM ('ai', 'curated', 'followup');

-- User
CREATE TABLE IF NOT EXISTS "User" (
    "id"               TEXT NOT NULL,
    "email"            TEXT,
    "phone"            TEXT,
    "name"             TEXT NOT NULL,
    "role"             "Role" NOT NULL,
    "avatarUrl"        TEXT,
    "passwordHash"     TEXT,
    "consentAnalytics" BOOLEAN NOT NULL DEFAULT false,
    "consentAt"        TIMESTAMP(3),
    "lastSeenAt"       TIMESTAMP(3),
    "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "User_phone_key" ON "User"("phone");

-- Session
CREATE TABLE IF NOT EXISTS "Session" (
    "id"        TEXT NOT NULL,
    "userId"    TEXT NOT NULL,
    "token"     TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Session_token_key" ON "Session"("token");
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE INDEX IF NOT EXISTS "Session_token_idx" ON "Session"("token");

-- Connection
CREATE TABLE IF NOT EXISTS "Connection" (
    "id"              TEXT NOT NULL,
    "fromUserId"      TEXT NOT NULL,
    "toUserId"        TEXT NOT NULL,
    "intimacy"        INTEGER NOT NULL DEFAULT 3,
    "cohabiting"      BOOLEAN NOT NULL DEFAULT false,
    "hasConflict"     BOOLEAN NOT NULL DEFAULT false,
    "responseChannel" TEXT NOT NULL DEFAULT 'app',
    "tone"            "Tone" NOT NULL DEFAULT 'light',
    "sensitiveStatus" "SensitiveStatus" NOT NULL DEFAULT 'active',
    "currentDepth"    INTEGER NOT NULL DEFAULT 1,
    "skipCount"       INTEGER NOT NULL DEFAULT 0,
    "answerCount"     INTEGER NOT NULL DEFAULT 0,
    "inviteCode"      TEXT,
    "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Connection_inviteCode_key" ON "Connection"("inviteCode");
CREATE INDEX IF NOT EXISTS "Connection_fromUserId_idx" ON "Connection"("fromUserId");
CREATE INDEX IF NOT EXISTS "Connection_toUserId_idx" ON "Connection"("toUserId");

-- ConnectionInvite
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

-- Question
CREATE TABLE IF NOT EXISTS "Question" (
    "id"           TEXT NOT NULL,
    "connectionId" TEXT NOT NULL,
    "body"         TEXT NOT NULL,
    "depth"        INTEGER NOT NULL,
    "chapterTag"   TEXT,
    "personTag"    TEXT,
    "eraTag"       TEXT,
    "source"       "QuestionSource" NOT NULL DEFAULT 'curated',
    "sentAt"       TIMESTAMP(3),
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "Question_connectionId_idx" ON "Question"("connectionId");
CREATE INDEX IF NOT EXISTS "Question_sentAt_idx" ON "Question"("sentAt");

-- Answer
CREATE TABLE IF NOT EXISTS "Answer" (
    "id"          TEXT NOT NULL,
    "questionId"  TEXT NOT NULL,
    "format"      "AnswerFormat" NOT NULL DEFAULT 'text',
    "body"        TEXT,
    "mediaUrl"    TEXT,
    "transcript"  TEXT,
    "skipped"     BOOLEAN NOT NULL DEFAULT false,
    "receivedVia" TEXT NOT NULL DEFAULT 'app',
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Answer_questionId_key" ON "Answer"("questionId");

-- Reaction
CREATE TABLE IF NOT EXISTS "Reaction" (
    "id"         TEXT NOT NULL,
    "answerId"   TEXT NOT NULL,
    "userId"     TEXT NOT NULL,
    "emoji"      TEXT,
    "comment"    TEXT,
    "isFollowup" BOOLEAN NOT NULL DEFAULT false,
    "notified"   BOOLEAN NOT NULL DEFAULT false,
    "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "Reaction_answerId_idx" ON "Reaction"("answerId");
CREATE INDEX IF NOT EXISTS "Reaction_userId_idx" ON "Reaction"("userId");

-- BookEdition
CREATE TABLE IF NOT EXISTS "BookEdition" (
    "id"           TEXT NOT NULL,
    "connectionId" TEXT NOT NULL,
    "rangeFrom"    TIMESTAMP(3) NOT NULL,
    "rangeTo"      TIMESTAMP(3),
    "status"       "BookStatus" NOT NULL DEFAULT 'draft',
    "editionType"  "BookEditionType" NOT NULL DEFAULT 'interim',
    "chapterData"  JSONB,
    "pdfUrl"       TEXT,
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BookEdition_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "BookEdition_connectionId_idx" ON "BookEdition"("connectionId");

-- CuratedQuestion
CREATE TABLE IF NOT EXISTS "CuratedQuestion" (
    "id"         TEXT NOT NULL,
    "body"       TEXT NOT NULL,
    "depth"      INTEGER NOT NULL,
    "chapterTag" TEXT NOT NULL,
    "personTag"  TEXT,
    "eraTag"     TEXT,
    "language"   TEXT NOT NULL DEFAULT 'ko',
    CONSTRAINT "CuratedQuestion_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "CuratedQuestion_depth_idx" ON "CuratedQuestion"("depth");
CREATE INDEX IF NOT EXISTS "CuratedQuestion_chapterTag_idx" ON "CuratedQuestion"("chapterTag");

-- AccessLog
CREATE TABLE IF NOT EXISTS "AccessLog" (
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
CREATE INDEX IF NOT EXISTS "AccessLog_userId_idx" ON "AccessLog"("userId");
CREATE INDEX IF NOT EXISTS "AccessLog_createdAt_idx" ON "AccessLog"("createdAt");

-- Admin
CREATE TABLE IF NOT EXISTS "Admin" (
    "id"     TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Admin_userId_key" ON "Admin"("userId");
CREATE INDEX IF NOT EXISTS "Admin_userId_idx" ON "Admin"("userId");

-- AdminAudit
CREATE TABLE IF NOT EXISTS "AdminAudit" (
    "id"        TEXT NOT NULL,
    "adminId"   TEXT NOT NULL,
    "action"    TEXT NOT NULL,
    "targetIds" TEXT[] NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminAudit_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "AdminAudit_adminId_idx" ON "AdminAudit"("adminId");

-- _prisma_migrations (Prisma가 마이그레이션 추적에 사용)
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           TIMESTAMPTZ,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        TIMESTAMPTZ,
    "started_at"            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "applied_steps_count"   INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id")
);

-- Foreign Keys
ALTER TABLE "Session"     ADD CONSTRAINT "Session_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Connection"  ADD CONSTRAINT "Connection_fromUserId_fkey"
    FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON UPDATE CASCADE;
ALTER TABLE "Connection"  ADD CONSTRAINT "Connection_toUserId_fkey"
    FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON UPDATE CASCADE;
ALTER TABLE "ConnectionInvite" ADD CONSTRAINT "ConnectionInvite_childId_fkey"
    FOREIGN KEY ("childId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ConnectionInvite" ADD CONSTRAINT "ConnectionInvite_acceptedById_fkey"
    FOREIGN KEY ("acceptedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ConnectionInvite" ADD CONSTRAINT "ConnectionInvite_connectionId_fkey"
    FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Question"    ADD CONSTRAINT "Question_connectionId_fkey"
    FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON UPDATE CASCADE;
ALTER TABLE "Answer"      ADD CONSTRAINT "Answer_questionId_fkey"
    FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON UPDATE CASCADE;
ALTER TABLE "Reaction"    ADD CONSTRAINT "Reaction_answerId_fkey"
    FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON UPDATE CASCADE;
ALTER TABLE "Reaction"    ADD CONSTRAINT "Reaction_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON UPDATE CASCADE;
ALTER TABLE "BookEdition" ADD CONSTRAINT "BookEdition_connectionId_fkey"
    FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON UPDATE CASCADE;
ALTER TABLE "AccessLog"   ADD CONSTRAINT "AccessLog_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Admin"       ADD CONSTRAINT "Admin_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- updatedAt 자동 갱신 트리거 (Prisma는 앱 레벨에서 처리하지만 DB 수준에서도 보장)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW."updatedAt" = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['User','Connection','Answer','BookEdition'] LOOP
    EXECUTE format('CREATE TRIGGER trg_updatedAt BEFORE UPDATE ON "%s"
      FOR EACH ROW EXECUTE FUNCTION update_updated_at()', t);
  END LOOP;
END $$;
