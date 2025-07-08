class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :username, :first_name, :last_name, :created_at

  attribute :created_date do |user|
    user.created_at && user.created_at.strftime("%d/%m/%Y")
  end

  attribute :first_name do |user|
    user.first_name && user.first_name.match(/\w+/) ? user.first_name.capitalize : nil
  end

  attribute :last_name do |user|
    user.last_name && user.last_name.match(/\w+/) ? user.last_name.capitalize : nil
  end
end
