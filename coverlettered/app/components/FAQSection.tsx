import React from 'react';

const faqs = [
  {
    question: "How does the AI customization work?",
    answer: "Our AI analyzes the job description and your professional information to create a tailored cover letter that highlights your most relevant skills and experiences."
  },
  {
    question: "Can I edit the generated cover letter?",
    answer: "Absolutely! You have full control to review and edit your cover letter after it's generated. Our editor makes it easy to refine and personalize your letter."
  },
  {
    question: "Is my information secure?",
    answer: "Yes, we take data security seriously. All your information is encrypted and we never share your personal details with third parties."
  },
  {
    question: "How many cover letters can I create?",
    answer: "The number of cover letters you can create depends on your plan. Our Basic plan allows for 5 per month, while our Pro plan offers unlimited cover letters."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service."
  }
];

export default function FAQSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-primary">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-8 bg-primary rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 text-background">{faq.question}</h3>
              <p className="text-background">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}