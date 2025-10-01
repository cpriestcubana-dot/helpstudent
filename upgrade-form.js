// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const examTypeSelect = document.getElementById('examType');
    const coreSubjectsContainer = document.getElementById('coreSubjects');
    const electiveSubjectsContainer = document.getElementById('electiveSubjects');
    const addSubjectBtn = document.getElementById('addSubjectBtn');
    
    // Get functions from the global ExamConfig object
    const {
        getExamTypes,
        getCoreSubjects,
        getElectiveGroups,
        getGradingSystem
    } = window.ExamConfig || {};
    
    // Initialize the exam type dropdown
    function initExamTypeDropdown() {
        const examTypes = getExamTypes();
        examTypeSelect.innerHTML = '<option value="">Select Exam Type</option>';
        
        examTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type.value;
            option.textContent = type.label;
            examTypeSelect.appendChild(option);
        });
    }
    
    // Render core subjects
    function renderCoreSubjects(examType) {
        const coreSubjects = getCoreSubjects(examType);
        coreSubjectsContainer.innerHTML = '';
        
        if (coreSubjects.length === 0) {
            coreSubjectsContainer.style.display = 'none';
            return;
        }
        
        coreSubjectsContainer.style.display = 'block';
        
        const heading = document.createElement('h3');
        heading.className = 'text-lg font-medium text-gray-900 mb-4';
        heading.textContent = 'Core Subjects';
        coreSubjectsContainer.appendChild(heading);
        
        const subjectsList = document.createElement('div');
        subjectsList.className = 'space-y-4';
        
        coreSubjects.forEach(subject => {
            const subjectDiv = document.createElement('div');
            subjectDiv.className = 'bg-gray-50 p-4 rounded-lg';
            
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'flex items-center mb-2';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = subject.id;
            checkbox.name = subject.name;
            checkbox.value = subject.value;
            checkbox.className = 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded';
            
            const label = document.createElement('label');
            label.htmlFor = subject.id;
            label.className = 'ml-2 block text-sm text-gray-900';
            label.textContent = subject.label;
            
            checkboxDiv.appendChild(checkbox);
            checkboxDiv.appendChild(label);
            
            const gradeSelection = document.createElement('div');
            gradeSelection.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 mt-2';
            
            // Current Grade
            const currentGradeDiv = document.createElement('div');
            const currentLabel = document.createElement('label');
            currentLabel.htmlFor = `${subject.id}Current`;
            currentLabel.className = 'block text-sm font-medium text-gray-700 mb-1';
            currentLabel.textContent = 'Current Grade';
            
            const currentSelect = document.createElement('select');
            currentSelect.id = `${subject.id}Current`;
            currentSelect.name = `${subject.id}Current`;
            currentSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500';
            
            // Add event listener to update target grade options
            currentSelect.addEventListener('change', updateTargetGradeOptions);
            
            currentGradeDiv.appendChild(currentLabel);
            currentGradeDiv.appendChild(currentSelect);
            
            // Target Grade
            const targetGradeDiv = document.createElement('div');
            const targetLabel = document.createElement('label');
            targetLabel.htmlFor = `${subject.id}Target`;
            targetLabel.className = 'block text-sm font-medium text-gray-700 mb-1';
            targetLabel.textContent = 'Target Grade';
            
            const targetSelect = document.createElement('select');
            targetSelect.id = `${subject.id}Target`;
            targetSelect.name = `${subject.id}Target`;
            targetSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500';
            targetSelect.disabled = true;
            
            targetGradeDiv.appendChild(targetLabel);
            targetGradeDiv.appendChild(targetSelect);
            
            gradeSelection.appendChild(currentGradeDiv);
            gradeSelection.appendChild(targetGradeDiv);
            
            subjectDiv.appendChild(checkboxDiv);
            subjectDiv.appendChild(gradeSelection);
            subjectsList.appendChild(subjectDiv);
        });
        
        coreSubjectsContainer.appendChild(subjectsList);
    }
    
    // Render elective subjects
    function renderElectiveSubjects(examType) {
        const electiveGroups = getElectiveGroups(examType);
        electiveSubjectsContainer.innerHTML = '';
        
        if (Object.keys(electiveGroups).length === 0) {
            electiveSubjectsContainer.style.display = 'none';
            return;
        }
        
        electiveSubjectsContainer.style.display = 'block';
        
        const heading = document.createElement('h3');
        heading.className = 'text-lg font-medium text-gray-900 mb-4';
        heading.textContent = 'Elective Subjects';
        electiveSubjectsContainer.appendChild(heading);
        
        // Add subject button
        const addButtonContainer = document.createElement('div');
        addButtonContainer.className = 'mb-4';
        
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.id = 'addSubjectBtn';
        addButton.className = 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
        addButton.innerHTML = `
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Add Subject
        `;
        
        addButton.addEventListener('click', addElectiveSubject);
        addButtonContainer.appendChild(addButton);
        electiveSubjectsContainer.appendChild(addButtonContainer);
        
        // Container for elective subjects
        const subjectsContainer = document.createElement('div');
        subjectsContainer.id = 'electiveSubjectsList';
        subjectsContainer.className = 'space-y-4';
        
        // Add one elective subject by default
        addElectiveSubject();
        
        electiveSubjectsContainer.appendChild(subjectsContainer);
    }
    
    // Add a new elective subject
    function addElectiveSubject() {
        const electiveGroups = getElectiveGroups(examTypeSelect.value);
        const container = document.getElementById('electiveSubjectsList');
        
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'bg-gray-50 p-4 rounded-lg border border-gray-200';
        
        // Subject selection
        const subjectGroupDiv = document.createElement('div');
        subjectGroupDiv.className = 'mb-4';
        
        const subjectLabel = document.createElement('label');
        subjectLabel.htmlFor = `electiveSubject${container.children.length}`;
        subjectLabel.className = 'block text-sm font-medium text-gray-700 mb-1';
        subjectLabel.textContent = 'Subject';
        
        const subjectSelect = document.createElement('select');
        subjectSelect.name = 'electiveSubjects[]';
        subjectSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500';
        subjectSelect.required = true;
        
        // Add empty option
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'Select a subject';
        subjectSelect.appendChild(emptyOption);
        
        // Add subject options grouped by category
        Object.entries(electiveGroups).forEach(([groupName, subjects]) => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = groupName;
            
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.value;
                option.textContent = subject.label;
                optgroup.appendChild(option);
            });
            
            subjectSelect.appendChild(optgroup);
        });
        
        subjectGroupDiv.appendChild(subjectLabel);
        subjectGroupDiv.appendChild(subjectSelect);
        
        // Grade selection
        const gradeSelection = document.createElement('div');
        gradeSelection.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
        
        // Current Grade
        const currentGradeDiv = document.createElement('div');
        const currentLabel = document.createElement('label');
        currentLabel.htmlFor = `electiveCurrent${container.children.length}`;
        currentLabel.className = 'block text-sm font-medium text-gray-700 mb-1';
        currentLabel.textContent = 'Current Grade';
        
        const currentSelect = document.createElement('select');
        currentSelect.name = 'electiveCurrent[]';
        currentSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 current-grade-select';
        currentSelect.required = true;
        
        // Add event listener to update target grade options
        currentSelect.addEventListener('change', updateTargetGradeOptions);
        
        currentGradeDiv.appendChild(currentLabel);
        currentGradeDiv.appendChild(currentSelect);
        
        // Target Grade
        const targetGradeDiv = document.createElement('div');
        const targetLabel = document.createElement('label');
        targetLabel.htmlFor = `electiveTarget${container.children.length}`;
        targetLabel.className = 'block text-sm font-medium text-gray-700 mb-1';
        targetLabel.textContent = 'Target Grade';
        
        const targetSelect = document.createElement('select');
        targetSelect.name = 'electiveTarget[]';
        targetSelect.className = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 target-grade-select';
        targetSelect.required = true;
        targetSelect.disabled = true;
        
        targetGradeDiv.appendChild(targetLabel);
        targetGradeDiv.appendChild(targetSelect);
        
        gradeSelection.appendChild(currentGradeDiv);
        gradeSelection.appendChild(targetGradeDiv);
        
        // Remove button
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500';
        removeButton.innerHTML = `
            <svg class="-ml-0.5 mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Remove
        `;
        removeButton.addEventListener('click', () => {
            subjectDiv.remove();
            // Update required attribute on remaining selects
            updateRequiredAttributes();
        });
        
        subjectDiv.appendChild(subjectGroupDiv);
        subjectDiv.appendChild(gradeSelection);
        subjectDiv.appendChild(removeButton);
        
        container.appendChild(subjectDiv);
        
        // Initialize grade options
        updateGradeOptions();
        
        // Update required attributes
        updateRequiredAttributes();
    }
    
    // Update required attributes for form validation
    function updateRequiredAttributes() {
        const container = document.getElementById('electiveSubjectsList');
        const subjectSelects = container.querySelectorAll('select[name="electiveSubjects[]"]');
        const currentSelects = container.querySelectorAll('.current-grade-select');
        const targetSelects = container.querySelectorAll('.target-grade-select');
        
        // Only make the last row required
        subjectSelects.forEach((select, index) => {
            select.required = index === subjectSelects.length - 1;
        });
        
        currentSelects.forEach((select, index) => {
            select.required = index === currentSelects.length - 1;
        });
        
        targetSelects.forEach((select, index) => {
            select.required = index === targetSelects.length - 1;
        });
    }
    
    // Update grade options based on selected exam type
    function updateGradeOptions() {
        const examType = examTypeSelect.value;
        if (!examType) return;
        
        const gradingSystem = getGradingSystem(examType);
        
        // Update core subject grade selects
        const coreCurrentSelects = document.querySelectorAll('#coreSubjects select[id$="Current"]');
        const coreTargetSelects = document.querySelectorAll('#coreSubjects select[id$="Target"]');
        
        updateSelectOptions(coreCurrentSelects, gradingSystem);
        updateSelectOptions(coreTargetSelects, gradingSystem);
        
        // Update elective subject grade selects
        const electiveCurrentSelects = document.querySelectorAll('.current-grade-select');
        const electiveTargetSelects = document.querySelectorAll('.target-grade-select');
        
        updateSelectOptions(electiveCurrentSelects, gradingSystem);
        updateSelectOptions(electiveTargetSelects, gradingSystem);
    }
    
    // Update options for a select element
    function updateSelectOptions(selects, options) {
        selects.forEach(select => {
            const currentValue = select.value;
            select.innerHTML = '';
            
            // Add empty option for target grade selects
            if (select.classList.contains('target-grade-select') && !select.hasAttribute('required')) {
                const emptyOption = document.createElement('option');
                emptyOption.value = '';
                emptyOption.textContent = 'Select a grade';
                select.appendChild(emptyOption);
            }
            
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.label;
                select.appendChild(optionElement);
            });
            
            // Restore previous value if it exists in the new options
            if (currentValue && Array.from(select.options).some(opt => opt.value === currentValue)) {
                select.value = currentValue;
            }
            
            // Trigger change event to update target grade options
            if (select.classList.contains('current-grade-select')) {
                select.dispatchEvent(new Event('change'));
            }
        });
    }
    
    // Update target grade options based on current grade selection
    function updateTargetGradeOptions(event) {
        const currentSelect = event?.target || this;
        const targetSelect = currentSelect.closest('.grid')?.querySelector('.target-grade-select');
        
        if (!targetSelect) return;
        
        const currentValue = currentSelect.value;
        const options = Array.from(currentSelect.options);
        
        // Enable/disable target select based on current selection
        targetSelect.disabled = !currentValue;
        
        if (!currentValue) {
            targetSelect.value = '';
            return;
        }
        
        // Find the current grade in the options
        const currentGradeIndex = options.findIndex(opt => opt.value === currentValue);
        
        // Update target grade options to only allow better grades
        Array.from(targetSelect.options).forEach((option, index) => {
            if (index === 0) return; // Skip the first empty option
            
            const optionGradeIndex = options.findIndex(opt => opt.value === option.value);
            option.disabled = optionGradeIndex >= currentGradeIndex;
            
            // Clear the selection if it's no longer valid
            if (option.selected && option.disabled) {
                targetSelect.value = '';
            }
        });
        
        // If no grade is selected, select the first available better grade
        if (!targetSelect.value) {
            const firstEnabledOption = Array.from(targetSelect.options).find(opt => !opt.disabled && opt.value);
            if (firstEnabledOption) {
                targetSelect.value = firstEnabledOption.value;
            }
        }
        
        // Update payment summary when grades change
        updatePaymentSummary();
    }
    
    // Update payment summary
    function updatePaymentSummary() {
        // This function will be implemented later
        console.log('Updating payment summary...');
    }
    
    // Initialize the form
    function initForm() {
        if (!window.ExamConfig) {
            console.error('ExamConfig is not loaded. Please make sure exam-config.js is included before this script.');
            return;
        }

        initExamTypeDropdown();
        
        // Add event listener for exam type changes
        examTypeSelect.addEventListener('change', handleExamTypeChange);
        
        // Add event delegation for dynamically added elements
        document.addEventListener('change', handleDynamicElementChanges);
        
        // Initial render if there's a default exam type
        if (examTypeSelect.value) {
            handleExamTypeChange();
        }
    }
    
    function handleExamTypeChange() {
        const examType = examTypeSelect.value;
        
        if (examType) {
            renderCoreSubjects(examType);
            renderElectiveSubjects(examType);
            updateGradeOptions();
        } else {
            coreSubjectsContainer.innerHTML = '';
            electiveSubjectsContainer.innerHTML = '';
        }
        
        updatePaymentSummary();
    }
    
    function handleDynamicElementChanges(e) {
        if (e.target.classList.contains('current-grade-select')) {
            updateTargetGradeOptions(e);
        }
    }
    
    // Start the application
    initForm();
});
