import Bookmark from "./bookmark"
import Qualitie from "./qualitie"

const User = (props) => {
 return <>
  <tr>
   <td>{props.name}</td>
   <td>
    {props.qualities.map(qualitie => <Qualitie key={qualitie._id} {...qualitie}/>)}
   </td>
   <td>{props.profession.name}</td>
   <td>{props.completedMeetings}</td>
   <td>{props.rate}/5</td>
   <td>
    {<Bookmark status={props.bookmark} onClick={() => props.handleToggleBookmark(props._id)}/>}
   </td>
   <td>
    <button className="btn btn-danger" onClick={() => props.handleDelete(props._id)}>delete</button>
   </td>
  </tr>
 </>
}

export default User