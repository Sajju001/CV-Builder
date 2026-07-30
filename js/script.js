/**
 * ProCV Builder - Professional Resume/CV Studio Engine
 * Pure Vanilla JS, Client-Side A4 PDF Generator
 */

// Sample Professional Avatar SVG Data URL (Fallback Avatar)
const SAMPLE_AVATAR_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#0f172a"/>
  <circle cx="100" cy="75" r="38" fill="#e2e8f0"/>
  <path d="M 30,185 C 30,135 60,125 100,125 C 140,125 170,135 170,185 Z" fill="#cbd5e1"/>
  <path d="M 85,125 L 100,145 L 115,125 Z" fill="#38bdf8"/>
</svg>
`)}`;

// Career Objective Presets
const OBJECTIVE_PRESETS = {
  software: "Results-driven Software Engineer with extensive experience in architecting scalable web applications, optimizing distributed databases, and guiding engineering projects. Expert in modern JavaScript/TypeScript ecosystems, cloud microservices, and clean code principles.",
  management: "Dynamic and goal-oriented Operations Manager with proven success in leading cross-functional teams, optimizing workflow processes, and maximizing organizational efficiency. Skilled in strategic planning, budget management, and client relationship building.",
  fresh_graduate: "Enthusiastic and dedicated Computer Science graduate seeking an entry-level position to utilize strong academic technical knowledge, problem-solving abilities, and passion for software development in a progressive corporate environment.",
  administrative: "Detail-oriented Administrative Officer with extensive experience in office administration, document management, executive support, and record keeping. Adept at managing multi-line communications and optimizing office procedures.",
  finance: "Detail-oriented Financial Analyst & Accountant with expertise in financial reporting, auditing, ledger reconciliation, and budget analysis. Proven track record of ensuring compliance and driving financial performance.",
  customer_service: "Customer-centric Client Relations Specialist with strong interpersonal and conflict-resolution skills. Committed to delivering exceptional service, resolving complex inquiries, and enhancing customer satisfaction.",
  teaching: "Passionate Educator with a strong academic background dedicated to creating engaging learning environments, developing modern curriculum materials, and mentoring students to achieve academic excellence."
};

// Initial Sample Data for Instant Professional Presentation
const SAMPLE_DATA = {
  templateStyle: 'corporate', // 'corporate', 'twocolumn', 'executive', 'minimal'
  colorTheme: 'noir',        // 'noir', 'navy', 'emerald', 'charcoal'
  fontFamily: 'inter',        // 'inter', 'garamond', 'playfair', 'roboto', 'merriweather'
  photoShape: 'square',       // 'square', 'circle', 'rounded', 'bordered'
  photoSize: 'medium',        // 'small', 'medium', 'large'
  basicInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    photoDataUrl: SAMPLE_AVATAR_DATA_URL,
    showPhoto: true
  },
  personalProfile: {
    fatherName: "",
    caste: "",
    cnic: "",
    dob: "",
    domicile: "",
    maritalStatus: "",
    nationality: "",
    religion: "",
    showPersonalProfile: true
  },
  careerObjective: "",
  education: [
    {
      id: "",
      degree: "",
      year: "",
      institute: "",
      grade: ""
    },
    {
      id: "",
      degree: "",
      year: "",
      institute: "",
      grade: ""
    },
    {
      id: "",
      degree: "",
      year: "",
      institute: "",
      grade: ")"
    }
  ],
  experience: [
    {
      id: "",
      title: "",
      company: "",
      location: "",
      dates: "",
      responsibilities: ""
    },
    {
      id: "",
      title: "",
      company: "",
      location: "",
      dates: "",
      responsibilities: ""
    }
  ],
  skills: "",
  languages: [
    { id: "lang_1", language: "English" },
  
  ],
  hobbies: ""
};

// Current State
let cvData = JSON.parse(JSON.stringify(SAMPLE_DATA));
let currentZoom = 1.0;

// Initialize Application Engine
document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  bindFormInputs();
  bindPhotoUploader();
  bindDynamicButtons();
  bindGlobalControls();
  renderAllFormSections();
  renderCVPreview();
});

/* Local Storage Synchronization */
function saveToLocalStorage() {
  try {
    localStorage.setItem('pro_cv_builder_state', JSON.stringify(cvData));
    showSaveIndicator();
  } catch (e) {
    console.warn("Storage save skipped:", e);
  }
}

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem('pro_cv_builder_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      cvData = Object.assign({}, SAMPLE_DATA, parsed);
    }
  } catch (e) {
    console.warn("Storage load skipped:", e);
  }
}

