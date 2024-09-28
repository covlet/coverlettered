import React from 'react';

const testimonials = [
  {
    quote: "Coverlettered helped me land my dream job! The AI-powered customization is truly impressive.",
    author: "Sarah J.",
    role: "Marketing Manager"
  },
  {
    quote: "I've never felt more confident about my job applications. This tool is a game-changer.",
    author: "Michael T.",
    role: "Software Engineer"
  },
  {
    quote: "The time I've saved using Coverlettered is invaluable. It's become an essential part of my job search toolkit.",
    author: "Emily R.",
    role: "HR Professional"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-primary">What Our Users Say</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-primary p-6 rounded-lg shadow">
              <p className="text-background mb-4">"{testimonial.quote}"</p>
              <div className="font-semibold text-background">{testimonial.author}</div>
              <div className="text-sm text-background">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}