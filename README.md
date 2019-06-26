# Product Bundler Lite for AWS Lambda
Developed by **[Parkfield Commerce](https://www.parkfieldcommerce.com/)**

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

## Installation

#### Step 1 - Add dependencies that you may or may not have
This project uses the **[Serverless Framework](https://www.serverless.com)** to deploy to AWS λ and mimics a λ environment for local development

```bash
# Install all the dependencies
npm i

# Globally install serverless
npm i -g serverless

# Command to run serverless offline local development
sls offline
```

You could run `sls deploy` and simply deploy from here on out, but since Travis does this for you and deploys a Lambda function based on your github branch, you would just need to **[activate Travis CI](https://travis-ci.org/getting_started)**.

#### Step 2 - Set up a private app on Shopify

* In the Shopify backend, click **Apps**
* You will see a link that says **Manage private apps**, click that
* On the top right corner, click button **Create a new private app**
* Give this app Read and Write access to Orders, Inventory, and Products. If there's anything else that you may need, feel free to give yourself access to that too.

#### Step 3 - Copy environment variables

Rename the `.env.example` to `.env` and paste the API key, Password, and store name next to the appropriate variable.

**Important:** While setting up travis, add the environment variables in the settings.
