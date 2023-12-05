<h2>Live Chat Application</h2>

---

<h2>Date of Submission</h2>

```
2023-12-05
```

<h2>Instructions to Run Assignment Locally</h2>

- Clone the repository to your local machine.
- Navigate to the "server" directory.
- Install the dependencies by running `npm install`.
- Create a `.env.dev` file and add the following environment variables:

```
PORT=
MONGODB_URI=
```

```
#Example :
PORT=3000
MONGODB_URI=mongodb://localhost:27017/chat-dev
```

    Run the server by running npm run dev.

- Open new terminal.
- Navigate to the "client" directory.
- Install the dependencies by running `npm install`.
- Create a `.env` file and add the following environment variables:

```
REACT_APP_API_URL=
```

```
#Example :
REACT_APP_API_URL="http://localhost:5555"
```

    Run the server by running npm run start.

<h2>Time Spent</h2>

6-7 hours

<h2>Assumptions Made</h2>

    The provided code is complete and functional.
    The database is already set up and running.

<h2>Shortcuts/Compromises Made</h2>

- The ChatModel schema does not include any validation for the username or message fields.
- The UserController does not validate the room field when creating or deleting a user.
- The ChatController does not validate the page, perPage, or room query parameters.

<h2>Ensuring Application Readiness for Production</h2>

To ensure the application is ready for production, the following steps should be taken:

- Thorough testing: Perform comprehensive testing to ensure the application is bug-free and can handle various user scenarios and load conditions.
- Deployment: Implement a proper deployment strategy, such as continuous integration and continuous delivery (CI/CD), to automate the process of building, testing, and deploying the application to production.
- Monitoring: Establish monitoring systems to track application performance, resource usage, and error logs to identify and address potential issues promptly.
- Security: Implement robust security measures, such as user authentication, authorization, and input validation, to protect against vulnerabilities and attacks.

<h2>Ensuring a Smooth User Experience for 1000's of Users Simultaneously</h2>

To ensure a smooth user experience for a large number of concurrent users, consider the following:

- Scalable infrastructure: Employ a scalable infrastructure that can handle increasing demands by using load balancers, autoscaling, and distributed data storage.
- Real-time communication: Utilize real-time communication protocols like WebSockets or Server-Sent Events (SSE) to maintain a responsive user experience.
- Efficient data management: Optimize database queries and caching mechanisms to minimize response times and reduce server load.
- Load testing: Conduct load testing to simulate high traffic scenarios and identify performance bottlenecks.

<h2>Key Steps to Ensure Application Security</h2>

- User authentication and authorization: Implement secure user authentication mechanisms, such as OAuth or JSON Web Tokens (JWTs), to verify user identities and control access to resources.
- Input validation: Validate user inputs to prevent malicious code injection (SQL injection, cross-site scripting) and protect against data tampering.
- Vulnerability scanning: Regularly scan the application code and dependencies for known vulnerabilities and apply security patches promptly.
- Secure coding practices: Follow secure coding guidelines to avoid common coding errors that can lead to security vulnerabilities.

<h2>Outstanding Considerations</h2>

- Implement user presence indicators to show whether users are online or offline.
- Enable file sharing or media streaming within the chat rooms.
- Integrate with third-party services like chatbots or analytics platforms.
