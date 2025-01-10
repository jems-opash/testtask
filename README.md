## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Environment Variables](#environment-variables)

## Installation

### 1. Clone the repository

Clone the project repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/simple-nodejs-project.git
```

### 2. Install dependencies

Navigate to the project directory and install the required dependencies using npm:

```bash
npm install
```

## Usage

### 1. Start the server

To start the server, run the following command:

```bash
npm run dev
```

## Environment Variables

Before starting the server, you need to set up the environment variables. Create a .env file in the root directory of your project and add the following configuration:

```bash
PORT=3001
JWT_SECRET=veryhardpassword
JWT_EXPIRED_IN=7d
DB_URI=mongodb+srv://[username]:[password]@cluster0.wmh2w.mongodb.net/[your-database-name]?retryWrites=true&w=majority&appName=Cluster0
```




