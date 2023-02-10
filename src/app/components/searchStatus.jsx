
const SearchStatus = ({numOfUsers}) => {
 
 const renderPhrase = number => {
  if(number) {
   let z = number % 100 / 10
   let x = number % 10
   z >= 1.1 && z <= 1.4 ? number += ' человек тусанёт':
   x === 2 || x === 3 || x === 4 ? number += ' человека тусанут':
   number += ' человек тусанёт'
   return number + ' с тобой сегодня'
  } else return 'Никто с тобой не тусанёт'
 }

 return <>
  <h4 className={'fs-4 badge m-2 ' + (numOfUsers ? 'bg-primary' : 'bg-danger')}>
   {renderPhrase(numOfUsers)}
  </h4>
 </>
}

export default SearchStatus