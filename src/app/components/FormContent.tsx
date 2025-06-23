"use client";

import React from "react";

interface FormContentProps {
  activePage: string;
  formType?: string;
}

export const FormContent: React.FC<FormContentProps> = ({
  activePage,
  formType,
}) => {
  const renderInfoForm = () => (
    <div className="space-y-4 sm:space-y-6 w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          Basic Information
        </h2>
        <div className="border-b border-white/20 pb-3 sm:pb-4"></div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div className="form-field">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            className="form-input"
            placeholder="Enter your first name"
          />
        </div>
        <div className="form-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="form-input"
            placeholder="Enter your last name"
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter your email address"
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            className="form-input"
            placeholder="Enter your phone number"
          />
        </div>
      </div>
    </div>
  );

  const renderDetailsForm = () => (
    <div className="space-y-4 sm:space-y-6 w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          Additional Details
        </h2>
        <div className="border-b border-white/20 pb-3 sm:pb-4"></div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div className="form-field">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            className="form-input"
            placeholder="Enter your company name"
          />
        </div>
        <div className="form-field">
          <label htmlFor="position">Job Title</label>
          <input
            type="text"
            id="position"
            className="form-input"
            placeholder="Enter your job title"
          />
        </div>
        <div className="form-field">
          <label htmlFor="experience">Years of Experience</label>
          <select id="experience" className="form-select">
            <option value="">Select years of experience</option>
            <option value="0-1">0-1 years</option>
            <option value="2-5">2-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="skills">Skills</label>
          <textarea
            id="skills"
            rows={3}
            className="form-textarea"
            placeholder="List your key skills"
          />
        </div>
      </div>
    </div>
  );

  const renderOtherForm = () => (
    <div className="space-y-4 sm:space-y-6 w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          Other Information
        </h2>
        <div className="border-b border-white/20 pb-3 sm:pb-4"></div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div className="form-field">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            className="form-input"
            placeholder="Enter your location"
          />
        </div>
        <div className="form-field">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            className="form-input"
            placeholder="Enter your website URL"
          />
        </div>
        <div className="form-field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            rows={4}
            className="form-textarea"
            placeholder="Tell us about yourself"
          />
        </div>
      </div>
    </div>
  );

  const renderEndingForm = () => (
    <div className="space-y-4 sm:space-y-6 w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          Final Steps
        </h2>
        <div className="border-b border-white/20 pb-3 sm:pb-4"></div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div className="form-field">
          <label htmlFor="preferences">Communication Preferences</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-200">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-200">SMS notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-200">Newsletter subscription</span>
            </label>
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="referral">How did you hear about us?</label>
          <select id="referral" className="form-select">
            <option value="">Select an option</option>
            <option value="social">Social Media</option>
            <option value="search">Search Engine</option>
            <option value="friend">Friend/Colleague</option>
            <option value="advertisement">Advertisement</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="comments">Additional Comments</label>
          <textarea
            id="comments"
            rows={3}
            className="form-textarea"
            placeholder="Any additional comments or questions?"
          />
        </div>
      </div>
    </div>
  );

  // Render different content based on formType
  switch (formType) {
    case "info":
      return renderInfoForm();
    case "details":
      return renderDetailsForm();
    case "other":
      return renderOtherForm();
    case "ending":
      return renderEndingForm();
    default:
      // Fallback to page ID for backward compatibility
      switch (activePage) {
        case "1":
          return renderInfoForm();
        case "2":
          return renderDetailsForm();
        case "3":
          return renderOtherForm();
        case "4":
          return renderEndingForm();
        default:
          return renderInfoForm();
      }
  }
};
