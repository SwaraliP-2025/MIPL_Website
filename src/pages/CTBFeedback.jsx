import React, { useEffect, useState } from "react";

// Inline CSS for toggle switch to match index.html
const toggleSwitchCSS = `
.toggle-switch {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 14px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: -2px;
  bottom: -3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.switch input:checked + .slider {
  background-color: #0d47a1;
}
.switch input:checked + .slider:before {
  transform: translateX(20px);
}
.toggle-label {
  font-size: 14px;
  color: #5f6368;
}
`;

const scriptURL =
  "https://script.google.com/macros/s/AKfycbzyO7vV22EeM31J9_atjjOBtCHWaWrwqgvbhMe45diGcZAZfY5Qy8hue3liQDrB7hFAMw/exec";


const CTBFeedback = () => {
  const [showInner, setShowInner] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [captchaOpen, setCaptchaOpen] = useState(false);
  const [captcha, setCaptcha] = useState({
    question: "",
    answer: "",
    input: "",
    checked: false,
    error: false,
  });

  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [downloadCount, setDownloadCount] = useState(null);
  const [headerDesc, setHeaderDesc] = useState("Thank you for going through the Coffee Table Book (CTB) on digital initiatives at Chhatrapati Sambhajinagar by Aurangabad Smart City Development Corporation Limited (ASCDCL).");
  const [formDesc, setFormDesc] = useState("We would appreciate your feedback on the CTB as well as the projects therein. Please fill this quick survey and let us know your thoughts!");
  const [showRequiredNote, setShowRequiredNote] = useState(true);

  // ================= DOWNLOAD COUNT =================
  useEffect(() => {
    fetch(`${scriptURL}?action=getDownloadCount`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          setDownloadCount(data.count);
        }
      })
      .catch(() => {});
  }, []);

  const trackDownload = () => {
    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify({
        type: "download",
        timestamp: new Date().toISOString(),
      }),
    });
  };

  // ================= CAPTCHA =================
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const ops = ["+", "-", "*"];
    const op = ops[Math.floor(Math.random() * ops.length)];

    let ans;
    if (op === "+") ans = a + b;
    if (op === "-") ans = a - b;
    if (op === "*") ans = a * b;

    setCaptcha({
      question: `What is ${a} ${op} ${b}?`,
      answer: String(ans),
      input: "",
      checked: false,
      error: false,
    });
  };

  const verifyCaptcha = () => {
    if (captcha.checked && captcha.input === captcha.answer) {
      submitForm();
      setCaptchaOpen(false);
    } else {
      setCaptcha((prev) => ({ ...prev, error: true }));
    }
  };

  // ================= FORM =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const obj = {
      q1_rating: data.get("q1_rating"),
      q2_understanding: data.get("q2_understanding"),
      q3_useful: data.getAll("q3_useful"),
      q4_citizen: data.get("q4_citizen"),
      q4_services_aware: data.get("q4_services_aware"),
      q5_satisfaction: data.get("q5_satisfaction"),
      q6_recommend_email: data.get("q6_recommend_email"),
      email: data.get("email"),
      name: data.get("name"),
      sendCopy: data.get("sendCopy") === "on",
    };

    setFormData(obj);
    generateCaptcha();
    setCaptchaOpen(true);
  };

  const submitForm = () => {
    setSubmitting(true);
    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(() => {
        setHeaderDesc("Team MIPL Thanks you for going through the Coffee Table Book (CTB) on digital initiatives at Chhatrapati Sambhajinagar by Aurangabad Smart City Development Corporation Limited (ASCDCL) and providing your valuable feedback.");
        setFormDesc("");
        setShowRequiredNote(false);
        setSubmitted(true);
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const toggleSelectAll = (checked) => {
    const checkboxes = document.querySelectorAll('input[name="q3_useful"]');
    checkboxes.forEach((c) => (c.checked = checked));
  };

  const clearForm = () => {
    if (window.confirm("Clear form?")) window.location.reload();
  };

  // ================= UI =================

  // After submission, show header and banner, update header description, hide form and required note, show thank you card

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#f5f5f5",
      padding: "20px 0",
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', 'Helvetica Neue', 'Helvetica', sans-serif"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 16px" }}>
        {/* Banner */}
        <div style={styles.bannerWrapper}>
          <img
            src="CTB Feedback Page\gem_header_use.png"
            alt="Chhatrapati Sambhajinagar - A People-Driven Smart City"
            style={styles.banner}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.headerH1}>Feedback on the Digital Coffee Table Book of Chhatrapati Sambhajinagar</h1>
          <p style={styles.headerP}>{headerDesc}</p>
          {formDesc && <p style={styles.headerP}>{formDesc}</p>}
          {showRequiredNote && <p style={styles.requiredNote}>* Indicates required question</p>}
        </div>

        {/* Thank you container after submission */}
        {submitted && (
          <div className="header" style={{
            textAlign: "center",
            padding: "50px 30px",
            background: "white",
            borderRadius: "12px",
            marginBottom: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            borderTop: "8px solid #0d47a1"
          }}>
            <div style={{
              background: "#e8f5e9",
              borderLeft: "4px solid #4caf50",
              padding: "20px",
              borderRadius: "8px",
              marginTop: "20px",
              display: "inline-block",
              textAlign: "left",
              maxWidth: 480,
              width: "100%"
            }}>
              <p style={{ fontSize: "25px", color: "#2e7d32", margin: 0, fontWeight: 600, letterSpacing: 0.5 }}>✓ Your response has been recorded.</p>
              <div style={{ borderTop: "1px solid #4caf50", marginTop: 20, paddingTop: 20, textAlign: "center" }}>
                <p style={{ fontSize: 14, color: "#2e7d32", margin: "10px 0", fontWeight: 600 }}><strong>Maha Infotech Pvt. Ltd. (MIPL)</strong></p>
                <p style={{ fontSize: 12, color: "#2e7d32", margin: "10px 0" }}>
                  B-708, Lodha Supremus, Kolshet Road, Thane - 400607, Maharashtra, India<br />
                  E-Mail: info@consultmipl.com <br />
                  Website: www.consultmipl.com
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        {!submitted && (
        <form id="feedbackForm" onSubmit={handleSubmit}>
          {/* Question 1: Overall rating */}
          <div style={styles.questionCard}>
            <div style={styles.questionTitle}>Overall, how would you rate the CTB? <span style={styles.required}>*</span></div>
            <div style={styles.scaleGroup}>
              <div style={styles.scaleOptions} data-start-label="Poor" data-end-label="Excellent">
                {[1, 2, 3, 4, 5].map((v) => (
                  <div key={v} style={styles.scaleOption}>
                    <label style={styles.scaleLabel}>{v}</label>
                    <input type="radio" name="q1_rating" value={v} required style={styles.radioInput} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question 2: Ease of understanding */}
          <div style={styles.questionCard}>
            <div style={styles.questionTitle}>How easy was it to understand the CTB? <span style={styles.required}>*</span></div>
            <div style={styles.scaleGroup}>
              <div style={styles.scaleOptions} data-start-label="Very Difficult" data-end-label="Very Easy">
                {[1, 2, 3, 4, 5].map((v) => (
                  <div key={v} style={styles.scaleOption}>
                    <label style={styles.scaleLabel}>{v}</label>
                    <input type="radio" name="q2_understanding" value={v} required style={styles.radioInput} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question 3: Most useful part */}
          <div style={styles.questionCard}>
            <div style={styles.questionTitle}>Which part did you find most useful?</div>
            <div style={styles.checkboxGroup}>
              {[
                { id: "useful_info", value: "Project Information", label: "Project Information" },
                { id: "useful_services", value: "Citizen Services", label: "Citizen Services" },
                { id: "useful_impact", value: "Real-life Impact", label: "Real-life Impact" },
                { id: "useful_design", value: "Visual Design", label: "Visual Design" },
                { id: "useful_plans", value: "Future Plans", label: "Future Plans" }
              ].map((item) => (
                <div key={item.id} style={styles.checkboxOption}>
                  <input type="checkbox" id={item.id} name="q3_useful" value={item.value} style={styles.checkboxInput} />
                  <label htmlFor={item.id} style={styles.checkboxLabel}>{item.label}</label>
                </div>
              ))}
              <div style={styles.checkboxOption}>
                <input type="checkbox" id="select_all_useful" onChange={(e) => toggleSelectAll(e.target.checked)} style={styles.checkboxInput} />
                <label htmlFor="select_all_useful" style={styles.checkboxLabel}>Select All</label>
              </div>
            </div>
          </div>

          {/* Question 4: Citizen question */}
          <div style={styles.questionCard}>
            <div style={styles.questionTitle}>Are you a citizen of CSN? <span style={styles.required}>*</span></div>
            <div style={styles.scaleGroup}>
              <div style={styles.scaleOptions} data-start-label="" data-end-label="">
                <div style={styles.scaleOption}>
                  <label style={styles.scaleLabel}>Yes</label>
                  <input type="radio" name="q4_citizen" value="Yes" required onChange={() => setShowInner(true)} style={styles.radioInput} />
                </div>
                <div style={styles.scaleOption}>
                  <label style={styles.scaleLabel}>No</label>
                  <input type="radio" name="q4_citizen" value="No" onChange={() => setShowInner(false)} style={styles.radioInput} />
                </div>
              </div>
            </div>
            {showInner && (
              <div id="q4_inner_question" style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #e0e0e0" }}>
                <div style={styles.questionTitle}>Did the CTB make you aware of city services?<span id="q4_inner_required" style={{ ...styles.required, display: "none" }}> *</span></div>
                <div style={styles.scaleGroup}>
                  <div style={styles.scaleOptions} data-start-label="" data-end-label="">
                    <div style={styles.scaleOption}>
                      <label style={styles.scaleLabel}>Yes</label>
                      <input type="radio" name="q4_services_aware" value="Yes" style={styles.radioInput} />
                    </div>
                    <div style={styles.scaleOption}>
                      <label style={styles.scaleLabel}>No</label>
                      <input type="radio" name="q4_services_aware" value="No" style={styles.radioInput} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Question 5: Overall satisfaction */}
          <div style={styles.questionCard}>
            <div style={styles.questionTitle}>Overall, how satisfied are you with the CTB? <span style={styles.required}>*</span></div>
            <div style={styles.scaleGroup}>
              <div style={styles.scaleOptions} data-start-label="Not Satisfied" data-end-label="Very Satisfied">
                {[1, 2, 3, 4, 5].map((v) => (
                  <div key={v} style={styles.scaleOption}>
                    <label style={styles.scaleLabel}>{v}</label>
                    <input type="radio" name="q5_satisfaction" value={v} required style={styles.radioInput} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question 6: Recommend email */}
          <div style={styles.questionCard}>
            <div style={styles.questionTitle}>Would you like to recommend an email ID to which this CTB can be shared?</div>
            <input type="email" name="q6_recommend_email" placeholder="Email address" style={styles.textInput} />
          </div>

          {/* Email Copy Toggle */}
          <div style={styles.questionCard}>
            <div className="toggle-switch" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <label className="switch" style={{ position: "relative", display: "inline-block", width: 36, height: 14 }}>
                <input
                  type="checkbox"
                  id="sendCopy"
                  name="sendCopy"
                  checked={showEmail}
                  onChange={(e) => setShowEmail(e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span className="slider" style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: showEmail ? "#0d47a1" : "#ccc",
                  transition: ".4s",
                  borderRadius: 34,
                }}>
                  <span style={{
                    position: "absolute",
                    content: '""',
                    height: 20,
                    width: 20,
                    left: showEmail ? 18 : -2,
                    bottom: -3,
                    backgroundColor: "white",
                    transition: ".4s",
                    borderRadius: "50%",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }} />
                </span>
              </label>
              <label htmlFor="sendCopy" className="toggle-label" style={{ fontSize: 14, color: "#5f6368" }}> Click to receive a copy of your responses via email.</label>
            </div>
          </div>

          {/* Email Card (conditional) */}
          {showEmail && (
            <div style={styles.questionCard}>
              <div style={styles.questionTitle}>Enter your Email <span style={styles.required}>*</span></div>
              <input type="email" id="userEmail" name="email" placeholder="Your email address" required style={styles.textInput} />
            </div>
          )}

          {/* Name Card (conditional) */}
          {showEmail && (
            <div style={styles.questionCard}>
              <div style={styles.questionTitle}>Enter your Name</div>
              <input type="text" name="name" placeholder="Your full name" style={styles.textInput} />
            </div>
          )}

          {/* Submit button */}
          <div style={styles.formActions}>
            <button type="submit" style={styles.submitBtn} disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
            <button type="button" style={styles.clearBtn} onClick={clearForm}>Clear form</button>
          </div>
        </form>
        )}

        {/* CAPTCHA */}
        {captchaOpen && (
          <div id="captchaModal" style={styles.captchaModalShow}>
            <div style={styles.captchaContent}>
              <div style={styles.captchaTitle}>Verify you're not a robot</div>
              <div style={styles.captchaCheckboxGroup}>
                <input
                  type="checkbox"
                  id="robotCheckbox"
                  checked={captcha.checked}
                  onChange={(e) => setCaptcha({ ...captcha, checked: e.target.checked })}
                  style={{ width: 16, height: 16, cursor: "pointer" }}
                />
                <label htmlFor="robotCheckbox" style={styles.captchaCheckboxLabel}>I am not a robot</label>
              </div>
              <div style={styles.captchaQuestion}>
                <div style={styles.captchaQuestionText}>{captcha.question}</div>
                <input
                  type="text"
                  id="captchaAnswer"
                  placeholder="Enter your answer"
                  value={captcha.input}
                  onChange={(e) => setCaptcha({ ...captcha, input: e.target.value })}
                  style={styles.captchaInput}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); verifyCaptcha(); } }}
                />
              </div>
              <div style={styles.captchaActions}>
                <button style={styles.captchaBtnVerify} onClick={verifyCaptcha} disabled={submitting}>{submitting ? "Submitting..." : "Verify"}</button>
              </div>
              {captcha.error && (
                <div style={styles.captchaErrorShow}>Please check the box and enter the correct answer</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DOWNLOAD BUTTON */}
      <a
        href="https://consultmipl.com/wp-content/uploads/2026/01/CTB-CSN-19012026.pdf"
        style={styles.downloadFab}
        onClick={trackDownload}
        target="_blank"
        title="Download Coffee Table Book"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span id="downloadText">Download CTB {downloadCount && `(${downloadCount} downloads)`}</span>
      </a>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "770px",
    margin: "0 auto",
    padding: "12px",
    width: "100%"
  },
  bannerWrapper: {
    position: "relative",
    width: "100%",
    height: "250px",
    borderRadius: "12px",
    background: "linear-gradient(90deg, #0a0e27 0%, #1a237e 30%, #0d47a1 70%, #01579b 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },
  banner: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    display: "block",
    objectFit: "cover",
    objectPosition: "center 35%"
  },
  header: {
    background: "white",
    padding: "32px 24px 24px 24px",
    borderRadius: "12px",
    marginBottom: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    borderTop: "8px solid #0d47a1"
  },
  headerH1: {
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#1a1a2e",
    lineHeight: "1.3"
  },
  headerP: {
    fontSize: "14px",
    color: "#5f6368",
    lineHeight: "1.6",
    marginBottom: "8px"
  },
  requiredNote: {
    color: "#5f6368",
    fontSize: "14px",
    marginTop: "12px"
  },
  requiredNoteBefore: {
    content: "'* '",
    color: "#d93025"
  },
  required: {
    color: "#d93025",
    marginLeft: "2px"
  },
  questionCard: {
    background: "white",
    padding: "28px",
    borderRadius: "12px",
    marginBottom: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    borderLeft: "4px solid #0d47a1"
  },
  questionTitle: {
    fontSize: "17px",
    color: "#1a1a2e",
    marginBottom: "18px",
    fontWeight: "500",
    lineHeight: "1.6"
  },
  scaleGroup: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 0",
    gap: "8px"
  },
  scaleOptions: {
    display: "flex",
    gap: "40px",
    alignItems: "center",
    justifyContent: "center"
  },
  scaleOption: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px"
  },
  scaleLabel: {
    fontSize: "12px",
    color: "#5f6368"
  },
  radioInput: {
    width: "22px",
    height: "22px",
    cursor: "pointer",
    accentColor: "#0d47a1"
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  checkboxOption: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  checkboxInput: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    accentColor: "#0d47a1"
  },
  checkboxLabel: {
    fontSize: "14px",
    color: "#202124",
    cursor: "pointer",
    lineHeight: "1.5"
  },
  textInput: {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    background: "#fafafa",
    transition: "all 0.3s ease"
  },
  formActions: {
    background: "white",
    padding: "28px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    gap: "16px"
  },
  submitBtn: {
    background: "linear-gradient(90deg, #0a0e27 0%, #1a237e 30%, #0d47a1 70%, #01579b 100%)",
    color: "white",
    border: "none",
    padding: "14px 32px",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(13, 71, 161, 0.4)"
  },
  clearBtn: {
    background: "transparent",
    color: "#0d47a1",
    border: "2px solid #0d47a1",
    padding: "12px 28px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  toggleSwitch: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px"
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: "48px",
    height: "28px",
    verticalAlign: "middle",
    marginRight: "18px"
  },
  toggleInput: {
    opacity: 0,
    width: 0,
    height: 0,
    position: "absolute"
  },
  slider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ccc",
    transition: "background-color 0.3s",
    borderRadius: "16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.10)"
  },
  sliderChecked: {
    backgroundColor: "#b0bec5"
  },
  sliderKnob: {
    position: "absolute",
    content: "''",
    height: "24px",
    width: "24px",
    left: "2px",
    top: "2px",
    backgroundColor: "white",
    borderRadius: "50%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.13)",
    transition: "transform 0.3s"
  },
  sliderKnobChecked: {
    transform: "translateX(20px)"
  },
  toggleLabel: {
    fontSize: "14px",
    color: "#5f6368"
  },
  captchaModalShow: {
    display: "flex",
    position: "fixed",
    zIndex: 1000,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  captchaContent: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
    maxWidth: "400px",
    width: "90%",
    margin: "0 auto"
  },
  captchaTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: "24px",
    textAlign: "center"
  },
  captchaCheckboxGroup: {
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    background: "#fafafa"
  },
  captchaCheckbox: {
    width: "24px",
    height: "24px",
    cursor: "pointer",
    accentColor: "#0d47a1"
  },
  captchaCheckboxLabel: {
    fontSize: "14px",
    color: "#202124",
    cursor: "pointer",
    userSelect: "none"
  },
  captchaQuestion: {
    marginBottom: "24px"
  },
  captchaQuestionText: {
    fontSize: "14px",
    color: "#5f6368",
    marginBottom: "12px",
    fontWeight: "500"
  },
  captchaInput: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit"
  },
  captchaActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end"
  },
  captchaBtnVerify: {
    padding: "10px 24px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "linear-gradient(90deg, #0a0e27 0%, #1a237e 30%, #0d47a1 70%, #01579b 100%)",
    color: "white"
  },
  captchaErrorShow: {
    color: "#d93025",
    fontSize: "13px",
    marginTop: "8px",
    textAlign: "center",
    display: "block"
  },
  downloadFab: {
    position: "fixed",
    bottom: "28px",
    right: "28px",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(90deg, #0a0e27 0%, #1a237e 30%, #0d47a1 70%, #01579b 100%)",
    color: "white",
    padding: "14px 24px",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 4px 20px rgba(13,71,161,0.5)",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    minWidth: "180px",
    justifyContent: "center"
  }
};

export default CTBFeedback;