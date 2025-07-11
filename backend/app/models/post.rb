class Post < ApplicationRecord
  has_rich_text :content
  belongs_to :user

  def content_html
    content.body.to_html if content.present?
  end
end
