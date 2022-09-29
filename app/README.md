<h1 align="center" style="font-family: Jetbrains Mono">Twitter Summariser Folder Structure: </h1>

```
├── README.md
├── babel.config.js
├── client                      # contains code for frontend (React App)
├── docker-compose.yml          # configuration code for running docker locally
├── .dynamodb                   # jar file for dynamodb to be used locally
├── jest.config.js               
├── package.json                # contains scripts and dependencies for backend
├── serverless.ts               # Serverless service file
├── src                         # contains code for backend (AWS Lambda, and etc)
├── tools                       # contains scripts to get merge frontend and backend coverage
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── yarn.lock
```