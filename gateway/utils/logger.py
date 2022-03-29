from termcolor import colored
from time import gmtime, strftime

ERROR_COLOR = 'red'
WARNING_COLOR = 'yellow'
INFO_COLOR = 'green'


def getCurrentTime() -> str:
    return strftime("%Y-%m-%d %H:%M:%S", gmtime())


def info(message):
    _printLog('INFO ', INFO_COLOR, message)


def warn(message):
    _printLog('WARN ', WARNING_COLOR, message)


def error(message):
    _printLog('ERROR', ERROR_COLOR, message)


def _printLog(typ, color, message):
    print(f"{colored('[' + typ + ']', color)}    [{getCurrentTime()}]: {message}")
