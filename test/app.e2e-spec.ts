import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { EVENT_TYPE } from './../src/investigations/enum';

describe('InvestigationsController (e2e)', () => {
  let app: INestApplication;

  // Test search data
  const startDate = '2021-11-25';
  const endDate = '2021-11-27';
  const eventType = EVENT_TYPE.FILE_ACCESSED;
  const deviceName = 'pc';
  const tags = '["city","fr"]';
  const data = 'teacher';
  const userName = 'Mila';

  // Responses
  const dataResponse = {
    data: [],
    total: 0,
    hasNext: false,
  };
  const successResponse = {
    statusCode: 201,
    message: 'Success',
  };
  const errorResponse = {
    statusCode: 400,
    message: 'startDate and endDate must be sent',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('/ (POST) file upload', async () => {
  //   const { status, body } = await request(app.getHttpServer())
  //     .post('/')
  //     .set('Content-Type', 'multipart/form-data')
  //     .attach('file', '.example.csv');
  //   expect(status).toBe(201);
  //   expect.arrayContaining(body);
  //   expect(body).toMatchObject(successResponse);
  // });

  it('/ (GET) response without startDate and endDate', async () => {
    const { status, body } = await request(app.getHttpServer())
      .get(`/investigations`)
      .set('Accept', 'application/json');
    expect(status).toBe(400);
    expect.arrayContaining(body);
    expect(body).toMatchObject(errorResponse);
  });

  it('/ (GET) response with must search keys: startDate and endDate', async () => {
    const { status, body } = await request(app.getHttpServer())
      .get(`/investigations?startDate=${startDate}&endDate=${endDate}`)
      .set('Accept', 'application/json');
    expect(status).toBe(200);
    expect.arrayContaining(body);
    expect(body).toMatchObject(dataResponse);
  });

  it('/ (GET) response with all search keys', async () => {
    const url = `/investigations?startDate=${startDate}&endDate=${endDate}&deviceName=${deviceName}&eventType=${eventType}&userName=${userName}&tags=${tags}&data=${data}`;
    const { status, body } = await request(app.getHttpServer())
      .get(url)
      .set('Accept', 'application/json');
    expect(status).toBe(200);
    expect.arrayContaining(body);
    expect(body).toMatchObject(dataResponse);
  });
});
