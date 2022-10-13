class Api::V1::GeneratePdfController < ApiController
  before_action :set_event
  before_action :set_men_from_headers
  before_action :set_women_from_headers
  before_action :invited_users

  def show
    generate_event_details_pdf
    render :show
  end

  private

  def set_men_from_headers
    @men_data = request.headers['men-data']
  end

  def set_women_from_headers
    @women_data = request.headers['women-data']
  end

  def set_event
    @event = Event.find_by!(id: params[:event_id])
  end

  def generate_event_details_pdf
    pdf = Prawn::Document.new(page_size: 'A4')
    background_color(pdf)

    add_event_details_text(pdf)
    add_users_table(pdf)
    io = StringIO.new pdf.render
    @event.pdf_file.attach(io: io, content_type: 'application/pdf', filename: "#{@event.title}.pdf")
  end

  def add_users_table(pdf)
    pdf.start_new_page
    background_color(pdf)
    pdf.text '<b>Users Information</b>', align: :center, inline_format: true
    header = %w[Name Email Phone]
    add_user_data_in_table(header, pdf)
  end

  def add_user_data_in_table(header, pdf)
    table_data = []
    table_data << header
    invited_users.each do |invited_user|
      demographic = Demographic.where(user_id: invited_user.user_id)
      demographic.map do |user_demographic|
        table_data << [user_demographic.person_name, invited_user.email, user_demographic.telephone]
      end
    end
    pdf.table(table_data, width: 510)
  end

  def invited_users
    @event.invitations.all
  end

  def add_event_details_text(pdf)
    pdf.text '<b>Islamic Society of Baltimore</b>', size: 30, align: :center, inline_format: true
    pdf.bounding_box([40, 700], width: 400, height: 600) do
      pdf.text "When: <b>#{@event.date_time.to_formatted_s(:long_ordinal)}</b>", size: 16, inline_format: true
      pdf.text "Where: <b>#{@event.address_location}</b>", size: 16, inline_format: true
      pdf.text "Code: <b>#{@event.event_code}</b>", size: 16, inline_format: true
      pdf.text "Men: <b>#{@men_data}</b>", size: 16, inline_format: true
      pdf.text "Women: <b>#{@women_data}</b>", size: 16, inline_format: true
    end
  end

  def background_color(pdf)
    tmp_color = pdf.fill_color
    pdf.canvas do
      pdf.fill_color 17, 3, 0, 4
      pdf.fill_rectangle [pdf.bounds.left, pdf.bounds.top], pdf.bounds.right, pdf.bounds.top
    end
    pdf.fill_color tmp_color
  end
end
