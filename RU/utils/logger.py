import logging
import json
import os

with open('config/config.json') as config_file:
    config = json.load(config_file)

logging.basicConfig(
    level=config['logging']['level'],
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename=config['logging']['file']
)

logger = logging.getLogger(__name__)