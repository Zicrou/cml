json.current @invitations.current_page
json.per_page @invitations.limit_value
json.pages @invitations.total_pages
json.count @invitations.total_count
json.sys do
  json.type 'Array'
end

json.items do
  json.array! @invitations do |invitation|
    json.partial! 'api/v1/invitations/invitation', invitation: invitation
  end
end
