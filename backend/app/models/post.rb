class Post < ApplicationRecord
  has_rich_text :content
  belongs_to :user

  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags

  def content_html
    content.body.to_html if content.present?
  end
end
