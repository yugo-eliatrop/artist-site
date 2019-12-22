module AdminSettings
  class SignUp
    @id =
      if Setting.find_by(option: 'allow_signup').present?
        Setting.find_by(option: 'allow_signup').id
      else
        Setting.create!(option: 'allow_signup', value: true).id
      end

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
    @id =
      if Setting.find_by(option: 'logo').present?
        Setting.find_by(option: 'logo').id
      else
        Setting.create!(option: 'logo', value: 'LOGO').id
      end

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
