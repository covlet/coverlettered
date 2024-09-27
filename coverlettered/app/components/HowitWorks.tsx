import React from 'react';

const steps = [
  {
    number: "1",
    title: "Input Your Details",
    description: "Provide your professional information and the job you're applying for."
  },
  {
    number: "2",
    title: "AI Customization",
    description: "Our AI analyzes the job description and tailors your cover letter accordingly."
  },
  {
    number: "3",
    title: "Review and Edit",
    description: "Review the generated cover letter and make any desired edits."
  },
  {
    number: "4",
    title: "Download and Apply",
    description: "Download your polished cover letter and submit your application with confidence."
  }
];

export default function HowItWorksSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-primary font-['Courier_Prime']">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-accent text-background rounded-full flex items-center justify-center text-2xl font-bold mb-4 font-['Courier_Prime']">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary font-['Courier_Prime']">{step.title}</h3>
              <p className="text-primary font-['Courier_Prime']">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}