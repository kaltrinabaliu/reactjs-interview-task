# React + TypeScript + Vite

This project is built using React, TypeScript, and Vite to create a responsive, modern web application. The application is supported by a JSON Server as a mock backend.
git clone https://github.com/kaltrinabaliu/reactjs-interview-task.git
cd reactjs-interview-task



Run the server side: Ensure json-server is installed globally or locally in your project.

json-server --watch db.json




To run this app

npm i

npm run dev




To make the React + TypeScript + Vite app more secure:

Sanitize Input: Prevent XSS by sanitizing and validating all user input.

Authentication/Authorization: Use JWT for authentication and role-based access control.

Secure API Endpoints: Use HTTPS, add rate-limiting, and configure CORS to only allow trusted domains.

Security Headers: Use libraries like helmet to set HTTP security headers.




To scale the app for millions of records:

Database: Use scalable databases (e.g., PostgreSQL, MongoDB) with indexing and sharding.

Pagination: Implement pagination or infinite scrolling.

Caching: Use in-memory caches like Redis.

Load Balancing: Distribute traffic with load balancers and auto-scaling infrastructure.

Data Transfer: Optimize APIs (GraphQL or lightweight REST) and compress responses.

Asynchronous Tasks: Offload heavy tasks to background workers.

Microservices & CDN: Use microservices and CDNs for efficient asset delivery.
