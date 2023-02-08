
const SearchStatus = ({numOfUsers, renderPhrase}) => {
 return <>
  <h4 className={'fs-4 badge m-2 ' + (numOfUsers ? 'bg-primary' : 'bg-danger')}>
   {renderPhrase(numOfUsers)}
  </h4>
 </>
}

export default SearchStatus