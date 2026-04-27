# Truck Dispatching Management System — Backend

Ye backend Node.js + Express.js + MongoDB + JWT par bana hai. Is backend mein ye modules included hain:

- Register / Login with JWT
- Customer, Driver, Admin roles
- Quote API
- Contact API
- Load API
- Admin driver management
- Driver assigned loads + status update
- Protected routes
- Admin seed command

## 1. Backend setup

Backend folder open karo:

```bash
cd truck-dispatch-backend
npm install
```

`.env.example` file ko copy karke `.env` banao:

```bash
cp .env.example .env
```

Windows CMD mein:

```bash
copy .env.example .env
```

## 2. MongoDB start karo

Local MongoDB use kar rahe ho to MongoDB service start honi chahiye.

`.env` mein default local URI:

```env
MONGO_URI=mongodb://127.0.0.1:27017/truck_dispatch_db
```

MongoDB Atlas use karna ho to apna Atlas connection string yahan paste karo.

## 3. Server run karo

```bash
npm run dev
```

Backend yahan chalega:

```text
http://localhost:5000
```

## 4. Admin account banao

`.env` mein admin details change kar sakte ho:

```env
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin12345
```

Phir command run karo:

```bash
npm run seed:admin
```

Admin login:

```json
{
  "email": "admin@example.com",
  "password": "admin12345",
  "role": "admin"
}
```

## 5. Frontend connect karna

Frontend ke `src` folder ke andar `api.js` file banao:

```js
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default API
```

## 6. Important API endpoints

### Auth

Register:

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "password": "123456",
  "role": "customer"
}
```

Driver register:

```json
{
  "name": "Driver One",
  "email": "driver@example.com",
  "password": "123456",
  "role": "driver",
  "phone": "03001234567",
  "truckNumber": "ABC-123",
  "licenseNumber": "LIC-9988"
}
```

Login:

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "ali@example.com",
  "password": "123456",
  "role": "customer"
}
```

Current user:

```http
GET /api/auth/me
Authorization: Bearer TOKEN
```

### Quotes

Create quote, public route:

```http
POST /api/quotes
```

Body:

```json
{
  "name": "Haider",
  "email": "haider@example.com",
  "pickupLocation": "Karachi",
  "dropLocation": "Lahore",
  "weight": 2,
  "distance": 1200
}
```

Get all quotes, admin only:

```http
GET /api/quotes
Authorization: Bearer ADMIN_TOKEN
```

Update quote status, admin only:

```http
PUT /api/quotes/:id/status
Authorization: Bearer ADMIN_TOKEN
```

Body:

```json
{
  "status": "Approved"
}
```

### Contacts

Create contact message, public route:

```http
POST /api/contacts
```

Body:

```json
{
  "name": "Haider",
  "email": "haider@example.com",
  "message": "I need dispatch service."
}
```

Get all messages, admin only:

```http
GET /api/contacts
Authorization: Bearer ADMIN_TOKEN
```

### Loads

Create load, customer/admin:

```http
POST /api/loads
Authorization: Bearer TOKEN
```

Body:

```json
{
  "customerName": "Haider",
  "customerEmail": "haider@example.com",
  "pickupLocation": "Karachi",
  "dropLocation": "Lahore",
  "weight": 2,
  "distance": 1200,
  "notes": "Handle carefully"
}
```

Get loads:

```http
GET /api/loads
Authorization: Bearer TOKEN
```

Admin ko all loads milenge. Driver ko sirf assigned loads milenge. Customer ko apne loads milenge.

Assign driver, admin only:

```http
PUT /api/loads/:id/assign
Authorization: Bearer ADMIN_TOKEN
```

Body:

```json
{
  "driverId": "DRIVER_MONGODB_ID"
}
```

Update load status, admin/assigned driver:

```http
PUT /api/loads/:id/status
Authorization: Bearer TOKEN
```

Body:

```json
{
  "status": "In Transit"
}
```

Allowed statuses:

```text
Pending, Assigned, Picked Up, In Transit, Delivered, Cancelled
```

### Users / Drivers

Get all users, admin only:

```http
GET /api/users
Authorization: Bearer ADMIN_TOKEN
```

Get drivers, admin only:

```http
GET /api/users/drivers
Authorization: Bearer ADMIN_TOKEN
```

Create driver, admin only:

```http
POST /api/users/drivers
Authorization: Bearer ADMIN_TOKEN
```

Body:

```json
{
  "name": "Bilal Driver",
  "email": "bilal@example.com",
  "password": "123456",
  "phone": "03000000000",
  "truckNumber": "TRK-123",
  "licenseNumber": "LIC-123"
}
```

Driver availability update, driver only:

```http
PUT /api/users/driver/availability
Authorization: Bearer DRIVER_TOKEN
```

Body:

```json
{
  "isAvailable": false
}
```

## 7. Simple frontend usage examples

### Login page submit

```js
import API from '../api'

const res = await API.post('/auth/login', form)
localStorage.setItem('token', res.data.token)
localStorage.setItem('user', JSON.stringify(res.data.user))

if (res.data.user.role === 'admin') navigate('/admin-dashboard')
else if (res.data.user.role === 'driver') navigate('/driver-dashboard')
else navigate('/')
```

### Register page submit

```js
import API from '../api'

const res = await API.post('/auth/register', form)
localStorage.setItem('token', res.data.token)
localStorage.setItem('user', JSON.stringify(res.data.user))
```

### Quote page submit

```js
import API from '../api'

const res = await API.post('/quotes', form)
setPrice(res.data.quote.estimatedPrice)
```

### Admin dashboard loads

```js
import API from '../api'

const res = await API.get('/loads')
setLoads(res.data)
```

### Driver dashboard assigned loads

```js
import API from '../api'

const res = await API.get('/loads')
setAssignedLoads(res.data)
```
