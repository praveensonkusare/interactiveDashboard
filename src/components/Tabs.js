import React, { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Chart');

  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #ddd' }}>
      {['Summary', 'Chart', 'Statistics', 'Analysis', 'Settings'].map((tab) => (
        <div
          key={tab}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            borderBottom: activeTab === tab ? '2px solid blue' : 'none',
          }}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
