json.sys do
  json.id event.id
  json.type 'generate_pdf'
  json.created_at event.created_at
  json.updated_at event.updated_at
end

json.pdf_file do
  if event.pdf_file.attachment.present?
    json.file url_for(event.pdf_file.attachment)
  else
    json.file :nil
  end
end
