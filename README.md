# Cyber Watch Analyzer

This project is responsabile to receive events from the cyber watch API and perform the analysis in the website.

Make use of http request headers , comand lines tools (ex: nmap ) and others tools to analyze get the results and calculate an comprehensive score.

# Run

```
npm start
```

Run in dev mode
```
npm dev
```

# How it works

Run the nmpa tool on comand line on demand based on the data received in the RabbitMQ event , and maps it to readable json format .
