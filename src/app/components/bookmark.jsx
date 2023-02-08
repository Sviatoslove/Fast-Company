
const Bookmark = ({_id, bookmark, handleToggleBookmark}) => {

 const getIconClasses = () => {
  return bookmark ? '-heart-fill' : ''
 }
 
 return <>
 <button onClick={() => handleToggleBookmark(_id)}>
  <i className={'m-2 bi bi-bookmark' + getIconClasses()}></i>
 </button>
 </>
}

export default Bookmark