import {v4 as uuidv4} from "uuid";
import {Logger} from "../logger";

const defaultTags = {
  request: "Request:",
  variables: "Variables:",
  response: "Response:",
  error: "Error!",
  responseError: "Response - Error encountered - no data",
};

class QueryLogger {
  public requestId: string;
  public logger: Logger;
  public tags: {[key: string]: string};

  constructor(logger: Logger, userTags = {}) {
    this.requestId = uuidv4();
    this.logger = logger;
    this.tags = {...defaultTags, ...userTags};
  }

  requestDidStart(requestContext: any) {
    const {queryString, variables, request} = requestContext;

    if (!queryString.includes("query IntrospectionQuery")) {
      const requestId = request.headers.get("request-id") || `gen${uuidv4()}`;
      this.logger.debug(`${this.tags.request} ${queryString}`, {requestId});
      if (variables && Object.keys(variables).length > 0) {
        this.logger.debug(
          `${this.tags.variables} ${JSON.stringify(variables)}`,
          {requestId: this.requestId}
        );
      }
    } else {
      this.requestId = "introspection";
    }
  }

  didEncounterErrors(errors: any) {
    errors.forEach((error: any) => {
      this.logger.error(this.tags.error, {requestId: this.requestId}, error);
    });
  }

  willSendResponse({graphqlResponse}: any) {
    if (!graphqlResponse || !graphqlResponse.data) {
      this.logger.error(this.tags.responseError, {requestId: this.requestId});
    } else if (this.requestId !== "introspection") {
      const {
        data: {__schema, ...loggingPayload},
      } = graphqlResponse;
      this.logger.debug(
        `${this.tags.response} ${JSON.stringify(loggingPayload)}`,
        {requestId: this.requestId}
      );
    }
  }
}

module.exports = {QueryLogger};
