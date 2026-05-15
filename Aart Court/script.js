(function () {
  var RATING_OPTIONS = ['1', '2', '3', '4', '5', 'N/A'];
  var NPS_OPTIONS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  var residentDetails = [
    { key: 'unitApartmentNo', label: 'Unit / Apartment No.', placeholder: 'Example: A-1202' },
    { key: 'blockTower', label: 'Block / Tower', placeholder: 'Example: Tower A' },
    { key: 'surveyMonthYear', label: 'Survey Month / Year', placeholder: 'May 2026' },
    { key: 'lengthOfResidence', label: 'Length of Residence', placeholder: 'Example: 18 months' }
  ];

  var sections = [
    {
      title: 'A. Overall Living Experience',
      note: 'General satisfaction, community feel and lease intent',
      items: [
        { key: 'q1', type: 'rating', label: 'Q1. How satisfied are you with your overall living experience in this residence this month?' },
        { key: 'q2', type: 'nps', label: 'Q2. How likely are you to recommend this building to a friend or colleague?', hint: '0 = Not at all likely, 10 = Extremely likely' },
        { key: 'q3', type: 'single', label: 'Q3. Which best describes your intention when your lease expires?', options: ['Definitely renew', 'Likely to renew', 'Undecided', 'Considering relocation', 'Planning to vacate'] },
        { key: 'q4', type: 'rating', label: 'Q4. How would you rate the sense of community and neighbourliness in the building?', hint: '1 = Very poor, 5 = Excellent' }
      ]
    },
    {
      title: 'B. Apartment Unit Quality',
      note: 'Finishes, fixtures, appliances, storage and natural light',
      items: [
        { key: 'q5', type: 'rating', label: 'Q5. How satisfied are you with the quality of finishes and fixtures in your apartment?', hint: 'Floors, walls, joinery and fittings' },
        { key: 'q6', type: 'rating', label: 'Q6. How satisfied are you with the condition and performance of kitchen appliances provided?' },
        { key: 'q7', type: 'rating', label: 'Q7. How adequate is the storage space in your unit?', hint: '1 = Very inadequate, 5 = More than adequate' },
        { key: 'q8', type: 'rating', label: 'Q8. How satisfied are you with natural light and window quality in your apartment?' },
        { key: 'q9', type: 'yesno', label: 'Q9. Have you experienced any unresolved defects or snags in your unit this month?' },
        { key: 'q10', type: 'paragraph', label: 'Q10. Comments on unit quality', required: false }
      ]
    },
    {
      title: 'C. Utilities & Power Reliability',
      note: 'Electricity, water, backup generator and hot water',
      items: [
        { key: 'q11', type: 'rating', label: 'Q11. How satisfied are you with the reliability of electricity supply to your unit?' },
        { key: 'q12', type: 'rating', label: 'Q12. How would you rate the performance of the backup generator during grid outages?', hint: 'Transition speed and duration' },
        { key: 'q13', type: 'rating', label: 'Q13. How satisfied are you with water supply?', hint: 'Pressure, reliability and hot water availability' },
        { key: 'q14', type: 'single', label: 'Q14. Approximately how many power interruptions affected your daily life this month?', options: ['None', '1-2 interruptions', '3-5 interruptions', 'More than 5 interruptions'] },
        { key: 'q15', type: 'paragraph', label: 'Q15. Comments on utilities', required: false }
      ]
    },
    {
      title: 'D. Indoor Air Quality & Thermal Comfort',
      note: 'HVAC, temperature, ventilation and acoustic comfort',
      items: [
        { key: 'q16', type: 'rating', label: 'Q16. How satisfied are you with temperature control and cooling/heating in your apartment?' },
        { key: 'q17', type: 'rating', label: 'Q17. How would you rate ventilation and air freshness inside your unit?', hint: '1 = Very poor, 5 = Excellent' },
        { key: 'q18', type: 'rating', label: 'Q18. How satisfied are you with acoustic comfort?', hint: 'Noise from neighbours, corridors or outside' },
        {
          key: 'q19',
          type: 'checkbox',
          label: 'Q19. Did you notice any of the following this month?',
          hint: 'Select all that apply',
          options: [
            'Stuffiness / poor ventilation',
            'Noise from neighbours',
            'Excessive heat',
            'Noise from building systems',
            'Excessive cold',
            'Mould or damp',
            'None of the above'
          ]
        }
      ]
    },
    {
      title: 'E. Security & Safety',
      note: 'Access control, CCTV, guard presence and personal safety',
      items: [
        { key: 'q20', type: 'rating', label: 'Q20. How safe do you feel living in this building overall?', hint: '1 = Very unsafe, 5 = Very safe' },
        { key: 'q21', type: 'rating', label: 'Q21. How would you rate the professionalism and responsiveness of security personnel?', hint: '1 = Very poor, 5 = Excellent' },
        { key: 'q22', type: 'rating', label: 'Q22. How satisfied are you with access control?', hint: 'Entry gates, lobby, lifts and parking' },
        { key: 'q23', type: 'rating', label: 'Q23. How adequate is CCTV coverage across the building and estate?', hint: '1 = Very inadequate, 5 = More than adequate' },
        { key: 'q24', type: 'yesno', label: 'Q24. Did you experience or witness any security incident this month?' },
        { key: 'q25', type: 'paragraph', label: 'Q25. Comments on security', required: false }
      ]
    },
    {
      title: 'F. Cleaning & Estate Appearance',
      note: 'Common areas, grounds and waste management',
      items: [
        { key: 'q26', type: 'rating', label: 'Q26. How would you rate the cleanliness of building common areas?', hint: 'Lobby, lifts, corridors and stairwells' },
        { key: 'q27', type: 'rating', label: 'Q27. How satisfied are you with the upkeep of outdoor and landscaped areas and estate grounds?' },
        { key: 'q28', type: 'rating', label: 'Q28. How would you rate waste collection and bin management?', hint: 'Frequency, hygiene and odour control' },
        { key: 'q29', type: 'yesno', label: 'Q29. Were cleaning and grounds staff courteous and unobtrusive?' }
      ]
    },
    {
      title: 'G. Health, Safety & Environment (HSE)',
      note: 'Fire safety, child safety, hazards and sustainability',
      items: [
        { key: 'q30', type: 'rating', label: "Q30. How confident are you in the building's fire safety systems and emergency evacuation procedures?", hint: '1 = Not at all confident, 5 = Fully confident' },
        { key: 'q31', type: 'yesno', label: 'Q31. Are fire exits, extinguishers, and emergency signage clearly visible and unobstructed?' },
        { key: 'q32', type: 'rating', label: 'Q32. How satisfied are you with child-safety provisions?', hint: 'Play areas, barriers, lift safety, pool fencing if applicable' },
        { key: 'q33', type: 'yesno', label: 'Q33. Did you observe any unresolved safety hazard this month?' },
        { key: 'q34', type: 'rating', label: "Q34. How satisfied are you with the building's sustainability practices?", hint: 'Recycling, energy and water conservation' }
      ]
    },
    {
      title: 'H. Amenities & Shared Facilities',
      note: 'Pool, gym, lounge, concierge, parking and lifts',
      items: [
        { key: 'q35', type: 'rating', label: 'Q35. How satisfied are you with the quality and upkeep of the swimming pool and surrounding area?' },
        { key: 'q36', type: 'rating', label: 'Q36. How would you rate the gym/fitness facility?', hint: 'Equipment, cleanliness and availability' },
        { key: 'q37', type: 'rating', label: "Q37. How satisfied are you with residents' lounge, function rooms, or communal social spaces?" },
        { key: 'q38', type: 'rating', label: 'Q38. How would you rate parking facilities?', hint: 'Allocation, security, cleanliness and lighting' },
        { key: 'q39', type: 'rating', label: 'Q39. How satisfied are you with concierge and front-desk services?', hint: 'Parcel management, visitor handling and requests' },
        { key: 'q40', type: 'yesno', label: 'Q40. Are lift and vertical transport services reliable and well-maintained?' },
        { key: 'q41', type: 'paragraph', label: 'Q41. Comments on amenities', required: false }
      ]
    },
    {
      title: 'I. Property Management Responsiveness',
      note: 'Maintenance, communication and lease administration',
      items: [
        { key: 'q42', type: 'yesno', label: 'Q42. Did you submit a maintenance or service request this month?' },
        {
          type: 'conditional',
          source: 'q42',
          value: 'Yes',
          items: [
            { key: 'q43', type: 'single', label: 'Q43. How quickly was your maintenance request acknowledged?', options: ['Within 2 hours', 'Within 4 hours', 'Same day', 'Next day or more', 'No acknowledgement received'] },
            { key: 'q44', type: 'rating', label: 'Q44. How satisfied were you with the quality and completeness of the repair or service carried out?' },
            { key: 'q45', type: 'yesno', label: 'Q45. Were technicians or tradespeople professional, punctual, and respectful of your home?' }
          ]
        },
        { key: 'q46', type: 'rating', label: 'Q46. How would you rate communication from property management?', hint: 'Notices, planned works and newsletters' },
        { key: 'q47', type: 'rating', label: 'Q47. How satisfied are you with lease administration?', hint: 'Clarity of billing, statements and renewal process' }
      ]
    },
    {
      title: 'J. Digital Services & Smart Building Features',
      note: 'Connectivity, resident app and smart home systems',
      items: [
        { key: 'q48', type: 'rating', label: 'Q48. How satisfied are you with internet connectivity speed and reliability within the building?' },
        { key: 'q49', type: 'rating', label: 'Q49. How would you rate the resident app or digital portal?', hint: 'Service requests, payments and notices' },
        { key: 'q50', type: 'rating', label: 'Q50. How satisfied are you with smart home features in your unit?', hint: 'Smart locks, intercom and automated systems' }
      ]
    },
    {
      title: 'K. Open Feedback & Value for Money',
      note: 'Priorities, value perception and suggestions',
      items: [
        { key: 'q51', type: 'rating', label: 'Q51. How would you rate your residence as value for money relative to the rent and service charge you pay?', hint: '1 = Very poor value, 5 = Excellent value' },
        {
          key: 'q52',
          type: 'single',
          label: 'Q52. Which service area needs the most improvement this month?',
          options: [
            'Unit quality & maintenance',
            'Amenities (pool, gym, lounge)',
            'Power & utilities',
            'Property management responsiveness',
            'Air quality & thermal comfort',
            'Connectivity & digital services',
            'Security',
            'Noise & acoustic comfort',
            'Cleaning & estate appearance',
            'Parking',
            'HSE',
            'Concierge services'
          ]
        },
        { key: 'q53', type: 'paragraph', label: 'Q53. What single improvement would most enhance your quality of life in this residence?', hint: 'Your most impactful suggestion' },
        { key: 'q54', type: 'paragraph', label: 'Q54. Any commendations for staff or management, or other comments you wish to raise?', hint: 'Other feedback', required: false }
      ]
    }
  ];

  var form = document.getElementById('surveyForm');
  var detailsContainer = document.getElementById('residentDetails');
  var sectionsContainer = document.getElementById('surveySections');
  var status = document.getElementById('formStatus');
  var submitButton = form.querySelector("button[type='submit']");

  function createElement(tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text) {
      element.textContent = text;
    }
    return element;
  }

  function renderResidentDetails() {
    residentDetails.forEach(function (field) {
      var label = createElement('label', 'field');
      label.appendChild(createElement('span', '', field.label));

      var input = document.createElement('input');
      input.name = field.key;
      input.type = 'text';
      input.required = true;
      input.autocomplete = 'off';
      if (field.placeholder) {
        input.placeholder = field.placeholder;
      }

      label.appendChild(input);
      detailsContainer.appendChild(label);
    });
  }

  function renderSections() {
    sections.forEach(function (section) {
      var fieldset = createElement('fieldset', 'survey-section');
      fieldset.appendChild(createElement('legend', '', section.title));
      fieldset.appendChild(createElement('p', 'section-note', section.note));

      section.items.forEach(function (item) {
        if (item.type === 'conditional') {
          fieldset.appendChild(renderConditionalBlock(item));
        } else {
          fieldset.appendChild(renderQuestion(item));
        }
      });

      sectionsContainer.appendChild(fieldset);
    });
  }

  function renderConditionalBlock(item) {
    var block = createElement('div', 'conditional-block');
    block.dataset.conditionalSource = item.source;
    block.dataset.conditionalValue = item.value;
    block.hidden = true;

    item.items.forEach(function (question) {
      block.appendChild(renderQuestion(question));
    });

    return block;
  }

  function renderQuestion(question) {
    if (question.type === 'paragraph') {
      return renderParagraph(question);
    }

    var wrapper = createElement('div', 'question');
    wrapper.appendChild(createElement('p', 'question-title', question.label));
    if (question.hint) {
      wrapper.appendChild(createElement('p', 'hint', question.hint));
    }

    if (question.type === 'rating') {
      wrapper.appendChild(renderOptions(question, RATING_OPTIONS, 'scale-grid', 'radio'));
    } else if (question.type === 'nps') {
      wrapper.appendChild(renderOptions(question, NPS_OPTIONS, 'nps-grid', 'radio'));
    } else if (question.type === 'yesno') {
      wrapper.appendChild(renderOptions(question, ['Yes', 'No'], 'inline-options', 'radio'));
    } else if (question.type === 'single') {
      wrapper.appendChild(renderOptions(question, question.options, 'choice-grid', 'radio'));
    } else if (question.type === 'checkbox') {
      wrapper.dataset.requiredCheckbox = question.key;
      wrapper.appendChild(renderOptions(question, question.options, 'choice-grid', 'checkbox'));
    }

    return wrapper;
  }

  function renderParagraph(question) {
    var label = createElement('label', 'field question');
    label.appendChild(createElement('span', 'question-title', question.label));
    if (question.hint) {
      label.appendChild(createElement('span', 'hint', question.hint));
    }

    var textarea = document.createElement('textarea');
    textarea.name = question.key;
    textarea.rows = 5;
    textarea.required = question.required !== false;
    label.appendChild(textarea);

    return label;
  }

  function renderOptions(question, options, className, inputType) {
    var grid = createElement('div', className);
    grid.setAttribute('role', inputType === 'radio' ? 'radiogroup' : 'group');
    grid.setAttribute('aria-label', question.label);

    options.forEach(function (option, index) {
      var label = document.createElement('label');
      var input = document.createElement('input');
      input.name = question.key;
      input.type = inputType;
      input.value = option;
      input.required = inputType === 'radio' && question.required !== false && index === 0;

      label.appendChild(input);
      label.appendChild(createElement('span', '', option));
      grid.appendChild(label);
    });

    return grid;
  }

  function setStatus(message, type) {
    status.textContent = message || '';
    status.className = 'form-status';
    if (type) {
      status.classList.add('is-' + type);
    }
  }

  function selectedValue(name) {
    var selected = form.querySelector("input[name='" + name + "']:checked");
    return selected ? selected.value : '';
  }

  function updateConditionalBlocks() {
    var blocks = Array.prototype.slice.call(form.querySelectorAll('[data-conditional-source]'));

    blocks.forEach(function (block) {
      var shouldShow = selectedValue(block.dataset.conditionalSource) === block.dataset.conditionalValue;
      block.hidden = !shouldShow;

      Array.prototype.slice.call(block.querySelectorAll('input, textarea, select')).forEach(function (input) {
        input.disabled = !shouldShow;
        if (!shouldShow) {
          input.checked = false;
          if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT' && input.type === 'text') {
            input.value = '';
          }
        }
      });
    });
  }

  function validateCheckboxGroups() {
    var requiredGroups = Array.prototype.slice.call(form.querySelectorAll('[data-required-checkbox]'));

    for (var i = 0; i < requiredGroups.length; i++) {
      var name = requiredGroups[i].dataset.requiredCheckbox;
      if (!form.querySelector("input[name='" + name + "']:checked")) {
        setStatus('Please select at least one option for Q19.', 'error');
        requiredGroups[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
    }

    return true;
  }

  function applyExclusiveNoneRule(changedInput) {
    if (changedInput.type !== 'checkbox' || !changedInput.checked || changedInput.name !== 'q19') {
      return;
    }

    var group = Array.prototype.slice.call(form.querySelectorAll("input[name='q19']"));
    if (changedInput.value === 'None of the above') {
      group.forEach(function (input) {
        if (input !== changedInput) {
          input.checked = false;
        }
      });
      return;
    }

    group.forEach(function (input) {
      if (input.value === 'None of the above') {
        input.checked = false;
      }
    });
  }

  function buildPayload() {
    var formData = new FormData(form);
    var payload = new URLSearchParams();

    formData.forEach(function (value, key) {
      payload.append(key, value);
    });

    return payload;
  }

  function isConfiguredEndpoint(endpoint) {
    return endpoint && endpoint.indexOf('PASTE_AART_COURT_APPS_SCRIPT_WEB_APP_URL_HERE') === -1;
  }

  renderResidentDetails();
  renderSections();
  updateConditionalBlocks();

  form.addEventListener('change', function (event) {
    applyExclusiveNoneRule(event.target);
    updateConditionalBlocks();
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    setStatus('', '');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!validateCheckboxGroups()) {
      return;
    }

    var endpoint = form.getAttribute('data-endpoint').trim();
    if (!isConfiguredEndpoint(endpoint)) {
      setStatus('Paste the deployed Aart Court Apps Script Web App URL into index.html before publishing.', 'error');
      return;
    }

    submitButton.disabled = true;
    setStatus('Submitting survey...', '');

    fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: buildPayload().toString()
    })
      .then(function () {
        form.reset();
        updateConditionalBlocks();
        setStatus('Survey submitted. Thank you for your feedback.', 'success');
      })
      .catch(function () {
        setStatus('The survey could not be submitted. Please check the Web App URL and try again.', 'error');
      })
      .finally(function () {
        submitButton.disabled = false;
      });
  });
})();
