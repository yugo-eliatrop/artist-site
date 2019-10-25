require 'singleton'

class AdminSettings
  include Singleton

  @@signup_open = false

  class << self
    def signup_open?
      @@signup_open
    end

    def open_signup
      @@signup_open = true
    end

    def close_signup
      @@signup_open = false
    end
  end
end
