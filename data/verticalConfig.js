// Vertical-specific configuration for the dynamic quote form
export const verticalConfig = {
  id: 'cannabis',
  label: 'Cannabis Insurance',
  heading: 'Get a Cannabis Insurance Quote',
  subtext: 'Answer a few quick questions and our cannabis specialists will build a custom coverage program for your operation.',

  businessTypes: [
    { value: 'dispensary', label: 'Dispensary / Retail' },
    { value: 'cultivator', label: 'Cultivator / Grower' },
    { value: 'manufacturer', label: 'Manufacturer / Processor' },
    { value: 'distributor', label: 'Distributor / Transporter' },
    { value: 'testing-lab', label: 'Testing Laboratory' },
    { value: 'multi-license', label: 'Multi-License Operator' },
  ],

  customQuestions: [
    {
      id: 'license_type',
      label: 'What type of cannabis license?',
      type: 'select',
      options: ['Retail/Dispensary', 'Cultivation', 'Manufacturing', 'Distribution', 'Microbusiness', 'Testing Lab'],
    },
    {
      id: 'annual_revenue',
      label: 'Annual revenue?',
      type: 'select',
      options: ['Under $250K', '$250K-$500K', '$500K-$1M', '$1M-$2.5M', '$2.5M+'],
    },
    {
      id: 'employee_count',
      label: 'Number of employees?',
      type: 'select',
      options: ['1-5', '6-15', '16-30', '31-50', '50+'],
    },
  ],

  coverageOptions: [
    'General Liability',
    'Product Liability',
    'Commercial Property',
    'Crop / Harvest Coverage',
    'Workers\' Compensation',
    'Commercial Auto',
    'Equipment Breakdown',
    'Cyber Liability',
    'Directors & Officers',
    'Not Sure — Help Me Decide',
  ],
};
