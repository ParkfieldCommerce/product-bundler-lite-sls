require('dotenv').config();
const serverless   = require('serverless-http'),
      express      = require('express'),
      bodyParser   = require('body-parser'),
      cors         = require('cors'),
      dotenv       = require('dotenv').config,
      buildProduct = require('./routes/build-product');
      orderCreated = require('./routes/order-created');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/status', (req,res) =>{
  res.send('We are Live');
});
app.use(buildProduct);
app.use(orderCreated);

module.exports.handler = serverless(app)
