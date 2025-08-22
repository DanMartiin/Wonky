# Wonky Malden Book Nook

A full-stack booking application for a cozy reading nook, built with Next.js, TypeScript, and TailwindCSS.

## Features

- **Modern Design**: Clean, responsive design inspired by natural aesthetics
- **Booking System**: Complete booking form with validation
- **Email Verification**: Secure email verification before booking confirmation
- **Email Notifications**: Automatic confirmation emails to users and admins
- **Form Validation**: Comprehensive validation including test email rejection
- **Toast Notifications**: User-friendly success/error messages
- **Database Storage**: SQLite database for storing verified bookings
- **Responsive Design**: Fully responsive using TailwindCSS

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS
- **Database**: SQLite
- **Form Handling**: React Hook Form with Zod validation
- **Email**: Nodemailer
- **Notifications**: React Hot Toast
- **UI Components**: Custom reusable components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wonky-malden-book-nook
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@wonkymalden.com

# Application Settings
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database
DATABASE_URL=./bookings.db
```

### Email Setup

To enable email functionality, you'll need to:

1. **For Gmail**: 
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password in `EMAIL_PASS`

2. **For other providers**: 
   - Update the transporter configuration in `lib/email.ts`

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── bookings/      # Booking CRUD operations
│   │   └── verify/        # Email verification
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── verify/            # Verification page
├── components/            # Reusable components
│   ├── ui/               # UI components (Button, Input, etc.)
│   ├── BookingForm.tsx   # Booking form component
│   └── Header.tsx        # Header component
├── lib/                  # Utility functions
│   ├── database.ts       # Database operations
│   ├── email.ts          # Email functionality
│   ├── validation.ts     # Form validation schemas
│   └── utils.ts          # Utility functions
└── scripts/              # Database setup scripts
```

## API Endpoints

### POST /api/bookings
Creates a new booking with email verification.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "date": "2024-01-15",
  "time": "14:00",
  "notes": "Optional notes"
}
```

**Response:**
```json
{
  "message": "Booking created successfully. Please check your email to verify your booking.",
  "bookingId": 1
}
```

### GET /api/bookings
Retrieves all verified bookings.

### POST /api/verify
Verifies a booking using the email token.

**Request Body:**
```json
{
  "token": "verification-token"
}
```

## Validation Rules

- **Name**: Minimum 2 characters
- **Email**: Valid email format, no test emails (test@test.com, abc@abc.com, etc.)
- **Date**: Cannot be in the past
- **Time**: Required
- **Notes**: Optional
- **Email Uniqueness**: Only one booking per email address

## Database Schema

### bookings table
- `id` (INTEGER PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `email` (TEXT NOT NULL UNIQUE)
- `date` (TEXT NOT NULL)
- `time` (TEXT NOT NULL)
- `notes` (TEXT)
- `is_verified` (BOOLEAN DEFAULT FALSE)
- `verification_token` (TEXT)
- `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email business@wonkymalden.com or call 1300 456 789.
