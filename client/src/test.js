
import React,{useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import {getAuthorsQuery, addBookMutation} from './queries/query'




const AddBook = () => {
  
  const [formData, setFormData] = useState({
    name:'',
    genre:'',
    authorId:''
  })

  const {name, genre, authorId} = formData
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})
   
  const { loading, error, data } = useQuery(getAuthorsQuery)
  const [] =  useMutation(addBookMutation)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error.message}`}</p>;

  // console.log(data);
  

  const submitForm = e => {
   e.preventDefault();
   console.log(formData);
   
  }

  return (
    <form id="add-book" onSubmit={e => submitForm(e)}>
      <div className="field">
        <label>Book name:</label>
        <input 
        type="text"
        onChange={e => onChange(e)} 
        name="name"
        value={name}
         />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input 
        name="genre"
        value={genre}
        type="text" 
       onChange={e => onChange(e)}
       />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
        name="authorId"
        value={authorId}
        onChange={e => onChange(e)}
        >
        <option>Select Author</option>
         {data.authors.map(author => (
          <option key={author.id} value={author.id}>{author.name}</option>
         ))}
        </select>
      </div>
        
      <button>+</button>
   
    </form>
  )
}

export default AddBook
