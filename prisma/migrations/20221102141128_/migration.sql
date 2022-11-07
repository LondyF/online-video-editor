-- CreateTable
CREATE TABLE "ProjectCollaborators" (
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ProjectCollaborators_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectCollaborators_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCollaborators_projectId_userId_key" ON "ProjectCollaborators"("projectId", "userId");
