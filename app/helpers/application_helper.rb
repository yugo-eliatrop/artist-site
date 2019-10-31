module ApplicationHelper
  include AdminSettings

  def logo
    Logo.load
  end
end
