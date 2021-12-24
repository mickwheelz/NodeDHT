#!/usr/bin/env node
const cli = require('./cli');
const dht = require('./dht');
const logger = require('./logger');
const mqtt = require('./mqtt');

async function main() {

  logger.info('Starting NodeJBD...');
  try {

    const args = cli.args;
    logger.trace(args, 'With arguments...')

    setInterval(
      async function() {
        //send requests, response handled by eventlistener
        const result = await dht.getSensorValue()

        console.log(result);

        await mqtt.publish(result, 'data');

      }, 
      args.pollinginterval * 1000
    );
  }
  catch(e) {
    logger.error(e);
    process.exit(1);
  }

}

main();