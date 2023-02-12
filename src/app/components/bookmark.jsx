
const Bookmark = ({status, ...rest}) => {
 return <>
 <button {...rest}>
  <i className={'m-2 bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
 </button>
 </>
}

export default Bookmark