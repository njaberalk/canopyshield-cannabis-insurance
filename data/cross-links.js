// Cannabis cross-linking maps
export const coverageToIndustries = {
  'general-liability': ['dispensaries', 'indoor-cultivation', 'processors', 'distributors'],
  'product-liability': ['dispensaries', 'processors', 'hemp-cbd', 'delivery-services'],
  'property-insurance': ['dispensaries', 'indoor-cultivation', 'outdoor-greenhouse', 'processors'],
  'crop-harvest': ['indoor-cultivation', 'outdoor-greenhouse', 'vertically-integrated'],
  'commercial-auto': ['distributors', 'delivery-services', 'vertically-integrated'],
  'workers-compensation': ['indoor-cultivation', 'processors', 'dispensaries', 'outdoor-greenhouse'],
  'equipment-breakdown': ['indoor-cultivation', 'processors', 'outdoor-greenhouse'],
  'cyber-liability': ['dispensaries', 'testing-labs', 'vertically-integrated'],
  'directors-officers': ['vertically-integrated', 'dispensaries', 'processors'],
  'crime-theft': ['dispensaries', 'indoor-cultivation', 'distributors', 'delivery-services'],
};

export const coverageToResources = {
  'general-liability': ['cannabis-insurance-cost', 'starting-dispensary-insurance'],
  'product-liability': ['product-liability-cannabis', 'cannabis-insurance-cost'],
  'property-insurance': ['cannabis-insurance-cost', 'cannabis-insurance-requirements'],
  'crop-harvest': ['crop-insurance-cannabis', 'cannabis-insurance-cost'],
  'commercial-auto': ['cannabis-delivery-insurance', 'cannabis-insurance-cost'],
  'workers-compensation': ['cannabis-insurance-requirements', 'cannabis-insurance-cost'],
  'equipment-breakdown': ['cannabis-insurance-cost', 'cannabis-insurance-glossary'],
  'cyber-liability': ['cannabis-insurance-cost', 'cannabis-insurance-glossary'],
  'directors-officers': ['cannabis-insurance-cost', 'cannabis-insurance-glossary'],
  'crime-theft': ['cannabis-insurance-cost', 'starting-dispensary-insurance'],
};

export const industryToStates = {
  'dispensaries': ['california', 'colorado', 'illinois', 'michigan', 'massachusetts'],
  'indoor-cultivation': ['california', 'colorado', 'oregon', 'michigan', 'massachusetts'],
  'outdoor-greenhouse': ['california', 'oregon', 'washington', 'colorado', 'maine'],
  'processors': ['california', 'colorado', 'oregon', 'washington', 'nevada'],
  'distributors': ['california', 'colorado', 'michigan', 'illinois', 'nevada'],
  'testing-labs': ['california', 'colorado', 'oregon', 'massachusetts', 'michigan'],
  'vertically-integrated': ['illinois', 'florida', 'ohio', 'new-york', 'new-jersey'],
  'hemp-cbd': ['colorado', 'oregon', 'kentucky', 'montana', 'vermont'],
  'delivery-services': ['california', 'colorado', 'massachusetts', 'michigan', 'oregon'],
  'ancillary-businesses': ['california', 'colorado', 'washington', 'oregon', 'nevada'],
};

export const industryToResources = {
  'dispensaries': ['starting-dispensary-insurance', 'cannabis-insurance-cost', 'cannabis-insurance-requirements'],
  'indoor-cultivation': ['crop-insurance-cannabis', 'cannabis-insurance-cost'],
  'outdoor-greenhouse': ['crop-insurance-cannabis', 'cannabis-insurance-cost'],
  'processors': ['product-liability-cannabis', 'cannabis-insurance-cost'],
  'distributors': ['cannabis-delivery-insurance', 'cannabis-insurance-requirements'],
  'testing-labs': ['cannabis-insurance-cost', 'cannabis-insurance-glossary'],
  'vertically-integrated': ['cannabis-insurance-cost', 'cannabis-insurance-requirements'],
  'hemp-cbd': ['cannabis-vs-hemp-insurance', 'cannabis-insurance-cost'],
  'delivery-services': ['cannabis-delivery-insurance', 'cannabis-insurance-cost'],
  'ancillary-businesses': ['cannabis-insurance-cost', 'cannabis-insurance-glossary'],
};
