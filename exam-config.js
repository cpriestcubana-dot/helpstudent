// Exam type configuration with subjects and grading systems
const examConfig = {
    wasce: {
        name: 'WASSCE (School/Public & Private)',
        hasCoreSubjects: true,
        hasElectives: true,
        coreSubjects: [
            { id: 'coreEnglish', name: 'coreSubjects[]', value: 'english', label: 'English Language' },
            { id: 'coreMaths', name: 'coreSubjects[]', value: 'maths', label: 'Core Mathematics' },
            { id: 'coreScience', name: 'coreSubjects[]', value: 'science', label: 'Integrated Science' },
            { id: 'coreSocial', name: 'coreSubjects[]', value: 'social', label: 'Social Studies' }
        ],
        electiveGroups: {
            'General Science': [
                { value: 'physics', label: 'Physics' },
                { value: 'chemistry', label: 'Chemistry' },
                { value: 'biology', label: 'Biology' },
                { value: 'elective_maths', label: 'Elective Mathematics' },
                { value: 'ict', label: 'ICT' }
            ],
            'General Arts': [
                { value: 'literature', label: 'Literature-in-English' },
                { value: 'history', label: 'History' },
                { value: 'geography', label: 'Geography' },
                { value: 'economics', label: 'Economics' },
                { value: 'government', label: 'Government' },
                { value: 'crs', label: 'Christian Religious Studies' },
                { value: 'irs', label: 'Islamic Religious Studies' },
                { value: 'french', label: 'French' },
                { value: 'ghanaian_lang', label: 'Ghanaian Language' },
                { value: 'music', label: 'Music' }
            ],
            'Business': [
                { value: 'financial_accounting', label: 'Financial Accounting' },
                { value: 'cost_accounting', label: 'Cost Accounting' },
                { value: 'business_mgmt', label: 'Business Management' },
                { value: 'economics_bus', label: 'Economics' },
                { value: 'elective_maths_bus', label: 'Elective Mathematics' },
                { value: 'ict_bus', label: 'ICT' }
            ],
            'Technical': [
                { value: 'tech_drawing', label: 'Technical Drawing' },
                { value: 'building_construction', label: 'Building Construction' },
                { value: 'applied_electricity', label: 'Applied Electricity' },
                { value: 'electronics', label: 'Electronics' },
                { value: 'auto_mechanics', label: 'Auto Mechanics' },
                { value: 'metalwork', label: 'Metalwork' },
                { value: 'woodwork', label: 'Woodwork' },
                { value: 'eng_science', label: 'Engineering Science' }
            ],
            'Home Economics': [
                { value: 'mgmt_living', label: 'Management in Living' },
                { value: 'food_nutrition', label: 'Food & Nutrition' },
                { value: 'clothing_textiles', label: 'Clothing & Textiles' },
                { value: 'economics_he', label: 'Economics' },
                { value: 'art_general', label: 'General Knowledge in Art' },
                { value: 'french_he', label: 'French' }
            ],
            'Visual Arts': [
                { value: 'art_general', label: 'General Knowledge in Art' },
                { value: 'graphic_design', label: 'Graphic Design' },
                { value: 'sculpture', label: 'Sculpture' },
                { value: 'ceramics', label: 'Ceramics' },
                { value: 'picture_making', label: 'Picture Making' },
                { value: 'leatherwork', label: 'Leatherwork' },
                { value: 'basketry', label: 'Basketry' },
                { value: 'jewelry', label: 'Jewelry' },
                { value: 'textiles', label: 'Textiles' }
            ]
        },
        gradingSystem: [
            { value: 'A1', label: 'A1 (Excellent)' },
            { value: 'B2', label: 'B2 (Very Good)' },
            { value: 'B3', label: 'B3 (Good)' },
            { value: 'C4', label: 'C4 (Credit)' },
            { value: 'C5', label: 'C5 (Credit)' },
            { value: 'C6', label: 'C6 (Credit)' },
            { value: 'D7', label: 'D7 (Pass)' },
            { value: 'E8', label: 'E8 (Pass)' },
            { value: 'F9', label: 'F9 (Fail)' },
            { value: 'pending', label: 'Pending' }
        ]
    },
    bece: {
        name: 'BECE',
        hasCoreSubjects: true,
        hasElectives: true,
        coreSubjects: [
            { id: 'coreEnglish', name: 'coreSubjects[]', value: 'english', label: 'English Language' },
            { id: 'coreMaths', name: 'coreSubjects[]', value: 'maths', label: 'Mathematics' },
            { id: 'coreScience', name: 'coreSubjects[]', value: 'science', label: 'Integrated Science' },
            { id: 'coreSocial', name: 'coreSubjects[]', value: 'social', label: 'Social Studies' },
            { id: 'coreIct', name: 'coreSubjects[]', value: 'ict', label: 'ICT' },
            { id: 'coreRme', name: 'coreSubjects[]', value: 'rme', label: 'Religious & Moral Education' },
            { id: 'coreGhLang', name: 'coreSubjects[]', value: 'ghanaian', label: 'Ghanaian Language & Culture' }
        ],
        electiveGroups: {
            'Pre-Technical & Vocational Skills': [
                { value: 'home_econs', label: 'Home Economics' },
                { value: 'technical_skills', label: 'Technical Skills' },
                { value: 'visual_arts', label: 'Visual Arts' }
            ],
            'Languages': [
                { value: 'french', label: 'French' },
                { value: 'arabic', label: 'Arabic' }
            ]
        },
        gradingSystem: [
            { value: '1', label: '1 (Excellent)' },
            { value: '2', label: '2 (Very Good)' },
            { value: '3', label: '3 (Good)' },
            { value: '4', label: '4 (Credit)' },
            { value: '5', label: '5 (Credit)' },
            { value: '6', label: '6 (Credit)' },
            { value: '7', label: '7 (Pass)' },
            { value: '8', label: '8 (Pass)' },
            { value: '9', label: '9 (Fail)' },
            { value: 'pending', label: 'Pending' }
        ]
    },
    gbce: {
        name: 'GBCE',
        hasCoreSubjects: false,
        hasElectives: true,
        coreSubjects: [],
        electiveGroups: {
            'Business Subjects': [
                { value: 'accounting', label: 'Accounting' },
                { value: 'business_maths', label: 'Business Mathematics' },
                { value: 'economics', label: 'Economics' },
                { value: 'commerce', label: 'Commerce' },
                { value: 'costing', label: 'Principles of Costing' },
                { value: 'business_law', label: 'Business Law' },
                { value: 'typewriting', label: 'Typewriting' },
                { value: 'office_practice', label: 'Office Practice' },
                { value: 'ict', label: 'ICT' }
            ]
        },
        gradingSystem: [
            { value: 'A', label: 'A (Excellent)' },
            { value: 'B', label: 'B (Good)' },
            { value: 'C', label: 'C (Credit)' },
            { value: 'D', label: 'D (Pass)' },
            { value: 'F', label: 'F (Fail)' },
            { value: 'pending', label: 'Pending' }
        ]
    },
    abce: {
        name: 'ABCE',
        hasCoreSubjects: false,
        hasElectives: true,
        coreSubjects: [],
        electiveGroups: {
            'Advanced Business Subjects': [
                { value: 'advanced_accounting', label: 'Advanced Accounting' },
                { value: 'auditing', label: 'Auditing' },
                { value: 'business_law_adv', label: 'Business Law' },
                { value: 'economics_adv', label: 'Economics' },
                { value: 'business_maths_stats', label: 'Business Mathematics & Statistics' },
                { value: 'principles_mgmt', label: 'Principles of Management' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'office_practice_adv', label: 'Office Practice' },
                { value: 'secretarial_duties', label: 'Secretarial Duties' }
            ]
        },
        gradingSystem: [
            { value: 'A', label: 'A (Excellent)' },
            { value: 'B', label: 'B (Good)' },
            { value: 'C', label: 'C (Credit)' },
            { value: 'D', label: 'D (Pass)' },
            { value: 'F', label: 'F (Fail)' },
            { value: 'pending', label: 'Pending' }
        ]
    }
};

// Function to get exam types for the dropdown
function getExamTypes() {
    return Object.entries(examConfig).map(([key, config]) => ({
        value: key,
        label: config.name
    }));
}

// Function to get core subjects for a specific exam type
function getCoreSubjects(examType) {
    return examConfig[examType]?.coreSubjects || [];
}

// Function to get elective groups for a specific exam type
function getElectiveGroups(examType) {
    return examConfig[examType]?.electiveGroups || {};
}

// Function to get grading system for a specific exam type
function getGradingSystem(examType) {
    return examConfig[examType]?.gradingSystem || [];
}

// Export the config and functions
window.ExamConfig = {
    examConfig,
    getExamTypes,
    getCoreSubjects,
    getElectiveGroups,
    getGradingSystem
};
