class RoutesGenerator < Rails::Generators::Base
  def create_initializer_file
    create_file 'app/javascript/libs/routes.js',
                JsRoutes.generate,
                force: true
  end
end
