The photographer website with CMS.<br>
Ruby on Rails application with ReactJS (server side rendering).

## Install

##### Install dependencies
  * Ruby `2.6.3`
  * Postgres `10`
  * Node `11.10.1`
  * Yarn

Clone the repo and install:
```sh
git clone git@github.com:PapaSergiusV/artist-site.git
cd artist-site
bundle install
yarn install
rake db:setup
```
## Start app

Runs the app in the development mode. For each command use other console tab.

```sh
rails s
./bin/webpack-dev-server
```

## Start tests

Runs unit tests.

```sh
bundle exec rspec
```