function showSaveIndicator() {
  const badge = document.getElementById('save-status-badge');
  if (badge) {
    badge.style.opacity = "1";
    setTimeout(() => { badge.style.opacity = "0.7"; }, 1200);
  }
}

/* Form Inputs Binding */
function bindFormInputs() {
  // Basic Info Inputs
  const basicFields = ['fullName', 'email', 'phone', 'address'];
  basicFields.forEach(field => {
    const input = document.getElementById(`input-${field}`);
    if (input) {
      input.value = cvData.basicInfo[field] || '';
      input.addEventListener('input', (e) => {
        cvData.basicInfo[field] = e.target.value;
        saveToLocalStorage();
        renderCVPreview();
      });
    }
  });

  // Personal Profile Fields
  const personalFields = ['fatherName', 'caste', 'cnic', 'dob', 'domicile', 'maritalStatus', 'nationality', 'religion'];
  personalFields.forEach(field => {
    const input = document.getElementById(`input-${field}`);
    if (input) {
      input.value = cvData.personalProfile[field] || '';
      input.addEventListener('input', (e) => {
        cvData.personalProfile[field] = e.target.value;
        saveToLocalStorage();
        renderCVPreview();
      });
    }
  });

  // Personal Profile Checkbox
  const showPersonalChk = document.getElementById('chk-show-personal');
  if (showPersonalChk) {
    showPersonalChk.checked = cvData.personalProfile.showPersonalProfile !== false;
    showPersonalChk.addEventListener('change', (e) => {
      cvData.personalProfile.showPersonalProfile = e.target.checked;
      saveToLocalStorage();
      renderCVPreview();
    });
  }

  // Career Objective Preset Selection
  const careerPresetSelect = document.getElementById('select-career-preset');
  if (careerPresetSelect) {
    careerPresetSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val !== 'custom' && OBJECTIVE_PRESETS[val]) {
        cvData.careerObjective = OBJECTIVE_PRESETS[val];
        const objTextarea = document.getElementById('input-career-objective');
        if (objTextarea) objTextarea.value = cvData.careerObjective;
        saveToLocalStorage();
        renderCVPreview();
      }
    });
  }

  // Career Objective Textarea
  const objTextarea = document.getElementById('input-career-objective');
  if (objTextarea) {
    objTextarea.value = cvData.careerObjective || '';
    objTextarea.addEventListener('input', (e) => {
      cvData.careerObjective = e.target.value;
      saveToLocalStorage();
      renderCVPreview();
    });
  }

  // Skills & Hobbies
  const skillsInput = document.getElementById('input-skills');
  if (skillsInput) {
    skillsInput.value = cvData.skills || '';
    skillsInput.addEventListener('input', (e) => {
      cvData.skills = e.target.value;
      saveToLocalStorage();
      renderCVPreview();
    });
  }

  const hobbiesInput = document.getElementById('input-hobbies');
  if (hobbiesInput) {
    hobbiesInput.value = cvData.hobbies || '';
    hobbiesInput.addEventListener('input', (e) => {
      cvData.hobbies = e.target.value;
      saveToLocalStorage();
      renderCVPreview();
    });
  }

  // Header Selectors
  const templateSelect = document.getElementById('select-template-style');
  if (templateSelect) {
    templateSelect.value = cvData.templateStyle || 'corporate';
    templateSelect.addEventListener('change', (e) => {
      cvData.templateStyle = e.target.value;
      saveToLocalStorage();
      renderCVPreview();
    });
  }

  const colorSelect = document.getElementById('select-color-theme');
  if (colorSelect) {
    colorSelect.value = cvData.colorTheme || 'noir';
    colorSelect.addEventListener('change', (e) => {
      cvData.colorTheme = e.target.value;
      saveToLocalStorage();
      renderCVPreview();
    });
  }

  const fontSelect = document.getElementById('select-font-family');
  if (fontSelect) {
    fontSelect.value = cvData.fontFamily || 'inter';
    fontSelect.addEventListener('change', (e) => {
      cvData.fontFamily = e.target.value;
      saveToLocalStorage();
      renderCVPreview();
    });
  }

  // Photo Style Controls
  const photoShapeSelect = document.getElementById('select-photo-shape');
  if (photoShapeSelect) {
    photoShapeSelect.value = cvData.photoShape || 'square';
    photoShapeSelect.addEventListener('change', (e) => {
      cvData.photoShape = e.target.value;
      saveToLocalStorage();
      renderCVPreview();
    });
  }

  const photoSizeSelect = document.getElementById('select-photo-size');
  if (photoSizeSelect) {
    photoSizeSelect.value = cvData.photoSize || 'medium';
    photoSizeSelect.addEventListener('change', (e) => {
      cvData.photoSize = e.target.value;
      saveToLocalStorage();
      renderCVPreview();
    });
  }
}

