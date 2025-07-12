class UploadsController < ApplicationController
  def create
    blob = ActiveStorage::Blob.create_and_upload!(
      io: params[:image].tempfile,
      filename: params[:image].original_filename,
      content_type: params[:image].content_type
    )

    render json: { url: url_for(blob) }, status: :ok
  end
end
