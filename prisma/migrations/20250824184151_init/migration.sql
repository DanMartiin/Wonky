-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "notes" TEXT,
    "guestCount" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "checkInTime" TEXT NOT NULL,
    "checkOutTime" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "confirmationToken" TEXT NOT NULL,
    "editToken" TEXT NOT NULL,
    "cancelToken" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "confirmed_bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingId" TEXT NOT NULL,
    "confirmedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "confirmed_bookings_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "bookings_confirmationToken_key" ON "bookings"("confirmationToken");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_editToken_key" ON "bookings"("editToken");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_cancelToken_key" ON "bookings"("cancelToken");

-- CreateIndex
CREATE UNIQUE INDEX "confirmed_bookings_bookingId_key" ON "confirmed_bookings"("bookingId");
