import './ItemList.css'

export function List({ items, renderItem, noAvailableItemsMessage }) {
  return (
    <div className='list-container'>
      {items?.length > 0 ? (
        items.map((item, index) => renderItem(item, index))
      ) : (
        <div>{noAvailableItemsMessage}</div>
      )}
    </div>
  )
}
export function ItemCard({ item, isSelected, handleClick, children }) {
  return (
    <div className={isSelected ? 'card card-selected' : 'card'} onClick={() => handleClick(item)}>
      {children}
    </div>
  )
}
