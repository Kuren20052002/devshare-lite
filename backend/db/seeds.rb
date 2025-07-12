# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


# Clear existing tags to avoid duplicates
Tag.destroy_all

tag_names = %w[
  ruby javascript typescript python go java php rust kotlin swift
  html css react nextjs vue rails django nodejs express tailwindcss
  api graphql postgresql mysql mongodb redis jwt authentication
  docker kubernetes aws azure gcp ci/cd
  ui ux design accessibility animation
  career portfolio interview coding-challenge self-learning productivity
  open-source debugging tools
]

tag_names.each do |name|
  Tag.create!(name: name)
end
