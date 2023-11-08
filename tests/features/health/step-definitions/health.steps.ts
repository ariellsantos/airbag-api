import { Given, Then } from '@cucumber/cucumber';
import request from 'supertest';
import { server } from '../../../../src/Application/server';

let req: request.Test;

Given('I send a GET request to {string}', (route: string) => {
  req = request(server).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  await req.expect(status);
});
