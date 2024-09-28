import React from 'react';
import { Sparkles, Clock, Target, RotateCw, Shield, Award } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="h-6 w-6 text-secondary" />,
    title: "AI-Powered Writing",
    description: "Our advanced AI crafts personalized cover letters tailored to your experience and the job description."
  },
  {
    icon: <Clock className="h-6 w-6 text-secondary" />,
    title: "Time-Saving",
    description: "Create a professional cover letter in minutes, not hours. Focus on your job search, not writing."
  },
  {
    icon: <Target className="h-6 w-6 text-secondary" />,
    title: "Customization",
    description: "Automatically adapt your cover letter to match the requirements of each job you're applying for."
  },
  {
    icon: <RotateCw className="h-6 w-6 text-secondary" />,
    title: "Unlimited Revisions",
    description: "Fine-tune your cover letter with our easy-to-use editor. Make unlimited revisions until it's perfect."
  },
  {
    icon: <Shield className="h-6 w-6 text-secondary" />,
    title: "ATS-Friendly",
    description: "Ensure your cover letter passes through Applicant Tracking Systems with our optimized formatting."
  },
  {
    icon: <Award className="h-6 w-6 text-secondary" />,
    title: "Templates",
    description: "Choose from a variety of industry-standard templates to make your application stand out."
  }
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Powerful Features for Your Success</h2>
          <p className="max-w-[900px] text-primary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Coverlettered combines cutting-edge AI technology with professional expertise to give you the edge in your job applications.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col space-y-3 bg-primary p-6 rounded-lg shadow-sm h-full">
              <div className="flex items-center space-x-3">
                {feature.icon}
                <h3 className="font-semibold text-lg text-background">{feature.title}</h3>
              </div>
              <p className="text-sm text-background">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}