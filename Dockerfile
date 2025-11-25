FROM ruby:3.2.2-slim

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential git nodejs && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /srv/jekyll

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy the rest of the site
COPY . .

# Expose the default Jekyll port
EXPOSE 4000

# Start Jekyll server with development config
CMD ["bundle", "exec", "jekyll", "serve", "--force_polling", "--livereload", "--host", "0.0.0.0", "--config", "_config.yml,_config_dev.yml"]
