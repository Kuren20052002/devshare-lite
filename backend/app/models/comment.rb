class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  belongs_to :parent, class_name: "Comment", optional: true
  has_many :replies, class_name: "Comment", foreign_key: :parent_id, dependent: :destroy

  scope :root_comments, -> { where(parent_id: nil) }

  validates :content, presence: true
  validates :user_id, presence: true
  validates :post_id, presence: true

  validate :one_layer_reply_limit

  def have_children
    replies.exists?
  end

  private

  def one_layer_reply_limit
    if parent_id.present? && parent&.parent_id.present?
      errors.add(:parent_id, "Cannot reply to a comment that is already a reply")
    end
  end
end
