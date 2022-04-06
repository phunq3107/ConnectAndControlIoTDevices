import sys
import random

import serial.tools.list_ports
from Adafruit_IO import MQTTClient
from utils import logger


class Gateway:
    TEMPERATURE_SENSOR = 'Temperature sensor'
    SOUND_SENSOR = 'Sound sensor'
    LIGHT = 'Light'
    SCREEN = 'Screen'

    def __init__(self, username, aio_key, feeds):
        self.feeds = feeds
        self.isMicrobitConnected = False
        self.serial = None
        self.msg = ''

        try:
            if self.getPort():
                self.serial = serial.Serial(port=self.getPort(), baudrate=115200)
            self.isMicrobitConnected = True
        except Exception as e:
            logger.error(e)

        self.client = MQTTClient(username, aio_key)
        self.client.on_connect = self.connected
        self.client.on_disconnect = self.disconnected
        self.client.on_message = self.message
        self.client.on_subscribe = self.subscribe
        self.client.connect()
        self.client.loop_background()

    def connected(self, client):
        logger.info("Connect successful...")
        for feed in self.feeds:
            logger.info(f"Subscribe {feed}")
            client.subscribe(feed)

    def subscribe(self, client, userdata, mid, granted_qos):
        logger.info("Subscribe successful...")

    def disconnected(self, client):
        logger.info("Disconnected...")
        sys.exit(1)

    def message(self, client, feed_id, payload):
        if self.getSensorType(feed_id) == Gateway.SCREEN:
            # format: [username, noOfActiveDays,noEgg,hatchedEgg,currentTemp]
            payload = self.decodeScreenMessage(payload)
        # todo: update code for display on LCD monitor
        logger.info(f"Receive data: [device='{self.getSensorType(feed_id)}', data='{payload}']")
        if self.isMicrobitConnected:
            self.serial.write((str(payload) + "#").encode())

    def getPort(self):
        ports = serial.tools.list_ports.comports()
        num_ports = len(ports)
        comm_port = "None"

        for i in range(0, num_ports):
            port = ports[i]
            str_port = str(port)
            if "USB Serial Device" in str_port:
                split_port = str_port.split(" ")
                comm_port = (split_port[0])
        return comm_port

    def processData(self, data):
        data = data.replace("!", "")
        data = data.replace("#", "")
        split_data = data.split(":")
        if len(split_data) < 3:
            logger.error(f'Error in processing data: [{data}]')
            return
        logger.info(split_data[1] + " " + split_data[2])
        if split_data[0] == "1":
            if split_data[1] == "TEMP":
                self.client.publish(self.getTemperatureSensor(), split_data[2])
            elif split_data[1] == "SOUND":
                self.client.publish(self.getSoundSensor(), split_data[2])

    def readSerial(self):
        bytes_to_read = self.serial.inWaiting()
        if bytes_to_read > 0:
            self.msg = self.msg + self.serial.read(bytes_to_read).decode("UTF-8")
            while ("#" in self.msg) and ("!" in self.msg):
                start = self.msg.find("!")
                end = self.msg.find("#")
                self.processData(self.msg[start:end + 1])
                if end == len(self.msg):
                    self.msg = ""
                else:
                    self.msg = self.msg[end + 1:]

    def decodeScreenMessage(self, message):
        retval = ""
        for i in range(1, len(message), 3):
            retval += chr(int(message[i:i + 3]))
        return retval.split(',')

    def sendFakeData(self):
        self.client.publish(self.getTemperatureSensor(), random.randint(27, 43))

    def getSensorType(self, key):
        if 'li' in key:
            return Gateway.LIGHT
        elif 'te' in key:
            return Gateway.TEMPERATURE_SENSOR
        elif 'so' in key:
            return Gateway.SOUND_SENSOR
        elif 'sc' in key:
            return Gateway.SCREEN

    def getLight(self):
        for feed in self.feeds:
            if 'li' in feed:
                return feed

    def getSoundSensor(self):
        for feed in self.feeds:
            if 'so' in feed:
                return feed

    def getTemperatureSensor(self):
        for feed in self.feeds:
            if 'te' in feed:
                return feed
