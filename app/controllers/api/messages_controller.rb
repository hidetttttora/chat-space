class Api::MessagesController < ApplicationController
# 名前空間を使って同名のコントローラでも何に使われるコントローラか区別できる。
# 今回の場合はajax通信におけるapiとしてのコントローラの判別をしている。
  def index
    @messages = Message.includes(:user).where('id > ?', params[:id])
  end
end