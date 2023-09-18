# # pull official base image
# FROM node:20-alpine 

# # set working directory
# # WORKDIR ./movie_watch

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH ./movie_watch/node_modules/.bin:$PATH

# # install app dependencies
# COPY ./movie_watch/package.json ./
# COPY ./movie_watch/package-lock.json ./
# RUN npm install -g npm@9.7.2
# # RUN npm install --silent

# # add app

# # start app
# EXPOSE 3000
# CMD ["npm", "start"]
FROM node:20-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
# RUN npm install
COPY ./movie_watch .
RUN npm install --force
# Build the app
RUN npm run build --force

# Bundle static assets with nginx
# FROM nginx:stable-alpine3.17-slim as production
# ENV NODE_ENV production
# Copy built assets from `builder` image
# COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3000
# Start nginx
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "start"]