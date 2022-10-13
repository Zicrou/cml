lifestyle_questions = QuestionCategory.create(title: 'Lifestyle', sort_id: 1)
lifestyle_questions.questions.create(title: 'Hobbies', sort_id: 1)
lifestyle_questions.questions.create(title: 'Travel', sort_id: 2)
lifestyle_questions.questions.create(title: 'Reading', sort_id: 3)
lifestyle_questions.questions.create(title: 'Decision Making', sort_id: 4)
lifestyle_questions.questions.create(title: 'Health Issues', sort_id: 5,
                                     is_public: false)
lifestyle_questions.questions.create(title: 'Physical Exam', sort_id: 6)
lifestyle_questions.questions.create(title: 'Health and Nutrition', sort_id: 7)
lifestyle_questions.questions.create(title: 'Family', sort_id: 8)

# Relationships QuestionCategory with all of its questions
relationships_questions = QuestionCategory.create(title: 'Relationships',
                                                  sort_id: 2)
relationships_questions.questions.create(title: 'Immediate Family',
                                         sort_id: 1)
relationships_questions.questions.create(title: 'Living Situation',
                                         sort_id: 2)
relationships_questions.questions.create(title: 'Qualities in a Spouse',
                                         sort_id: 3)
relationships_questions.questions.create(title: 'Religious Expectations',
                                         sort_id: 4)
relationships_questions.questions.create(title: 'Spiritual Contribution',
                                         sort_id: 5)
relationships_questions.questions.create(title: 'Language Difference',
                                         sort_id: 6)
relationships_questions.questions.create(title: 'Inter-racial Marriage',
                                         sort_id: 7)

# Finances and Homemaking QuestionCategory with all of its questions
finances_questions = QuestionCategory.create(title: 'Finances and Homemaking',
                                             sort_id: 3)
finances_questions.questions.create(title: 'Defining Wealth',
                                    sort_id: 1)
finances_questions.questions.create(title: 'Financial Responsibility',
                                    sort_id: 2)
finances_questions.questions.create(title: 'Financial Expectation',
                                    sort_id: 3)
finances_questions.questions.create(title: 'Working Wife', sort_id: 4)
finances_questions.questions.create(title: 'Debt', sort_id: 5)
finances_questions.questions.create(title: 'Financial Dependents', sort_id: 6)

# Children and Homemaking QuestionCategory with all of its questions
children_questions = QuestionCategory.create(title: 'Children',
                                             sort_id: 4)
children_questions.questions.create(title: 'Children Desired',
                                    sort_id: 1)
children_questions.questions.create(title: 'Existing Children',
                                    sort_id: 2)
if Rails.env.development?
  AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
end
