# microservice-tweet


You can use postman collection from `Microservice Tweet.postman_collection.json`



It's consist of 2 services User, Tweet talk to each other by RabbitMQ
(NOTE: retweet not being used here)
![alt text](https://github.com/patkamon/microservice-tweet/blob/main/diagram.png)



# Getting Started      
## Setup .env for frontend development

Create `.env.local` file with this following code and place into the `front` folder

    NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-key
    NEXT_PUBLIC_TURNSTILE_SECRET_KEY=your-key

    NEXT_PUBLIC_GITHUB_ID=your-key
    NEXT_PUBLIC_GITHUB_SECRET=your-key

## Build Docker container
run `docker-compose up --build`.  
BACKEND MAIN PORT IS `localhost:80`
FRONTEND ON PORT `localhost:3000`.   

***NOTE 1:*** Made sure container are same as this list.    
![alt text](https://github.com/patkamon/twitter-secure/blob/main/container-list.png)  

***NOTE 2:*** Made sure there are container name `twitter-secure-nginx-proxy-1` else you have to replace it with your container name. I recommend you use visual studio code for replaces like in this pic.    
![alt text](https://github.com/patkamon/twitter-secure/blob/main/name-change.png)
