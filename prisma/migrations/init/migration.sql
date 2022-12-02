-- CreateEnum
CREATE TYPE "page_identification" AS ENUM ('urlPath', 'fullUrl', 'pageTitleHtmlTag', 'pageTitleMetaOg');

-- CreateTable
CREATE TABLE "comments" (
    "sender_name" TEXT,
    "sender_email" TEXT,
    "page" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "site" VARCHAR(50) NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sites" (
    "owner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id" VARCHAR(50) NOT NULL,
    "page_identification" "page_identification" NOT NULL,
    "reactions_enabled" BOOLEAN NOT NULL,
    "comment_box_above" BOOLEAN NOT NULL,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "username" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

