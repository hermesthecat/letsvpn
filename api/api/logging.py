from logging import Filter
import re
import logging
import coloredlogs

from api.settings import DEBUG


class SkipStaticFilter(Filter):
    pattern = r'\[.+\]\[.+\]\s\"GET\s\/static'
    """ Logging filter to skip logging of staticfiles to terminal """
    def filter(self, record):
        m = re.match(self.pattern, record.getMessage())
        return True if m else False


class MultilineFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord):
        save_msg = record.msg
        output = ""
        for line in save_msg.splitlines():
            record.msg = line
            output += super().format(record) + "\n"
        record.msg = save_msg
        record.message = output
        return output


def get_logger(name='boilerplate_app', level=logging.INFO):
    logger = logging.getLogger(name)

    if DEBUG:
        level = logging.DEBUG

    logger.setLevel(level)
    # formatter = MultilineFormatter('[%(levelname)8s] %(message)s')
    coloredlogs.install(level=level, logger=logger, fmt='[%(levelname)8s] %(message)s')
    return logger


log = get_logger()
