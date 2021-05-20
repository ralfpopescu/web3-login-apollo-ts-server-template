FROM node:12.13.0 as blizz

WORKDIR /usr/src/app

RUN git clone https://github.com/vishnubob/wait-for-it.git

COPY ./ /usr/src/app

EXPOSE 3002

CMD ["node", "bin/www"]

FROM blizz as blizz_development

# Used to reload the server on file change.
# RUN npm i -g nodemon
