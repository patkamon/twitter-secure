# microservice-tweet


You can use postman collection from `Microservice Tweet.postman_collection.json`



It's consist of 2 services User, Tweet talk to each other by RabbitMQ
(NOTE: retweet not being used here)
![alt text](https://github.com/patkamon/microservice-tweet/blob/main/diagram.png)



# Getting Started      
run `docker-compose up --build`.  
BACKEND MAIN PORT IS localhost:80
FRONTEND ON PORT 3000.   
NOTE 1 Made sure container are same as this list 
![alt text](https://github.com/patkamon/twitter-secure/blob/main/containers.png).  
NOTE 2 Made sure there are container name `twitter-secure-nginx-proxy-1` else you have to replace it with your container name. I recommend you use visual studio code for replaces like in this pic.
![alt text](https://github.com/patkamon/twitter-secure/blob/main/change-name.png). 
