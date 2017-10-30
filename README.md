# streamsx.iot.starterkit
This starter kit simplifies the setup for connecting Apache Edgent devices with IBM Streams applications running in the cloud.

The recommended way to connect IoT devices running Apache Edgent is to send the data to the Watson IoT Platform and then retrieve that data from a Streams application running locally or in the IBM Cloud, as illustrated below.

![Deploy To Bluemix](https://developer.ibm.com/streamsdev/wp-content/uploads/sites/15/2017/09/edgent-iot-streams.png)


Deploying this starter kit to Bluemix will set up the Streaming Analytics and Watson IoT Platform services for you.  If you choose not to deploy the services automatically, or if you are using an on-prem Streams installation, you can follow these instructions to [setup Streams and the Watson IoT Platform manually](https://developer.ibm.com/streamsdev/docs/setup-instructions-connecting-edgent-streams-applications-watson-iot-platform).


## Automatically deploy and configure the services
You can use this option if you do not have the services service created in Bluemix.
Click the the **Deploy to Bluemix** button below to deploy and configure the Streaming Analytics and Watson IoT Platform services.

[![Deploy To Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/natashadsilva/streamsx.iot.starter.git)

*Note:* If you have both services created and would like to use automatic configuration,  you need to rename the services to match the names expected by the configuration script before starting the process:
   - Rename the Streaming Analtyics service to `Streaming-Analytics`
   - Rename the Watson IoT Platform to `Internet-of-Things-Platform`. These names must match exactly as indicated here.
   Then click the **Deploy to Bluemix** button above.
