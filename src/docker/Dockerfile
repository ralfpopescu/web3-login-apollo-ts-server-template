FROM node:12.13.0 as project

WORKDIR /usr/src/app

RUN git clone https://github.com/vishnubob/wait-for-it.git

COPY ./ /usr/src/app

EXPOSE 3002

CMD ["node", "bin/www"]

FROM project as project_development

# Used to reload the server on file change.
# RUN npm i -g nodemon
