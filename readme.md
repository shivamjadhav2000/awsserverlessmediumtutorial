# AWS Serverless API with React Frontend

## Overview

This project demonstrates a serverless architecture built using AWS services. The backend is implemented using AWS Lambda, API Gateway, DynamoDB, and S3, while the frontend is developed with React and styled using Tailwind CSS.

## Table of Contents

- [Project Architecture](#project-architecture)
- [Backend](#backend)
  - [AWS Lambda](#aws-lambda)
  - [API Gateway](#api-gateway)
  - [DynamoDB](#dynamodb)
  - [S3](#s3)
- [Frontend](#frontend)
  - [React](#react)
  - [Tailwind CSS](#tailwind-css)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Architecture

- **Backend**: AWS Lambda, API Gateway, DynamoDB, S3
- **Frontend**: React, Tailwind CSS

## Backend

### AWS Lambda

AWS Lambda is used to run the serverless functions that handle API requests. These functions read and write data to DynamoDB and S3.

### API Gateway

API Gateway is used to create, publish, maintain, monitor, and secure the RESTful APIs. It serves as the entry point for the Lambda functions.

### DynamoDB

DynamoDB is a managed NoSQL database service that provides fast and predictable performance with seamless scalability. It is used to store user data.

### S3

Amazon S3 is used for storing and retrieving any amount of data at any time, from anywhere on the web. In this project, S3 is used to store uploaded images.

## Frontend

### React

React is a JavaScript library for building user interfaces. The frontend of this project is built using React.

### Tailwind CSS

Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It is used for styling the React components.

## Getting Started

### Prerequisites

- AWS Account
- Node.js installed
- AWS CLI configured
- Serverless Framework installed (`npm install -g serverless`)

### Backend Setup

1. **Clone the Repository**:

    ```sh
    git clone https://github.com/shivamjadhav2000/awsserverlessmediumtutorial.git
    cd your-repo/backend
    ```

2. **Install Dependencies**:

    ```sh
    npm install
    ```

3. **Deploy the Backend**:

    Make sure your AWS CLI is configured with the correct credentials. Deploy the backend using the Serverless Framework:

    ```sh
    serverless deploy
    ```

4. **Update API Gateway Endpoint in Frontend**:

    After deployment, note down the API Gateway endpoint and update it in the frontend code.

### Frontend Setup

1. **Navigate to the Frontend Directory**:

    ```sh
    cd ../frontend
    ```

2. **Install Dependencies**:

    ```sh
    npm install
    ```

3. **Start the Development Server**:

    ```sh
    npm start
    ```

    The app will be available at `http://localhost:3000`.

## Usage

1. **Access the Frontend**:

    Open your web browser and navigate to `http://localhost:3000`.

2. **Interact with the API**:

    Use the React frontend to interact with the API. You can upload images, which will be stored in S3, and user data, which will be stored in DynamoDB.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