/* Photo Upload Engine */
function bindPhotoUploader() {
  const fileInput = document.getElementById('input-photo-file');
  const showPhotoChk = document.getElementById('chk-show-photo');
  const removeBtn = document.getElementById('btn-remove-photo');
  const sampleAvatarBtn = document.getElementById('btn-load-sample-avatar');
  const dropZone = document.getElementById('photo-drop-zone');

  if (showPhotoChk) {
    showPhotoChk.checked = cvData.basicInfo.showPhoto !== false;
    showPhotoChk.addEventListener('change', (e) => {
      cvData.basicInfo.showPhoto = e.target.checked;
      saveToLocalStorage();
      renderCVPreview();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        processPhotoFile(file);
      }
    });
  }

  // Drag & Drop Handling
  if (dropZone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
      });
    });

    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files[0]) {
        processPhotoFile(files[0]);
      }
    });
  }

  if (sampleAvatarBtn) {
    sampleAvatarBtn.addEventListener('click', () => {
      cvData.basicInfo.photoDataUrl = SAMPLE_AVATAR_DATA_URL;
      cvData.basicInfo.showPhoto = true;
      if (showPhotoChk) showPhotoChk.checked = true;
      updatePhotoThumbnail();
      saveToLocalStorage();
      renderCVPreview();
    });
  }

  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      cvData.basicInfo.photoDataUrl = "";
      if (fileInput) fileInput.value = "";
      updatePhotoThumbnail();
      saveToLocalStorage();
      renderCVPreview();
    });
  }
}

function processPhotoFile(file) {
  if (!file.type.startsWith('image/')) {
    alert('Please upload a valid image file (JPG or PNG).');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    cvData.basicInfo.photoDataUrl = e.target.result;
    cvData.basicInfo.showPhoto = true;
    const showPhotoChk = document.getElementById('chk-show-photo');
    if (showPhotoChk) showPhotoChk.checked = true;
    updatePhotoThumbnail();
    saveToLocalStorage();
    renderCVPreview();
  };
  reader.readAsDataURL(file);
}

function updatePhotoThumbnail() {
  const thumb = document.getElementById('photo-preview-thumb');
  if (!thumb) return;

  if (cvData.basicInfo.photoDataUrl) {
    thumb.innerHTML = `<img src="${cvData.basicInfo.photoDataUrl}" alt="Profile Photo" />`;
  } else {
    thumb.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
  }
}

/* Accordion Controls & Actions */
function bindGlobalControls() {
  // Accordions
  const sectionTitles = document.querySelectorAll('.section-title');
  sectionTitles.forEach(title => {
    title.addEventListener('click', () => {
      const body = title.nextElementSibling;
      const icon = title.querySelector('.toggle-icon');
      if (body) {
        body.classList.toggle('collapsed');
        if (icon) {
          icon.textContent = body.classList.contains('collapsed') ? '➕' : '➖';
        }
      }
    });
  });

  // Global Actions
  document.getElementById('btn-print')?.addEventListener('click', () => window.print());
  document.getElementById('btn-pdf')?.addEventListener('click', downloadPDF);
  document.getElementById('btn-reset')?.addEventListener('click', resetForm);
  document.getElementById('btn-sample')?.addEventListener('click', loadSampleData);

  // Zoom
  document.getElementById('btn-zoom-in')?.addEventListener('click', () => setZoom(currentZoom + 0.1));
  document.getElementById('btn-zoom-out')?.addEventListener('click', () => setZoom(currentZoom - 0.1));
  document.getElementById('btn-zoom-reset')?.addEventListener('click', () => setZoom(1.0));

  // Mobile Tabs
  const tabForm = document.getElementById('tab-btn-form');
  const tabPreview = document.getElementById('tab-btn-preview');
  const formPanel = document.querySelector('.form-panel');
  const previewPanel = document.querySelector('.preview-panel');

  if (tabForm && tabPreview) {
    tabForm.addEventListener('click', () => {
      tabForm.classList.add('active');
      tabPreview.classList.remove('active');
      formPanel.classList.remove('hide-mobile');
      previewPanel.classList.add('hide-mobile');
    });

    tabPreview.addEventListener('click', () => {
      tabPreview.classList.add('active');
      tabForm.classList.remove('active');
      previewPanel.classList.remove('hide-mobile');
      formPanel.classList.add('hide-mobile');
    });
  }
}

