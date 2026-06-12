ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "lastSeenAt" TIMESTAMP(3);

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
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'ConnectionInvite_childId_fkey'
  ) THEN
    ALTER TABLE "ConnectionInvite" ADD CONSTRAINT "ConnectionInvite_childId_fkey"
      FOREIGN KEY ("childId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'ConnectionInvite_acceptedById_fkey'
  ) THEN
    ALTER TABLE "ConnectionInvite" ADD CONSTRAINT "ConnectionInvite_acceptedById_fkey"
      FOREIGN KEY ("acceptedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'ConnectionInvite_connectionId_fkey'
  ) THEN
    ALTER TABLE "ConnectionInvite" ADD CONSTRAINT "ConnectionInvite_connectionId_fkey"
      FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
