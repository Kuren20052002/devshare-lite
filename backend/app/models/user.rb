class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_one_attached :avatar
  has_one_attached :cover_picture

  after_create [ :get_default_pictures, :get_default_bio ]

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self,
         authentication_keys: [ :login ]

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :first_name, presence: true, format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
  validates :last_name, presence: true, format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
  validates :bio, length: { maximum: 1000 }
  validates :github, :linkedin, :facebook, format: URI.regexp(%w[http https]), allow_blank: true
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, multiline: true

  attr_writer :login

  def login
    @login || self.username || self.email
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if (login = conditions.delete(:login))
      where(conditions.to_h).where([ "lower(username) = :value OR lower(email) = :value", { value: login.downcase } ]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      where(conditions.to_h).first
    end
  end

  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end

  def cover_picture_url
    Rails.application.routes.url_helpers.url_for(cover_picture) if cover_picture.attached?
  end


  def get_default_pictures
    cover_photo = [ "simon-berger-twukN12EN7c-unsplash.jpg", "ujjwal-jajoo-KLFVQgcLoZ8-unsplash.jpg", "kalen-emsley-Bkci_8qcdvQ-unsplash.jpg" ].sample
    default_cover_path = Rails.root.join("app", "assets", "images", "#{cover_photo}")
    default_cover = File.open(default_cover_path)
    self.cover_picture.attach(io: default_cover, filename: cover_photo)

    default_avatar_path = Rails.root.join("app", "assets", "images", "avatar-default-svgrepo-com.png")
    default_avatar = File.open(default_avatar_path)
    self.avatar.attach(io: default_avatar, filename: "avatar-default-svgrepo-com.png")

    save
  end

  def get_default_bio
    self.bio = "A member of our developer community. Stay tuned for more!"
    save
  end
end
