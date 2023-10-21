# Restaurant Rating App

## Description

In this app you can list, rate restaurants, order them by their ratings. Users can register and sign in. This full-stack app was developed by using nestjs, react, mongodb and typescript.

## How to run
1. Clone this repository to your computer.
2. You need to have **mongodb** installed on your computer. If you don't, you can run a mongodb instance by using **docker-compose.yml**. 
If you need to use docker-compose.yml, you can run this command :
```
docker-compose up -d
```
3. You need to specify the **mongodb** url in the **.env** file.
4. You need to have **npm** installed. 
5. Inside the server folder, run the commands below.
```
npm install
npm run start:dev
```
6. The server app is up on **4000** port.
7. Inside the client folder, run the commands below.
```
npm install
npm run start
```
8. The client app is up on **3000** port.

## How to run Script ?

Make sure you are in the server folder in the terminal and run this code in terminal.
 ```
node bin/scripts/generate-restaurant
```

## API Docs
Once you get the server up you can access the api docs on this url : 

```
http://localhost:4000/api-docs
```
