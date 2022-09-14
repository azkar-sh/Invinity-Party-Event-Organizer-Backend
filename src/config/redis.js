const redis = require("redis");

const redisPassword = "7nOcJ7bghkI3oRD9NA9Gqc1eNzw3FT34";
const redisHost = "redis-11443.c292.ap-southeast-1-1.ec2.cloud.redislabs.com";
const redistPort = "11443";

// REMOTE :
// 1. install redis-cli global = https://www.npmjs.com/package/redis-cli
// 2. rdcli -h <host> -a <password> -p <port>
// 2. rdcli -h redis-11443.c292.ap-southeast-1-1.ec2.cloud.redislabs.com -a 7nOcJ7bghkI3oRD9NA9Gqc1eNzw3FT34 -p 11443

const client = redis.createClient();
// const client = redis.createClient({
//   socket: {
//     host: redisHost,
//     port: redistPort,
//   },
//   password: redisPassword,
// });

(async () => {
  client.connect();
  client.on("connect", () => {
    // eslint-disable-next-line no-console
    console.log("You're connected db redis ...");
  });
})();

module.exports = client;
