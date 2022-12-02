/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PageIdentification" AS ENUM ('urlPath', 'fullUrl', 'pageTitleHtmlTag', 'pageTitleMetaOg');

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "pages";

-- DropTable
DROP TABLE "sites";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "page_identification";

-- CreateTable
CREATE TABLE "Comment" (
    "senderId" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "siteId" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "pageIdentification" "PageIdentification" NOT NULL,
    "reactionsEnabled" BOOLEAN NOT NULL,
    "commentBoxAbove" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
