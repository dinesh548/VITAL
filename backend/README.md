# Medic Connect Backend

This is the backend server for the Medic Connect telemedicine platform.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

1. Copy `config.env` and update with your MongoDB credentials:

   ```bash
   cp config.env .env
   ```

2. Update the following variables in `.env`:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure secret key for JWT tokens
   - `PORT`: Server port (default: 5000)
   - `CLIENT_URL`: Frontend URL (default: http://localhost:5173)

### 3. MongoDB Setup

1. Create a MongoDB Atlas account or use local MongoDB
2. Create a database named `medicconnect`
3. The following collections will be created automatically:
   - `doctors` - Doctor profiles and authentication
   - `patients` - Patient information
   - `medicines` - Medicine database
   - `consultations` - Consultation records

### 4. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

### 5. API Endpoints

#### Authentication

- `POST /api/auth/register` - Register new doctor
- `POST /api/auth/login` - Doctor login
- `GET /api/auth/me` - Get current doctor profile
- `PUT /api/auth/profile` - Update doctor profile

#### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/:id/consultations` - Get doctor's consultations
- `PUT /api/doctors/availability` - Update availability status

#### Patients

- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get patient by ID
- `GET /api/patients/:id/consultations` - Get patient's consultations

#### Medicines

- `GET /api/medicines` - Get all medicines with search/filter
- `GET /api/medicines/:id` - Get medicine by ID
- `GET /api/medicines/search/:query` - Search medicines

#### Consultations

- `POST /api/consultations` - Create new consultation
- `GET /api/consultations` - Get all consultations
- `GET /api/consultations/:id` - Get consultation by ID
- `PUT /api/consultations/:id/status` - Update consultation status
- `PUT /api/consultations/:id/diagnosis` - Add diagnosis and treatment

### 6. Health Check

Visit `http://localhost:5000/api/health` to verify the server is running.

## Database Schema

### Doctor Model

- Personal information (name, email, phone)
- Professional details (specialization, license, experience)
- Availability and consultation types
- Authentication (password hashed with bcrypt)

### Patient Model

- Personal information (name, email, phone, age, gender)
- Medical history and allergies
- Emergency contacts
- Preferred language

### Medicine Model

- Medicine details (name, generic name, manufacturer)
- Category and form (tablet, syrup, etc.)
- Dosage and strength information
- Side effects and contraindications
- Alternative medicines

### Consultation Model

- Patient and doctor references
- Consultation type (video, audio, IVR)
- Status and scheduling information
- Diagnosis, treatment, and prescription data
- Follow-up requirements

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation with express-validator
- Protected routes with middleware

## Error Handling

- Global error handler
- Validation error responses
- Proper HTTP status codes
- Detailed error messages in development mode