function setZoom(zoom) {
  currentZoom = Math.min(Math.max(zoom, 0.4), 1.6);
  const paper = document.getElementById('cv-preview-paper');
  const label = document.getElementById('zoom-level-text');
  if (paper) {
    paper.style.transform = `scale(${currentZoom})`;
  }
  if (label) {
    label.textContent = `${Math.round(currentZoom * 100)}%`;
  }
}

/* Dynamic Field Generators */
function bindDynamicButtons() {
  document.getElementById('btn-add-education')?.addEventListener('click', () => {
    cvData.education.push({
      id: 'edu_' + Date.now(),
      degree: '',
      year: '',
      institute: '',
      grade: ''
    });
    renderEducationFormList();
    saveToLocalStorage();
    renderCVPreview();
  });

  document.getElementById('btn-add-experience')?.addEventListener('click', () => {
    cvData.experience.push({
      id: 'exp_' + Date.now(),
      title: '',
      company: '',
      location: '',
      dates: '',
      responsibilities: ''
    });
    renderExperienceFormList();
    saveToLocalStorage();
    renderCVPreview();
  });

  document.getElementById('btn-add-language')?.addEventListener('click', () => {
    cvData.languages.push({
      id: 'lang_' + Date.now(),
      language: ''
    });
    renderLanguagesFormList();
    saveToLocalStorage();
    renderCVPreview();
  });
}

function renderAllFormSections() {
  updatePhotoThumbnail();
  renderEducationFormList();
  renderExperienceFormList();
  renderLanguagesFormList();
}

