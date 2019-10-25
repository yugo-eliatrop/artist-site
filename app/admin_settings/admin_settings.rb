module AdminSettings
  class SignUp
    @id = Setting.find_by(option: 'allow_signup').id

    class << self
      def open?
        Setting.find(@id).value
      end

      def open
        Setting.find(@id).update value: true
      end

      def close
        Setting.find(@id).update value: false
      end
    end
  end
end
