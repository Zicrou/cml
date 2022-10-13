json.current @users.current_page
json.per_page @users.limit_value
json.pages @users.total_pages
json.count @users.total_count
json.sys do
  json.type 'Array'
end

json.items do
  json.array! @users do |user|
    json.partial! 'api/v1/users/user', user: user
  end
end
