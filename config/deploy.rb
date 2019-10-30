require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rvm'

# Basic settings:

set :application_name, 'artist-site'
set :domain, '116.203.97.72'
set :deploy_to, '/var/www/artist-site'
set :repository, 'https://github.com/PapaSergiusV/artist-site.git'
set :branch, 'master'

# Optional settings:
set :user, 'root'
set :port, '22'
set :forward_agent, true
set :rvm_use_path, '/usr/local/rvm/scripts/rvm'

set :shared_dirs, fetch(:shared_dirs, []).push('public/uploads')

set :shared_files, fetch(:shared_files, []).push(
  'config/database.yml',
  'config/master.key',
  '.env'
)

# This task is the environment that is loaded for all remote run commands, such
# as `mina deploy` or `mina rake`.
task :remote_environment do
  invoke :'rvm:use', 'ruby-2.6.3'
end

# Put any custom commands you need to run at setup
# All paths in `shared_dirs` and `shared_paths` will be created on their own.
task :setup do
  # command %{rbenv install 2.3.0 --skip-existing}
  command %(touch "#{fetch(:deploy_to)}/shared/config/master.key")
end

namespace :rails do
  desc "Generate app/javascript/libs/routes.js"
  task :generate_routes do
    comment 'Generate app/javascript/libs/routes.js'
    command %{#{fetch(:rails)} generate routes}
  end
end

desc "Deploys the current version to the server."
task :deploy do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    command %{gem install foreman}
    invoke :'rails:db_migrate'
    invoke :'rails:generate_routes'
    command %{foreman run rails assets:precompile}
    invoke :'deploy:cleanup'

    on :launch do
      in_path(fetch(:current_path)) do
        command %{mkdir -p tmp/}
        command %{touch tmp/restart.txt}
      end
    end
  end

  # you can use `run :local` to run tasks on local machine before
  # of after the deploy scripts
  # run(:local){ say 'done' }
end

# For help in making your deploy script, see the Mina documentation:
#
#  - https://github.com/mina-deploy/mina/tree/master/docs
