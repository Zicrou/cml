require 'rspec/expectations'

class ValidateContentTypeOf
  attr_reader :attr_name, :content_types

  def in_array(content_types)
    @content_types = content_types
  end

  def with_message(message)
    @message = message
  end

  def matches?(record, attr_name)
    Array.wrap(content_types).all? do |content_type|
      record.send(attr_name).attach attachment_for(content_type)
      record.valid?
      !record.errors[attr_name].include? message
    end
  end

  private

  def attachment_for(content_type)
    suffix = content_type.to_s.split('/').last

    { io: StringIO.new('Hello world!'), filename: "test.#{suffix}", content_type: content_type }
  end

  def message
    @message || I18n.translate('errors.messages.content_type_invalid')
  end
end

RSpec::Matchers.define :validate_content_type_of do |attr_name|
  match do |record|
    matcher.matches?(record, attr_name)
  end

  chain :in_array do |*content_types|
    matcher.in_array(content_types)
  end

  chain :with_message do |message|
    matcher.with_message(message)
  end

  private

  def matcher
    @matcher ||= ValidateContentTypeOf.new
  end
end
