'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface WorkExperience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
  isVisible: boolean;
}

interface Education {
  degree: string;
  institution: string;
  graduationDate: string;
}

interface SocialLinks {
  linkedin: string;
  other: string;
}

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  socialLinks: SocialLinks;
}

const ProfilePage: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    workExperience: [],
    education: [],
    skills: [],
    socialLinks: { linkedin: '', other: '' }
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    } else if (user) {
      setProfile(prevProfile => ({
        ...prevProfile,
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.emailAddresses[0]?.emailAddress || '',
      }));
    }
  }, [isLoaded, isSignedIn, router, user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: 'socialLinks' | null = null
  ) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => {
      if (section === 'socialLinks') {
        return {
          ...prevProfile,
          socialLinks: {
            ...prevProfile.socialLinks,
            [name]: value,
          },
        };
      } else {
        return {
          ...prevProfile,
          [name]: value,
        };
      }
    });
  };

  const addWorkExperience = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      workExperience: [...prevProfile.workExperience, {
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        isCurrent: false,
        isVisible: true
      }]
    }));
  };

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string | boolean) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      workExperience: prevProfile.workExperience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeWorkExperience = (index: number) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      workExperience: prevProfile.workExperience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      education: [...prevProfile.education, {
        degree: '',
        institution: '',
        graduationDate: ''
      }]
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      education: prevProfile.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      education: prevProfile.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = (skill: string) => {
    if (!profile.skills.includes(skill)) {
      setProfile(prevProfile => ({
        ...prevProfile,
        skills: [...prevProfile.skills, skill]
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      skills: prevProfile.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the profile data to your backend
    console.log('Profile data to be saved:', profile);
    // Implement API call to save profile data
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#003366] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Basic Information</h2>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full p-2 bg-[#004080] rounded text-white"
              required
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-2 bg-[#004080] rounded text-white"
              required
            />
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full p-2 bg-[#004080] rounded text-white"
            />
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="w-full p-2 bg-[#004080] rounded text-white"
            />
          </section>

          {/* Work Experience */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Work Experience</h2>
            {profile.workExperience.map((exp, index) => (
              <div key={index} className="p-4 bg-[#004080] rounded space-y-2">
                <input
                  type="text"
                  value={exp.jobTitle}
                  onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
                  placeholder="Job Title"
                  className="w-full p-2 bg-[#003366] rounded text-white"
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                  placeholder="Company"
                  className="w-full p-2 bg-[#003366] rounded text-white"
                />
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                    className="w-1/2 p-2 bg-[#003366] rounded text-white"
                  />
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                    disabled={exp.isCurrent}
                    className="w-1/2 p-2 bg-[#003366] rounded text-white"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exp.isCurrent}
                    onChange={(e) => updateWorkExperience(index, 'isCurrent', e.target.checked)}
                    className="mr-2"
                  />
                  <label>Current Position</label>
                </div>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                  placeholder="Job Description"
                  className="w-full p-2 bg-[#003366] rounded text-white"
                  rows={3}
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => updateWorkExperience(index, 'isVisible', !exp.isVisible)}
                    className="bg-[#ff9966] text-[#003366] px-4 py-2 rounded hover:bg-[#ff8855]"
                  >
                    {exp.isVisible ? 'Hide' : 'Show'}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeWorkExperience(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addWorkExperience}
              className="bg-[#ff9966] text-[#003366] px-4 py-2 rounded hover:bg-[#ff8855]"
            >
              Add Work Experience
            </button>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Education</h2>
            {profile.education.map((edu, index) => (
              <div key={index} className="p-4 bg-[#004080] rounded space-y-2">
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder="Degree"
                  className="w-full p-2 bg-[#003366] rounded text-white"
                />
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  placeholder="Institution"
                  className="w-full p-2 bg-[#003366] rounded text-white"
                />
                <input
                  type="date"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                  className="w-full p-2 bg-[#003366] rounded text-white"
                />
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addEducation}
              className="bg-[#ff9966] text-[#003366] px-4 py-2 rounded hover:bg-[#ff8855]"
            >
              Add Education
            </button>
          </section>

          {/* Skills */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((skill, index) => (
                <span key={index} className="bg-[#004080] px-3 py-1 rounded-full flex items-center">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add a skill"
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  addSkill((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
              className="w-full p-2 bg-[#004080] rounded text-white"
            />
          </section>

          {/* Social Links */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Social Links</h2>
            <input
              type="url"
              name="linkedin"
              value={profile.socialLinks.linkedin}
              onChange={(e) => handleInputChange(e, 'socialLinks')}
              placeholder="LinkedIn Profile URL"
              className="w-full p-2 bg-[#004080] rounded text-white"
            />
            <input
              type="url"
              name="other"
              value={profile.socialLinks.other}
              onChange={(e) => handleInputChange(e, 'socialLinks')}
              placeholder="Other relevant link"
              className="w-full p-2 bg-[#004080] rounded text-white"
            />
          </section>

          <button 
            type="submit" 
            className="bg-[#ff9966] text-[#003366] py-3 px-6 rounded-md text-lg font-semibold hover:bg-[#ff8855] transition duration-200"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;