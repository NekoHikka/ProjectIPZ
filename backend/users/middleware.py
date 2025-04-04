import logging

logger = logging.getLogger("django")

class RequestResponseLoggerMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        logger.info("Request: %s %s", request.method, request.path)

        try:
            response = self.get_response(request)
        except Exception as e:
            logger.exception(
                "Error while processing %s %s: %s", request.method, request.path, str(e)
            )
            raise

        logger.info("Response: %s for %s", response.status_code, request.path)
        return response
