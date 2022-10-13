json.current @invite_more_users.current_page
json.per_page @invite_more_users.limit_value
json.pages @invite_more_users.total_pages
json.count @invite_more_users.total_count
json.sys do
  json.type 'Array'
end

json.items do
  json.array! @invite_more_users do |invite_more_user|
    json.partial! 'api/v1/invitations/invite_more_user', invite_more_user: invite_more_user
  end
end
