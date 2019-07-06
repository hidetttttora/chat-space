# json形式のデータを配列で返したい場合にarrayを用いる。以下の記述は非同期の時と一緒
json.array! @users do |user|
  json.id user.id
  json.name user.name
end