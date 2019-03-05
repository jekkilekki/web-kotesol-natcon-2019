/* eslint-disable no-unused-expressions */
const chai = require('chai');
const { MongoClient } = require('mongodb');

const should = chai.should();
const { expect } = chai;
const configDev = require('../../server/config').development;
const configProd = require('../../server/config').production;
const configTest = require('../../server/config').test;

describe('The DSN', () => {
  it('should be configured for development', async () => {
    expect(configDev.database.dsn).to.be.a('string');
  });
  it('should be configured for production', async () => {
    expect(configProd.database.dsn).to.be.a('string');
  });
  it('should be configured for testing', async () => {
    expect(configTest.database.dsn).to.be.a('string');
  });
}); 
