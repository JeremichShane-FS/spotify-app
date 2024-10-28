# 🎵 Spotify Web Application

A modern web application built with Next.js 15 that integrates with Spotify's API to provide a seamless music search and playback experience.

![Spotify-App](/public/images/screenshot.png)

## 📑 Table of Contents

- [🎵 Spotify Web Application](#-spotify-web-application)
  - [📑 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🛠️ Technologies](#️-technologies)
    - [Core](#core)
    - [Data Management \& API](#data-management--api)
    - [Authentication](#authentication)
    - [UI Components \& Styling](#ui-components--styling)
    - [Development \& Tooling](#development--tooling)
    - [Package Versions](#package-versions)
  - [🚀 Getting Started](#-getting-started)
  - [⚙️ Environment Variables](#️-environment-variables)
    - [Variable Descriptions:](#variable-descriptions)
    - [Database Options](#database-options)
  - [🔌 API Endpoints](#-api-endpoints)
    - [🎵 Spotify Search](#-spotify-search)
      - [Base URL](#base-url)
      - [Endpoints](#endpoints)
        - [Search](#search)
    - [🔐 Authentication](#-authentication)
      - [NextAuth Endpoints](#nextauth-endpoints)
    - [Rate Limits](#rate-limits)
    - [Error Responses](#error-responses)
    - [Authentication Requirements](#authentication-requirements)
  - [📂 Project Structure](#-project-structure)
  - [🔍 Key Components](#-key-components)
  - [🎨 Styling Approach](#-styling-approach)
  - [🔐 Authentication Flow](#-authentication-flow)
  - [📝 License](#-license)

## ✨ Features

- 🔍 Real-time search functionality for tracks, artists, and albums
- 🎵 Music playback for Spotify Premium users
- 🔐 Secure authentication via Spotify OAuth
- 💫 Smooth transitions and animations
- 📱 Fully responsive design
- 🎨 Spotify-inspired UI/UX

## 🛠️ Technologies

### Core

- ![Next.js 15](https://img.shields.io/badge/Next.js%2015-black?style=for-the-badge&logo=next.js&logoColor=white)
- ![React 18](https://img.shields.io/badge/React%2018-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

### Data Management & API

- ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Authentication

- ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-black?style=for-the-badge&logo=next.js&logoColor=white)
- ![OAuth](https://img.shields.io/badge/OAuth-2.0-green?style=for-the-badge)

### UI Components & Styling

- ![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

### Development & Tooling

- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
- ![use-debounce](https://img.shields.io/badge/use--debounce-blue?style=for-the-badge)

### Package Versions

```json
{
  "next": "^15.0.1",
  "react": "^18",
  "react-dom": "^18",
  "@tanstack/react-query": "^5.59.16",
  "@prisma/client": "^5.21.1",
  "mongodb": "^6.10.0",
  "next-auth": "^4.24.10",
  "use-debounce": "^10.0.4"
}
```

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JeremichShane-FS/spotify-app.git
   cd spotify-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file with necessary variables (see [Environment Variables](#️-environment-variables))
   <br>
4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Spotify API Credentials
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Database Configuration (Examples for different databases)
# MongoDB Example:
DATABASE_URL="mongodb://localhost:27017/spotify?replicaSet=rs0&authSource=admin&directConnection=true"

# PostgreSQL Example:
# DATABASE_URL="postgresql://user:password@localhost:5432/spotify"

# MySQL Example:
# DATABASE_URL="mysql://user:password@localhost:3306/spotify"
```

### Variable Descriptions:

- `SPOTIFY_CLIENT_ID`: Your Spotify application client ID (from Spotify Developer Dashboard)
- `SPOTIFY_CLIENT_SECRET`: Your Spotify application client secret (from Spotify Developer Dashboard)
- `NEXTAUTH_SECRET`: A secret string used to encrypt session data (generate using `openssl rand -base64 32`)
- `NEXTAUTH_URL`: The base URL of your application
- `DATABASE_URL`: Connection string for your chosen database (supports MongoDB, PostgreSQL, MySQL, etc. via Prisma)

### Database Options

This project uses Prisma as the ORM, which supports multiple databases:

- MongoDB
- PostgreSQL
- MySQL
- SQLite
- Microsoft SQL Server

Choose the database that best fits your needs and update the `DATABASE_URL` accordingly.

> **Note**: Never commit your actual `.env` file to version control. The above values are examples only.

## 🔌 API Endpoints

### 🎵 Spotify Search

#### Base URL

```
/api/spotify
```

#### Endpoints

##### Search

- **GET** `/api/spotify/search`
  - Search for tracks, artists, and albums
  - **Query Parameters:**
    - `q`: Search query string
  - **Response:**
    ```json
    {
      "tracks": {
        "items": [
          {
            "id": "string",
            "name": "string",
            "artists": [
              {
                "id": "string",
                "name": "string"
              }
            ],
            "album": {
              "id": "string",
              "name": "string",
              "images": [
                {
                  "url": "string",
                  "height": number,
                  "width": number
                }
              ]
            },
            "duration_ms": number
          }
        ]
      },
      "artists": {
        "items": [
          {
            "id": "string",
            "name": "string",
            "images": [
              {
                "url": "string",
                "height": number,
                "width": number
              }
            ]
          }
        ]
      },
      "albums": {
        "items": [
          {
            "id": "string",
            "name": "string",
            "images": [
              {
                "url": "string",
                "height": number,
                "width": number
              }
            ],
            "artists": [
              {
                "id": "string",
                "name": "string"
              }
            ]
          }
        ]
      }
    }
    ```

### 🔐 Authentication

#### NextAuth Endpoints

```
/api/auth/[...nextauth]
```

- **GET/POST** `/api/auth/signin`

  - Initiates Spotify OAuth flow
  - Redirects to Spotify login

- **GET/POST** `/api/auth/signout`

  - Signs out the user
  - Clears session

- **GET** `/api/auth/session`
  - Retrieves current session data
  - **Response:**
    ```json
    {
      "user": {
        "name": "string",
        "email": "string",
        "image": "string",
        "accessToken": "string",
        "refreshToken": "string"
      },
      "expires": "timestamp"
    }
    ```

### Rate Limits

- Spotify API rate limits apply
- Search endpoint: 20 requests per second
- Authentication tokens valid for 1 hour

### Error Responses

```json
{
  "error": "string",
  "status": number,
  "message": "string"
}
```

Common status codes:

- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error

### Authentication Requirements

- Endpoints requiring authentication will return `401` if no valid session exists
- Token refresh is handled automatically

## 📂 Project Structure

```
src/
├── app/                   # App router pages
├── components/
│   ├── buttons/          # Reusable button components
│   ├── context-menu/     # Context menu components
│   ├── layout/
│   │   ├── footer/
│   │   ├── header/
│   │   └── navbar/
│   ├── search-box/       # Search functionality
│   ├── search-input/     # Search input component
│   ├── search-results/   # Search results display
│   └── user/             # User-related components
├── hooks/                # Custom React hooks
├── lib/                  # Library configurations
├── sass/                 # Global styles
└── services/            # API and auth services
```

## 🔍 Key Components

- **SearchBox**: Main search interface
- **ResultsList**: Displays tracks, artists, and albums
- **Header/Navbar**: Navigation and user interface
- **AuthComponents**: Handles Spotify authentication

## 🎨 Styling Approach

- BEM methodology for clear, maintainable CSS
- SASS for enhanced styling capabilities
- Modular component-specific styles
- Global variables for consistent theming

## 🔐 Authentication Flow

1. User initiates login
2. Redirected to Spotify OAuth
3. Callback handled by NextAuth.js
4. Session established with necessary tokens

---

## 📝 License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)
