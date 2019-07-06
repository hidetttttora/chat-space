json.id @message.id
json.name @message.user.name
json.date @message.created_at.strftime("%Y年%m月%d日%H時%M分")
json.content @message.content
json.image @message.image.url

# @messageの中に格納された情報をそれぞれ取り出し左側にある「json.変数」に代入する。
# もちろんjsファイルで使う場合は同じ名前出なければ使用できないので注意。
