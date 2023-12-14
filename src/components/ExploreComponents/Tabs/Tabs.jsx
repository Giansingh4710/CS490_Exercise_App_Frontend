import './Tabs.css'
export function Tabs({ tabs, activeTab }) {
  return (
    <div className='tabs-container'>
      {tabs.map((tab, index) => (
        <>
          <div className={activeTab === tab.label ? 'tab selected' : 'tab'} onClick={tab.handler}>
            <p className='tab-label'>{tab.label}</p>
          </div>
          {index < tabs.length - 1 && <div className='divider'>|</div>}
        </>
      ))}
    </div>
  )
}