function renderEducationFormList() {
  const container = document.getElementById('education-list-container');
  if (!container) return;

  container.innerHTML = '';
  cvData.education.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    div.innerHTML = `
      <div class="dynamic-item-header">
        <span class="item-number">Education #${index + 1}</span>
        <button type="button" class="btn btn-danger-sm" onclick="removeEducation('${item.id}')">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Degree / Qualification</label>
          <input type="text" value="${escapeHtml(item.degree)}" placeholder="e.g. BS Computer Science" oninput="updateEduField('${item.id}', 'degree', this.value)">
        </div>
        <div class="form-group">
          <label>Year / Duration</label>
          <input type="text" value="${escapeHtml(item.year)}" placeholder="e.g. 2020 - 2024" oninput="updateEduField('${item.id}', 'year', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Board / University</label>
          <input type="text" value="${escapeHtml(item.institute)}" placeholder="e.g. University of Karachi" oninput="updateEduField('${item.id}', 'institute', this.value)">
        </div>
        <div class="form-group">
          <label>Grade / Division / CGPA</label>
          <input type="text" value="${escapeHtml(item.grade)}" placeholder="e.g. 3.85 / 4.0 CGPA" oninput="updateEduField('${item.id}', 'grade', this.value)">
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

function updateEduField(id, field, val) {
  const item = cvData.education.find(e => e.id === id);
  if (item) {
    item[field] = val;
    saveToLocalStorage();
    renderCVPreview();
  }
}

function removeEducation(id) {
  cvData.education = cvData.education.filter(e => e.id !== id);
  renderEducationFormList();
  saveToLocalStorage();
  renderCVPreview();
}

function renderExperienceFormList() {
  const container = document.getElementById('experience-list-container');
  if (!container) return;

  container.innerHTML = '';
  cvData.experience.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    div.innerHTML = `
      <div class="dynamic-item-header">
        <span class="item-number">Experience #${index + 1}</span>
        <button type="button" class="btn btn-danger-sm" onclick="removeExperience('${item.id}')">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Job Title / Position</label>
          <input type="text" value="${escapeHtml(item.title)}" placeholder="e.g. Senior Software Engineer" oninput="updateExpField('${item.id}', 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Company / Organization</label>
          <input type="text" value="${escapeHtml(item.company)}" placeholder="e.g. TechCorp Solutions" oninput="updateExpField('${item.id}', 'company', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Location</label>
          <input type="text" value="${escapeHtml(item.location)}" placeholder="e.g. Karachi, Pakistan" oninput="updateExpField('${item.id}', 'location', this.value)">
        </div>
        <div class="form-group">
          <label>Dates / Duration</label>
          <input type="text" value="${escapeHtml(item.dates)}" placeholder="e.g. Jan 2022 - Present" oninput="updateExpField('${item.id}', 'dates', this.value)">
        </div>
      </div>
      <div class="form-group">
        <label>Key Responsibilities & Achievements</label>
        <textarea rows="3" placeholder="Bullet points or summary..." oninput="updateExpField('${item.id}', 'responsibilities', this.value)">${escapeHtml(item.responsibilities)}</textarea>
      </div>
    `;
    container.appendChild(div);
  });
}

function updateExpField(id, field, val) {
  const item = cvData.experience.find(e => e.id === id);
  if (item) {
    item[field] = val;
    saveToLocalStorage();
    renderCVPreview();
  }
}

function removeExperience(id) {
  cvData.experience = cvData.experience.filter(e => e.id !== id);
  renderExperienceFormList();
  saveToLocalStorage();
  renderCVPreview();
}

function renderLanguagesFormList() {
  const container = document.getElementById('languages-list-container');
  if (!container) return;

  container.innerHTML = '';
  cvData.languages.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    div.innerHTML = `
      <div class="dynamic-item-header">
        <span class="item-number">Language #${index + 1}</span>
        <button type="button" class="btn btn-danger-sm" onclick="removeLanguage('${item.id}')">✕ Remove</button>
      </div>
      <div class="form-group">
        <label>Language Name</label>
        <input type="text" value="${escapeHtml(item.language)}" placeholder="e.g. English, Urdu, Sindhi" oninput="updateLangField('${item.id}', 'language', this.value)">
      </div>
    `;
    container.appendChild(div);
  });
}

function updateLangField(id, field, val) {
  const item = cvData.languages.find(l => l.id === id);
  if (item) {
    item[field] = val;
    saveToLocalStorage();
    renderCVPreview();
  }
}

function removeLanguage(id) {
  cvData.languages = cvData.languages.filter(l => l.id !== id);
  renderLanguagesFormList();
  saveToLocalStorage();
  renderCVPreview();
}

/* Reset & Sample Data */
function resetForm() {
  if (confirm("Reset the CV? All current information will be cleared.")) {
    cvData = {
      templateStyle: 'corporate',
      colorTheme: 'noir',
      fontFamily: 'inter',
      photoShape: 'square',
      photoSize: 'medium',
      basicInfo: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        photoDataUrl: "",
        showPhoto: true
      },
      personalProfile: {
        fatherName: "",
        caste: "",
        cnic: "",
        dob: "",
        domicile: "",
        maritalStatus: "",
        nationality: "",
        religion: "",
        showPersonalProfile: true
      },
      careerObjective: "",
      education: [],
      experience: [],
      skills: "",
      languages: [],
      hobbies: ""
    };
    saveToLocalStorage();
    bindFormInputs();
    renderAllFormSections();
    renderCVPreview();
  }
}

function loadSampleData() {
  cvData = JSON.parse(JSON.stringify(SAMPLE_DATA));
  saveToLocalStorage();
  bindFormInputs();
  renderAllFormSections();
  renderCVPreview();
}

/* High Quality A4 PDF Exporter */
function downloadPDF() {
  const element = document.getElementById('cv-preview-paper');
  if (!element) return;

  const fullName = cvData.basicInfo.fullName || "Resume";
  const cleanName = fullName.replace(/[^a-zA-Z0-9]/g, '_');

  if (typeof html2pdf !== 'undefined') {
    // Scroll top so HTML2Canvas captures top edge cleanly
    window.scrollTo(0, 0);

    const opt = {
      margin: [6, 6, 6, 6],
      filename: `${cleanName}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        letterRendering: true,
        scrollY: 0,
        scrollX: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Temporarily reset transform zoom for exact 1:1 render
    const prevTransform = element.style.transform;
    element.style.transform = 'none';

    html2pdf().set(opt).from(element).save().then(() => {
      element.style.transform = prevTransform;
    }).catch(err => {
      console.error("PDF export error:", err);
      element.style.transform = prevTransform;
      window.print();
    });
  } else {
    window.print();
  }
}

