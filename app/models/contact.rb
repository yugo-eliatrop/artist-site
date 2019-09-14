class Contact < ApplicationRecord
  validates :service,
            presence: true,
            uniqueness: true,
            length: { minimum: 3, maximum: 50 }
  validates :login, length: { maximum: 50 }
  validates :address,
            presence: true,
            length: { minimum: 3, maximum: 50 },
            format: { with: URI::MailTo::EMAIL_REGEXP },
            if: -> { service.eql?('email') }

  class << self
    def of(service)
      { service.to_sym => find_by(service: service) }
    end

    def of_all(services)
      [*services].map { |service| of(service) }
    end
  end
end
