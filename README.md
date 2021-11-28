<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Rest API to import and query investigation data with NestJs, MongoDB, TypeORM, and TypeScript.

## Installation

Install `nodejs` and `mongodb` in your machine.

```bash
# 1. Clone the repository.
$ git clone https://github.com/hadeyici/investigation-api.git

# 2. Enter your newly-cloned folder.
$ cd investigation-api

# 3. Install dependencies.
$ npm install
```

## Configuration

Create .env file cp .env.example .env and replace existing env variables (mongodb connection params)

## Running the app

```bash
# Run development server and open http://localhost:3000
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## API

Server will listen on port `3000`, and it expose the following APIs:

- **POST** - `/investigations` - Upload a new csv file | keys in csv file;

  - **eventType** - _string ('fileCreated', 'fileAccessed', 'fileDownloaded', 'eventRecordCreated' or 'fileExecuted')_
  - **deviceName** - _string_
  - **tags** - _string[]_
  - **data** - _object[]_
  - **userName** - _string (optional)_

- **GET** - `/investigations` - Returns investigations | search params;
  - **startDate** - _string_
  - **endDate** - _string_
  - **eventType** - _(optional)_
  - **deviceName** - _(optional)_
  - **tags** - _(optional)_
  - **data** - _(optional)_
  - **userName** - _(optional)_

## Request and Responses

`POST /investigations` upload csv file

- Request

Example csv file: example.csv;

```
"userName"|"eventType"|"deviceName"|"tags"|"data"
"Helen"|"eventRecordCreated"|"mobile"|["ca","english"]|[{"job":{"name":"student","sallary":null},"favorite":"Twitter"}]
"Kane"|"fileCreated"|"mobile"|["faketon","ma"]|[{"job":{"name":"worker","sallary":"2 thousand"},"favorite":"Facebook"}]
"Parker"|"fileDownloaded"|"mobile"|["france","fr"]|[{"favorite":"Instagram"}]
"Clara"|"fileExecuted"|"pc"|["english","faketon"]|[{"favorite":"Instagram","married":true}]
"Adan"|"fileDownloaded"|"pc"|["group","ca"]|[{"job":{"name":"engineer","sallary":null},"married":false}]
"Mila"|"fileAccessed"|"pc"|["city","fr"]|[{"job":{"name":"teacher","sallary":"4 thousand"},"favorite":"Facebook"}]
"Leon"|"eventRecordCreated"|"pc"|["vancouver","faketon"]|[{"job":{"name":"farmer","sallary":null},"favorite":"Instagram","married":true}]
```

- Response

```
{
statusCode: HTTP Status Code,
"msg": Success / Error Message,
}
```

`GET /investigations` returns investigations

- Request

```
`GET /investigations?startDate=2021-11-25&endDate=2021-11-27&eventType=eventRecordCreated&deviceName=pc&userName=Leon&tags=["vancouver","faketon"]&data=mer`
```

- Response

```
{
  "data": [
    {
      "id": "61a1032755e63a7150ac905c",
      "userName": "Leon",
      "eventType": "eventRecordCreated",
      "deviceName": "pc",
      "tags": [
        "vancouver",
        "faketon"
      ],
      "data": [
        {
          "job": {
            "name": "farmer",
            "sallary": null
          },
          "favorite": "Instagram",
          "married": true
        }
      ],
      "date": "2021-11-26T15:54:15.209Z"
    }
  ],
  "total": 1,
  "hasNext": false
}

or

{
  "data": [],
  "total": 0,
  "hasNext": false
}
```
