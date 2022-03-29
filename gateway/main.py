import time
from gateway import Gateway
import env

if __name__ == '__main__':
    gateway = Gateway(env.AIO_USERNAME, env.AIO_KEY, env.AIO_FEED_KEYS)
    while True:
        if gateway.isMicrobitConnected:
            gateway.readSerial()
        time.sleep(1)
