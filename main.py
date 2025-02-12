from api.server import app
from utils.logger import logger

if __name__ == '__main__':
    logger.info("Starting AI Agent")
    app.run()