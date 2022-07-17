# Home Library Service

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules
> :warning: If the **npm install** command fails, type **npm i --legacy-peer-deps**. To install swagger for nest version 8.0

```
cd nodejs2022Q2-service
git checkout develop
npm install or npm install --legacy-peer-deps
```

## Running application

```
npm start
```

After starting the app on port (5000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:5000/doc/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
