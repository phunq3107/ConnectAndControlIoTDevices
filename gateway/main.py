import time
from gateway import Gateway
from utils import logger
import env

if __name__ == '__main__':
    gateway = Gateway(env.AIO_USERNAME, env.AIO_KEY, env.AIO_FEED_KEYS)
    if not gateway.isMicrobitConnected:
        logger.warn('Microbit is not connected. Gateway will use fake data...')
    while True:
        if gateway.isMicrobitConnected:
            gateway.readSerial()
        else:
            gateway.sendFakeData()
        time.sleep(5)
