import React from 'react';

// eslint-disable-next-line react/function-component-definition
const CompanyLogo: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '322px',
        height: '42px',
        border: '1px solid #333',
      }}
    >
      <img
        src="../../../../../../src/Presentation/assets/img/bee-img.png"
        alt="Company Logo"
        style={{ width: '100px', height: 'auto', marginRight: '10px' }}
      />
      <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
        Your Company Name
      </span>
    </div>
  );
};

export default CompanyLogo;
