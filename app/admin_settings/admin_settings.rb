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

  class Logo
    @id = Setting.find_by(option: 'logo').id

    class << self
      def load
        Setting.find(@id).value
      end

      def update(value)
        return if value.nil? || value.empty?

        Setting.find(@id).update value: value
      end
    end
  end
end
