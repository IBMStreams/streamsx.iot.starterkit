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


### View the landing page

After deploying the services, you can go to the home page of your starter kit to access the credentials for your services.  

From the toolchain's home page, click **View App** once the deployment is done to go to the home page of your starter kit:
![View App](img/viewapp.png)
If the **View App** button does not display a link, click **Delivery Pipeline** to check on the status of deployment.

Clicking **View App** will take you to the home page of your starter kit:

![Sample landing page](img/homepage.png)

## Next Steps

Once you have the services set up, you can:

1. Create an Edgent application. Follow this recipe to [create an Edgent application that sends data to the Watson IoT platform](https://developer.ibm.com/recipes/tutorials/send-events-to-the-watson-iot-platform-from-a-raspberry-pi-running-apache-edgent/).

2. Submit the `IotPlatform` application
- Click **Tools** on the home page of the starter kit to submit the job if it is not running.
- If you used the manual deployment option, follow [step 4 of these instructions](https://developer.ibm.com/streamsdev/docs/setup-instructions-connecting-edgent-streams-applications-watson-iot-platform).

3. Create a Streams application
For SPL and Java, complete the follow up to the Edgent recipe to
[Create a Streams application that processes the data from Edgent](https://developer.ibm.com/recipes/tutorials/connect-apache-edgent-to-the-streaming-analytics-service-using-the-watson-iot-platform/)

For Python, [this Python notebook](https://github.com/IBMStreams/samples/blob/master/IoT/WeatherStationApp/Detect%2Bmalfunctioning%2Bsensors%2Bin%2Breal%2Btime.ipynb) walks you through creating a Streams application.
An Edgent application that generates data is provided.


## More Resources

- [Cheatsheet for connecting Edgent and Streams applications](https://developer.ibm.com/streamsdev/docs/cheat-sheet-connecting-edgent-streams-applications/)
- [Sample Streams applications on Github](https://github.com/IBMStreams/samples/tree/master/IoT/ReadEdgentEvents)
