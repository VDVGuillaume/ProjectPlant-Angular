# 2021-pieter-VDVGuillaume
2021-pieter-VDVGuillaume created by GitHub Classroom

How to build the app?

1.) clone the repo 

2.) before building a production app make sure to change passwords & bearer token in dockercompose file & appsettings.json 

3.) run docker-compose build 

4.) run docker-compose up

There is a known issue with the current setup.
The dependency of the api image on the database image is not working correctly.
The container of the api starts when the container of the db is started, but doesn't take notice of running scripts.
So in the case the api exits with code 139, just run docker-compose up again. 

