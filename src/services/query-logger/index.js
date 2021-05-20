const { v4: uuidv4 } = require('uuid');

const defaultTags = {
  request: 'Request:',
  variables: 'Variables:',
  response: 'Response:',
  error: 'Error!',
  responseError: 'Response - Error encountered - no data',
};

class QueryLogger {
  constructor(logger, userTags = {}) {
    this.requestId = uuidv4();
    this.logger = logger;
    this.tags = { ...defaultTags, ...userTags };
  }

  requestDidStart(requestContext) {
    const { queryString, variables, request } = requestContext;

    if (!queryString.includes('query IntrospectionQuery')) {
      const requestId = request.headers.get('request-id') || `gen${uuidv4()}`;
      this.logger.debug(`${this.tags.request} ${queryString}`, { requestId });
      if (variables && Object.keys(variables).length > 0) {
        this.logger.debug(`${this.tags.variables} ${JSON.stringify(variables)}`, { requestId: this.requestId });
      }
    } else {
      this.requestId = 'introspection';
    }
  }

  didEncounterErrors(errors) {
    errors.forEach(error => {
      this.logger.error(this.tags.error, { requestId: this.requestId }, error);
    });
  }

  willSendResponse({ graphqlResponse }) {
    if (!graphqlResponse || !graphqlResponse.data) {
      this.logger.error(this.tags.responseError, { requestId: this.requestId });
    } else if (this.requestId !== 'introspection') {
      const { data: { __schema, ...loggingPayload } } = graphqlResponse;
      this.logger.debug(`${this.tags.response} ${JSON.stringify(loggingPayload)}`, { requestId: this.requestId });
    }
  }
}

module.exports = { QueryLogger };
