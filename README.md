<br>

<div align="center">

[<img src="https://blogger.googleusercontent.com/img/a/AVvXsEgPisbrG0davW68M3Y1gbEE-wJp6Ia4JgqNAR10mh6gqL3OvDFIKQKFFSeILjUWXdWB0N1MOkWYYhXvI1K3OQuENPgzKDVW6iyWpyiyse07qSRrUK3MqsvF142UTVBGFRPKXjiUuHr-M6-aZitvAvhZyjuVztW4dlNXrRSUHo2M3oXB_iOQb6PxJnmyNTkf" width="144"/>]()

  <h1 align="center">QurbanQu</h1>

  <p align="center">
    <strong>Web Apps Platform For Posting Ads Qurban Animals</strong>
  </p>

[![build](https://img.shields.io/badge/version-v1.0.0-blue)]()
[![release](https://img.shields.io/badge/release-2025-green)]()
[![id](https://img.shields.io/badge/lang-id-red)]()


![qurbanqu Homepage](https://blogger.googleusercontent.com/img/a/AVvXsEjiPJXYfldNNU2PtRC_w4BA2dgBEa8tu9IRYl8sMup3NliAbnlAtfHNE7C7mu-In1YBFbEb6Q3ExInTu-umMepPxMXaDdlY2laKa_rgFWPhcYpGO6pP6I7eyQpfdmXdox7SAYIiGD0z-ffHEnFfZYyfcRBXlP_-DaC8KQzburLwWzi3kY74aYehziaxfRnD)

</div>

## Table of Contents

- [Table of Contents]()
- [About]()
- [Features]()
- [Installation]()
- [Build from source]()
  - [Project Structure]()
  - [Install Node.js]()
  - [Setup NEXT.js Framework]()
  - [Install Depedencies]()
- [Environment variables]()
- [Running]()
- [Need To Improve from your side]()
- [License]()

## About

**QurbanQu** is a **Web Selling Ads Platform** with light, design ready, and dashboard included embeded with **Whatsapp CTA**, **TAWK.IO**, and **MongoDB**.
The WEB is build using framework NEXT.JS, using MongoDB Database, and npm plugins. written using typescript.

## Features

- Login
- Registration
- Posting Ads
- Whatsapp Integration
- Admin Dashboard
- Live Chat

## Installation

Follow the steps below to install:

1. Install The Lastest Version of Node.js
2. Clone the latest version of QurbanQu from the page.
3. Run the downloaded file.
4. Enjoy Qurbanqu!

## Build from source

### Project Structure

- App
   - (public)
       - ads
       - forgot-password
       - login
       - privacy
       - register
       - reset-password
   - admin
       - dashboard
       - profile
       - upload
       - privacy
       - register
       - reset-password
   - api
       - ads
       - forgot-password
       - login
       - logout
       - profile
       - register
       - reset-password
       - session
       - upload
   - components
- lib
- models
- public
   - default
   - logo
   - static
   - uploads
- scripts
- utils
- .env.local

### Install Node.js

Ensure you have Node.js installed on your machine. If not, download and install it from [nodejs.org](https://nodejs.org/).


### Setup NEXT.js Framework

```bash
npx create-next-app@latest qurbanqu --typescript --tailwind --eslint --app --src-dir
```
replace this all clone repo file to qurbanqu file

### Install Dependencies

Install the required NEXT depedencies.

```bash
npm install mongoose jsonwebtoken javascript-obfuscator bcryptjs react-hot-toast sonner keen-slider
```

## Environment variables

Fill the confidential information inside root file called.

```bash
.env.local
```

Replace '<<....>>' using real enviroment

```bash
MONGODB_URI=mongodb://<<....>>:<<....>>@localhost:<<....>>/?authSource=admin&authMechanism=SCRAM-SHA-256
MONGO_USER=<<....>> #token
MONGO_PASS=<<....>> #token
NEXT_PUBLIC_TAWK_URL=<<....>> #link
JWT_SECRET=<<....>> #token
ALLOWED_DOMAINS=<<....>> #for email validation
RESET_TOKEN_SECRET=<<....>> #token
RESET_TOKEN_EXPIRES_IN=<<....>> #e.g 1h
RESEND_API_KEY=<<....>> #api-key on resend.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Running

This web application is tested running using DEV, not yet tested using Build:

```bash
npm run dev
```

## Need To Improve from your side

Separate the image ads using cloud and give the 403 if user access the image add resource without cookies.

Email Notification for new post and verification registration.

## License

Free For Everyone
