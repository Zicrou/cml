require 'rails_helper'

RSpec.describe 'GET /v1/me', type: :request do
  let(:url) { '/v1/me' }
  let(:user) { User.find_by_id(cache_id) }

  before do
    get(url)
  end

  context 'when user is authorized' do
    xit { expect(response).to have_http_status(:success) }
  end

  context 'when user is not authorized' do
    let(:user_token) { 'invalid-token' }

    xit { expect(response).to have_http_status(:unauthorized) }
  end
end
