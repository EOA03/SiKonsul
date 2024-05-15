# SiKonsul_BE - Legal Advice and Consultation Web Application Backend

## Live Demonstrations

Discover the SiKonsul Web Application in action:

- **Netlify**: [Visit SiKonsul on Netlify](https://sikonsul.netlify.app/)
- **New Netlify**: [Visit SiKonsul on Netlify](https://sikonsul-dev.netlify.app/)

## Introduction

SiKonsul is an application provides a platform for users to seek legal advice and consultation from experienced attorneys through online channels. Whether you're facing a legal issue or simply need guidance on a matter, our platform connects you with qualified professionals to address your concerns effectively. In this document, you will find comprehensive details on the system's architecture, database design, and functionalities, aimed at equipping developers and stakeholders with a profound understanding of the project.

## System Architecture

At the core of SiKonsul_BE's backend is a robust framework powered by:

- **Express.js**: A lightweight and flexible Node.js web application framework that provides a rich set of features for web and mobile applications.
- **Prisma ORM**: A next-generation ORM for Node.js and TypeScript, Prisma facilitates easy and reliable database access, schema migration, and complex data modeling.

This backend architecture is designed to efficiently handle HTTP requests, ensuring secure, scalable, and maintainable code.

## Database Design

The SiKonsul_BE application utilizes a PostgreSQL database, elegantly managed by Prisma ORM to ensure data integrity, facilitate complex queries, and manage relationships. Below is the schema diagram illustrating the database structure:

![Database Schema](/assets/images/Database_schema.png)

## Features

- **User Management**: Secure registration, authentication, and user profile management.
- **Lawyer Management**: Secure registration, authentication, and lawyer profile management.
- **News Management**: Real-Time information platform for lawyers and users.
- **Specialization Management**: Search lawyers by their areas of expertise.

## Getting Started

### Prerequisites

- Node.js (v12 or higher recommended)
- PostgreSQL database

### Setup Instructions

1. **Clone the Repository**: `git clone [repository_url]`.
2. **Project Setup**: Navigate to the `SiKonsul_BE` directory and install dependencies with `npm install`.
3. **Environment Configuration**: Copy `.env.example` to `.env` and adjust the settings to match your development environment.
4. **Database Migration**: Apply database migrations using `npx prisma migrate dev`.
5. **Development Server**: Launch the backend server with `npm run dev`.

## Usage

With the backend server operational, SiKonsul_BE will process incoming requests as per the defined route handlers and controllers. We encourage developers to review the API documentation for detailed endpoint descriptions and interaction guidelines.

## Additional Repo
This project have dependency with several repo for User side and Lawyer side. You can check the repos at <br>

### User Apps
> https://github.com/next-3-revou/sikonsul-fe-dev

### Lawyer Apps
> https://github.com/next-3-revou/sikonsul-lawyer-dev

## API Documentation

Access comprehensive API documentation through our Postman collection:

- [View Postman Collection](https://documenter.getpostman.com/view/29009474/2sA3Bj9ZaR)
