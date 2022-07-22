# Home Library Service

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
cd nodejs2022Q2-service
git checkout docker

```


### create image app
```
  docker build -t app:v1 .
```

### create container app
```
  docker run -d -p 4000:4000 app:v1
```
