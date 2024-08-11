const accountSid = process.env.authSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services("VA4b20301d4567b0341ce5dc17fd6eee27")
      .verifications
      .create({to: '+919565549492', channel: 'sms'})
      .then(verification => console.log(verification.sid));
