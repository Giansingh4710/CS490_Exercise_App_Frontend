import React from 'react'
import './Overview.css'

export default function CoachesOverview({ children }) {
  return <div className='overview'>{children}</div>
}

export function Tabs({ tabs, activeTab }) {
  return (
    <div className='tabs-container'>
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
          <div className={activeTab === tab.label ? 'tab selected' : 'tab'} onClick={tab.handler}>
            <p className='tab-label'>{tab.label}</p>
          </div>
          {index < tabs.length - 1 && <div className='divider'>|</div>}
        </React.Fragment>
      ))}
    </div>
  )
}
