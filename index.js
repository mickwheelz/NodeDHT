#!/usr/bin/env node
const cli = require('./cli');
const dht = require('./dht');
const logger = require('./logger');
const mqtt = require('./mqtt');

async function main() {

  logger.info('Starting NodeDHT...');
  try {

    const args = cli.args;
    logger.trace(args, 'With arguments...')

    setInterval(
      async function() {
        const result = await dht.getSensorValue()
        
        logger.trace(result, 'Sensor Data...');

        if(args.mqttbroker) {
          await mqtt.publish(result, 'sensor');
        }

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
