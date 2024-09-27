import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { auth } from '@clerk/nextjs/server';

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the request body
    const { jobDescription } = await req.json();

    // Validate input
    if (!jobDescription) {
      return NextResponse.json({ error: 'Missing job description' }, { status: 400 });
    }

    // Here you would fetch the user's profile data from your database
    // For now, we'll use placeholder data
    const userProfile = {
      fullName: 'John Doe',
      profession: 'Software Developer',
      experience: '5 years of experience in full-stack web development',
      skills: 'JavaScript, React, Node.js, Python',
    };

    // Construct the prompt
    const prompt = `Human: Create a professional cover letter for the following job description:
    
    ${jobDescription}
    
    The applicant has the following profile:
    Name: ${userProfile.fullName}
    Profession: ${userProfile.profession}
    Experience: ${userProfile.experience}
    Skills: ${userProfile.skills}
    
    Please write a compelling cover letter that highlights the applicant's relevant skills and experience for this specific job.

    Assistant: Certainly! Here's a professional cover letter based on the provided information:

    [Cover letter will be generated here]

    Human: Thank you. Could you please provide just the cover letter text without any additional commentary?

    Assistant: Of course. Here's the cover letter without any additional commentary:

    `;

    // Make the API call to Anthropic
    const completion = await anthropic.completions.create({
      model: 'claude-2.1',
      max_tokens_to_sample: 1000,
      prompt: prompt,
    });

    // Extract the generated cover letter
    const generatedLetter = completion.completion.trim();

    // Return the response
    return NextResponse.json({ coverLetter: generatedLetter });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return NextResponse.json({ error: 'Failed to generate cover letter' }, { status: 500 });
  }
}