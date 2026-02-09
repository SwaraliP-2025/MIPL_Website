import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProfessionalNetworkBackground } from "@/components/ProfessionalNetworkBackground";

const CTBFeedback = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    informative: "",
    impact: "",
    projects: [],
    apps: [],
    design: "",
    feedback: "",
    sendCopy: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const scriptURL = "https://script.google.com/macros/s/AKfycbwrtaY6Jz3PdXnkmkT3Bu3nVx7nuck9MnxDq01I97EHKb21rieZhIjfQqVTvJ9za3rQiA/exec";

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleSelectAll = (name, values) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].length === values.length ? [] : values
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(scriptURL, {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify(formData)
      });

      const result = await response.text();
      console.log('Result:', result);
      
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the form?')) {
      setFormData({
        email: "",
        name: "",
        informative: "",
        impact: "",
        projects: [],
        apps: [],
        design: "",
        feedback: "",
        sendCopy: false
      });
    }
  };

  const projectOptions = [
    "Governance Projects",
    "Citizen Centric Projects",
    "Mobility Projects",
    "Education Projects",
    "Security Projects"
  ];

  const appOptions = [
    "Smart Chhatrapati Sambhajinagar WhatsApp Chatbot",
    "Smart Nagrik",
    "Majha Swachhatasathi",
    "Chalo",
    "Saksham",
    "Jal Bell",
    "Clean Streets",
    "CSN - SMART Park"
  ];

  if (submitted) {
    return (
      <Layout>
        <div style={{ position: 'relative', fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif", padding: '100px 20px 20px', minHeight: '100vh' }}>
          <ProfessionalNetworkBackground density="medium" />
          <div style={{ maxWidth: '770px', margin: '0 auto', padding: '12px', position: 'relative', zIndex: 10 }}>
            <div style={{ background: 'white', padding: '50px 30px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <CheckCircle2 style={{ width: '80px', height: '80px', color: '#4caf50', margin: '0 auto 20px' }} />
              <h1 style={{ fontSize: '28px', marginBottom: '20px', fontWeight: '600', color: '#1a1a2e' }}>
                Feedback on the Digital Coffee Table Book of Chhatrapati Sambhajinagar
              </h1>
              <p style={{ fontSize: '16px', color: '#0d47a1', marginBottom: '30px', fontWeight: '500' }}>
                Thank you for your input!
              </p>
              <div style={{ background: '#e8f5e9', border: '1px solid #4caf50', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <p style={{ fontSize: '18px', color: '#2e7d32', fontWeight: '600', margin: 0 }}>
                  ✓ Your response has been recorded.
                </p>
              </div>
              <p style={{ fontSize: '12px', color: '#70757a' }}>This form was created by MIPL</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ position: 'relative', fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif", padding: '100px 20px 20px', color: '#202124', minHeight: '100vh' }}>
        <ProfessionalNetworkBackground density="medium" />
        <div style={{ maxWidth: '770px', margin: '0 auto', padding: '12px', position: 'relative', zIndex: 10 }}>
        {/* Banner */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '200px', 
          borderRadius: '12px', 
          background: 'linear-gradient(90deg, #0a0e27 0%, #1a237e 30%, #0d47a1 70%, #01579b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <img 
            src="/ctb-header.png" 
            alt="Chhatrapati Sambhajinagar" 
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'block', 
              objectFit: 'cover', 
              objectPosition: 'center 35%',
              borderRadius: '8px'
            }}
          />
        </div>

        {/* Header */}
        <div style={{ 
          background: 'white', 
          padding: '32px 24px 24px 24px', 
          borderRadius: '12px', 
          marginBottom: '16px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
          borderTop: '8px solid #0d47a1' 
        }}>
          <h1 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '16px', color: '#1a1a2e', lineHeight: '1.3' }}>
            Feedback on the Digital Coffee Table Book of Chhatrapati Sambhajinagar
          </h1>
          <p style={{ fontSize: '14px', color: '#5f6368', lineHeight: '1.6', marginBottom: '8px' }}>
            Thank you for going through the Coffee Table Book (CTB) on digital initiatives at Chhatrapati Sambhajinagar by Aurangababad Smart City Development Corporation Limited (ASCDCL).
          </p>
          <p style={{ fontSize: '14px', color: '#5f6368', lineHeight: '1.6', marginBottom: '8px' }}>
            We would appreciate your feedback on the CTB as well as the projects therein. Please fill this quick survey and let us know your thoughts!
          </p>
          <p style={{ color: '#5f6368', fontSize: '14px', marginTop: '12px' }}>
            <span style={{ color: '#d93025' }}>* </span>Indicates required question
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #0d47a1' }}>
            <div style={{ fontSize: '17px', color: '#1a1a2e', marginBottom: '18px', fontWeight: '500', lineHeight: '1.6' }}>
              Email <span style={{ color: '#d93025', marginLeft: '2px' }}>*</span>
            </div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Your email address"
              style={{ 
                width: '100%', 
                padding: '14px 16px', 
                border: '2px solid #e0e0e0', 
                borderRadius: '8px', 
                fontSize: '14px', 
                fontFamily: 'inherit', 
                background: '#fafafa',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid #0d47a1';
                e.target.style.background = 'white';
                e.target.style.boxShadow = '0 0 0 4px rgba(13, 71, 161, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid #e0e0e0';
                e.target.style.background = '#fafafa';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Name */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #0d47a1' }}>
            <div style={{ fontSize: '17px', color: '#1a1a2e', marginBottom: '18px', fontWeight: '500', lineHeight: '1.6' }}>
              Your Name
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your answer"
              style={{ 
                width: '100%', 
                padding: '14px 16px', 
                border: '2px solid #e0e0e0', 
                borderRadius: '8px', 
                fontSize: '14px', 
                fontFamily: 'inherit', 
                background: '#fafafa',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid #0d47a1';
                e.target.style.background = 'white';
                e.target.style.boxShadow = '0 0 0 4px rgba(13, 71, 161, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid #e0e0e0';
                e.target.style.background = '#fafafa';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Question 1: How informative */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #0d47a1' }}>
            <div style={{ fontSize: '17px', color: '#1a1a2e', marginBottom: '18px', fontWeight: '500', lineHeight: '1.6' }}>
              How informative did you find the CTB? <span style={{ color: '#d93025', marginLeft: '2px' }}>*</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '20px 0', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '12px', color: '#5f6368', marginRight: '8px' }}>Not very</span>
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <label style={{ fontSize: '12px', color: '#5f6368' }}>{value}</label>
                    <input
                      type="radio"
                      name="informative"
                      value={value}
                      required
                      checked={formData.informative === String(value)}
                      onChange={(e) => setFormData({...formData, informative: e.target.value})}
                      style={{ width: '22px', height: '22px', cursor: 'pointer', accentColor: '#0d47a1' }}
                    />
                  </div>
                ))}
                <span style={{ fontSize: '12px', color: '#5f6368', marginLeft: '8px' }}>Very much</span>
              </div>
            </div>
          </div>

          {/* Question 2: Impact coverage */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #0d47a1' }}>
            <div style={{ fontSize: '17px', color: '#1a1a2e', marginBottom: '18px', fontWeight: '500', lineHeight: '1.6' }}>
              Did you think the CTB covered the impact of the digital projects on Chhatrapati Sambhajinagar? <span style={{ color: '#d93025', marginLeft: '2px' }}>*</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '20px 0', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '12px', color: '#5f6368', marginRight: '8px' }}>Not very</span>
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <label style={{ fontSize: '12px', color: '#5f6368' }}>{value}</label>
                    <input
                      type="radio"
                      name="impact"
                      value={value}
                      required
                      checked={formData.impact === String(value)}
                      onChange={(e) => setFormData({...formData, impact: e.target.value})}
                      style={{ width: '22px', height: '22px', cursor: 'pointer', accentColor: '#0d47a1' }}
                    />
                  </div>
                ))}
                <span style={{ fontSize: '12px', color: '#5f6368', marginLeft: '8px' }}>Very much</span>
              </div>
            </div>
          </div>

          {/* Question 3: IT Projects */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #0d47a1' }}>
            <div style={{ fontSize: '17px', color: '#1a1a2e', marginBottom: '18px', fontWeight: '500', lineHeight: '1.6' }}>
              Which of the IT projects covered in the CTB did you find interesting and would like more information on?
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {projectOptions.map((project) => (
                <div key={project} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="checkbox"
                    checked={formData.projects.includes(project)}
                    onChange={() => handleCheckboxChange('projects', project)}
                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#0d47a1' }}
                  />
                  <label style={{ fontSize: '14px', color: '#202124', cursor: 'pointer', lineHeight: '1.5' }}>
                    {project}
                  </label>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  checked={formData.projects.length === projectOptions.length}
                  onChange={() => handleSelectAll('projects', projectOptions)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#0d47a1' }}
                />
                <label style={{ fontSize: '14px', color: '#202124', cursor: 'pointer', lineHeight: '1.5' }}>
                  Select All
                </label>
              </div>
            </div>
          </div>

          {/* Question 4: Mobile Apps */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #0d47a1' }}>
            <div style={{ fontSize: '17px', color: '#1a1a2e', marginBottom: '18px', fontWeight: '500', lineHeight: '1.6' }}>
              Which of the Mobile apps included in the CTB did you find interesting and would like more information on?
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {appOptions.map((app) => (
                <div key={app} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="checkbox"
                    checked={formData.apps.includes(app)}
                    onChange={() => handleCheckboxChange('apps', app)}
                    style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#0d47a1' }}
                  />
                  <label style={{ fontSize: '14px', color: '#202124', cursor: 'pointer', lineHeight: '1.5' }}>
                    {app}
                  </label>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  checked={formData.apps.length === appOptions.length}
                  onChange={() => handleSelectAll('apps', appOptions)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#0d47a1' }}
                />
                <label style={{ fontSize: '14px', color: '#202124', cursor: 'pointer', lineHeight: '1.5' }}>
                  Select All
                </label>
              </div>
            </div>
          </div>

          {/* Question 5: Design rating */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #0d47a1' }}>
            <div style={{ fontSize: '17px', color: '#1a1a2e', marginBottom: '18px', fontWeight: '500', lineHeight: '1.6' }}>
              How is the overall design and layout of the CTB? <span style={{ color: '#d93025', marginLeft: '2px' }}>*</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '20px 0', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '12px', color: '#5f6368', marginRight: '8px' }}>Not good</span>
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <label style={{ fontSize: '12px', color: '#5f6368' }}>{value}</label>
                    <input
                      type="radio"
                      name="design"
                      value={value}
                      required
                      checked={formData.design === String(value)}
                      onChange={(e) => setFormData({...formData, design: e.target.value})}
                      style={{ width: '22px', height: '22px', cursor: 'pointer', accentColor: '#0d47a1' }}
                    />
                  </div>
                ))}
                <span style={{ fontSize: '12px', color: '#5f6368', marginLeft: '8px' }}>Excellent</span>
              </div>
            </div>
          </div>

          {/* Question 6: Additional feedback */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #0d47a1' }}>
            <div style={{ fontSize: '17px', color: '#1a1a2e', marginBottom: '18px', fontWeight: '500', lineHeight: '1.6' }}>
              Please provide any other feedback that you may like to share about the CTB or any of the projects at Chhatrapati Sambhajinagar!
            </div>
            <textarea
              value={formData.feedback}
              onChange={(e) => setFormData({...formData, feedback: e.target.value})}
              placeholder="Your answer"
              style={{ 
                width: '100%', 
                padding: '14px 16px', 
                border: '2px solid #e0e0e0', 
                borderRadius: '8px', 
                fontSize: '14px', 
                fontFamily: 'inherit', 
                background: '#fafafa',
                resize: 'vertical',
                minHeight: '80px',
                lineHeight: '1.6',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid #0d47a1';
                e.target.style.background = 'white';
                e.target.style.boxShadow = '0 0 0 4px rgba(13, 71, 161, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid #e0e0e0';
                e.target.style.background = '#fafafa';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Send copy checkbox */}
          <div style={{ background: 'white', padding: '28px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #0d47a1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="checkbox"
                checked={formData.sendCopy}
                onChange={(e) => setFormData({...formData, sendCopy: e.target.checked})}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#0d47a1' }}
              />
              <label style={{ fontSize: '14px', color: '#5f6368', cursor: 'pointer' }}>
                Send me a copy of my responses.
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ 
            background: 'white', 
            padding: '28px', 
            borderRadius: '12px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
            gap: '16px' 
          }}>
            <button
              type="submit"
              disabled={submitting}
              style={{ 
                background: 'linear-gradient(90deg, #0a0e27 0%, #1a237e 30%, #0d47a1 70%, #01579b 100%)',
                color: 'white',
                border: 'none',
                padding: '14px 32px',
                fontSize: '15px',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(13, 71, 161, 0.4)',
                opacity: submitting ? 0.7 : 1
              }}
              onMouseOver={(e) => {
                if (!submitting) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(13, 71, 161, 0.6)';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(13, 71, 161, 0.4)';
              }}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              style={{ 
                background: 'transparent',
                color: '#0d47a1',
                border: '2px solid #0d47a1',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#0d47a1';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 15px rgba(13, 71, 161, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#0d47a1';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Clear form
            </button>
          </div>
        </form>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: '#70757a', marginTop: '12px' }}>
          This form was created by MIPL
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default CTBFeedback;