/* Render A4 CV Document Live Preview */
function renderCVPreview() {
  const paper = document.getElementById('cv-preview-paper');
  if (!paper) return;

  const template = cvData.templateStyle || 'corporate';
  const theme = cvData.colorTheme || 'noir';
  const font = cvData.fontFamily || 'inter';

  paper.className = `cv-paper template-${template} color-${theme} font-${font}`;

  const { basicInfo, personalProfile, careerObjective, education, experience, skills, languages, hobbies, photoShape, photoSize } = cvData;

  // Contact Items
  let contactHtml = '';
  if (basicInfo.email) contactHtml += `<div class="cv-contact-item"><span>📧</span> ${escapeHtml(basicInfo.email)}</div>`;
  if (basicInfo.phone) contactHtml += `<div class="cv-contact-item"><span>📞</span> ${escapeHtml(basicInfo.phone)}</div>`;
  if (basicInfo.address) contactHtml += `<div class="cv-contact-item"><span>📍</span> ${escapeHtml(basicInfo.address)}</div>`;

  // Photo Frame
  let photoHtml = '';
  if (basicInfo.showPhoto !== false && basicInfo.photoDataUrl) {
    const shapeClass = `shape-${photoShape || 'square'}`;
    const sizeClass = `size-${photoSize || 'medium'}`;
    photoHtml = `<img src="${basicInfo.photoDataUrl}" alt="Profile Photo" class="cv-photo-frame ${shapeClass} ${sizeClass}" />`;
  }

  // Personal Profile Section
  let personalProfileSection = '';
  if (personalProfile.showPersonalProfile !== false) {
    const items = [
      { label: "Father's Name", val: personalProfile.fatherName },
      { label: "CNIC", val: personalProfile.cnic },
      { label: "Date of Birth", val: personalProfile.dob },
      { label: "Domicile", val: personalProfile.domicile },
      { label: "Marital Status", val: personalProfile.maritalStatus },
      { label: "Nationality", val: personalProfile.nationality },
      { label: "Religion", val: personalProfile.religion },
      { label: "Caste", val: personalProfile.caste }
    ].filter(i => i.val && i.val.trim() !== '');

    if (items.length > 0) {
      personalProfileSection = `
        <div class="cv-section">
          <div class="cv-section-title">Personal Profile</div>
          <div class="cv-personal-grid">
            ${items.map(i => `
              <div class="cv-personal-item">
                <span class="cv-personal-label">${escapeHtml(i.label)}:</span>
                <span class="cv-personal-val">${escapeHtml(i.val)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  // Education Section
  let eduSection = '';
  if (education && education.length > 0) {
    eduSection = `
      <div class="cv-section">
        <div class="cv-section-title">Education & Qualifications</div>
        <table class="cv-table">
          <thead>
            <tr>
              <th style="width: 6%;">S.No</th>
              <th style="width: 34%;">Degree / Qualification</th>
              <th style="width: 20%;">Year</th>
              <th style="width: 28%;">Board / University</th>
              <th style="width: 12%;">Grade / CGPA</th>
            </tr>
          </thead>
          <tbody>
            ${education.map((edu, idx) => `
              <tr>
                <td style="text-align: center;">${idx + 1}</td>
                <td><strong>${escapeHtml(edu.degree || '—')}</strong></td>
                <td>${escapeHtml(edu.year || '—')}</td>
                <td>${escapeHtml(edu.institute || '—')}</td>
                <td>${escapeHtml(edu.grade || '—')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // Experience Section
  let expSection = '';
  if (experience && experience.length > 0) {
    expSection = `
      <div class="cv-section">
        <div class="cv-section-title">Work Experience</div>
        ${experience.map(exp => {
          let formattedResp = '';
          if (exp.responsibilities) {
            const lines = exp.responsibilities.split('\n').filter(l => l.trim() !== '');
            if (lines.length > 1 || lines[0].startsWith('•') || lines[0].startsWith('-')) {
              formattedResp = `<ul>${lines.map(line => `<li>${escapeHtml(line.replace(/^[•\-]\s*/, ''))}</li>`).join('')}</ul>`;
            } else {
              formattedResp = `<p>${escapeHtml(exp.responsibilities)}</p>`;
            }
          }
          return `
            <div class="cv-exp-item">
              <div class="cv-exp-header">
                <div>
                  <span class="cv-exp-role">${escapeHtml(exp.title || 'Job Title')}</span> 
                  ${exp.company ? `<span class="cv-exp-company">| ${escapeHtml(exp.company)}</span>` : ''}
                </div>
                <div class="cv-exp-date">${escapeHtml(exp.dates || '')}</div>
              </div>
              ${exp.location ? `<div style="font-size: 8.5pt; color: #555;">${escapeHtml(exp.location)}</div>` : ''}
              <div class="cv-exp-desc">${formattedResp}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // Objective
  let objectiveSection = '';
  if (careerObjective && careerObjective.trim() !== '') {
    objectiveSection = `
      <div class="cv-section">
        <div class="cv-section-title">Career Objective</div>
        <div class="cv-body-text">${escapeHtml(careerObjective)}</div>
      </div>
    `;
  }

  // Skills
  let skillsSection = '';
  if (skills && skills.trim() !== '') {
    skillsSection = `
      <div class="cv-section">
        <div class="cv-section-title">Technical Skills & Competencies</div>
        <div class="cv-body-text" style="font-weight: 500;">
          ${escapeHtml(skills)}
        </div>
      </div>
    `;
  }

  // Bottom Two Column (Languages & Hobbies)
  let bottomColumns = '';
  const langItems = (languages || []).filter(l => l.language && l.language.trim() !== '');
  if (langItems.length > 0 || (hobbies && hobbies.trim() !== '')) {
    bottomColumns = `
      <div class="cv-section">
        <div class="cv-two-col">
          ${langItems.length > 0 ? `
            <div>
              <div class="cv-section-title">Languages</div>
              <ul class="cv-list-compact">
                ${langItems.map(l => `
                  <li>
                    <span class="tag">${escapeHtml(l.language)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : '<div></div>'}

          ${hobbies && hobbies.trim() !== '' ? `
            <div>
              <div class="cv-section-title">Hobbies & Interests</div>
              <div class="cv-body-text">${escapeHtml(hobbies)}</div>
            </div>
          ` : '<div></div>'}
        </div>
      </div>
    `;
  }

  // Layout Render Routing
  if (template === 'twocolumn') {
    // Two Column Sidebar Layout
    paper.innerHTML = `
      <aside class="cv-sidebar">
        ${photoHtml}
        <div style="border-bottom: 2px solid var(--line-color); padding-bottom: 8px;">
          <h2 style="font-size: 14pt; font-weight: 800; text-transform: uppercase;">${escapeHtml(basicInfo.fullName || 'YOUR NAME')}</h2>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 8.5pt;">
          ${contactHtml}
        </div>
        ${personalProfileSection}
        ${langItems.length > 0 ? `
          <div class="cv-section">
            <div class="cv-section-title">Languages</div>
            <ul class="cv-list-compact">
              ${langItems.map(l => `<li><span class="tag">${escapeHtml(l.language)}</span></li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${hobbies ? `
          <div class="cv-section">
            <div class="cv-section-title">Hobbies</div>
            <div class="cv-body-text">${escapeHtml(hobbies)}</div>
          </div>
        ` : ''}
      </aside>

      <main class="cv-main-col">
        ${objectiveSection}
        ${expSection}
        ${eduSection}
        ${skillsSection}
      </main>
    `;
  } else if (template === 'executive') {
    // Executive Center Header Layout
    paper.innerHTML = `
      <div class="cv-header cv-header-center">
        ${photoHtml}
        <div>
          <h1 class="cv-name">${escapeHtml(basicInfo.fullName || 'YOUR FULL NAME')}</h1>
        </div>
        <div class="cv-contact-row">
          ${contactHtml}
        </div>
      </div>

      ${objectiveSection}
      ${expSection}
      ${eduSection}
      ${skillsSection}
      ${personalProfileSection}
      ${bottomColumns}
    `;
  } else {
    // Standard Corporate & Minimal Layout
    paper.innerHTML = `
      <div class="cv-header">
        <div class="cv-header-text">
          <h1 class="cv-name">${escapeHtml(basicInfo.fullName || 'YOUR FULL NAME')}</h1>
          <div class="cv-contact-row">
            ${contactHtml}
          </div>
        </div>
        ${photoHtml}
      </div>

      ${objectiveSection}
      ${expSection}
      ${eduSection}
      ${skillsSection}
      ${personalProfileSection}
      ${bottomColumns}
    `;
  }
}

// Utility Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
