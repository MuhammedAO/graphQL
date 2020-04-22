import React,{useState} from 'react'
import {compose} from 'redux'
import { graphql} from 'react-apollo'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from './queries/query'




const AddBook = (props) => {
  
  const [formData, setFormData] = useState({
    name:'',
    genre:'',
    authorId:''
  })

  const {name, genre, authorId} = formData
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

 const displayAuthors = () => {
   let data = props.getAuthorsQuery
   
  //  console.log(props);
   const {loading} = data

   if(loading){
   return (<option>Loading Authors</option>) 
   } else{
      return data.authors.map(author => {
       return (<option key={author.id} value={author.id}>{author.name}</option>)
      })
   }
  }

  const submitForm = e => {
   e.preventDefault();
  //  console.log(formData);
   props.addBookMutation({
     variables: {
       name,
       genre,
       authorId
     },
     refetchQueries: [{query: getBooksQuery}]
   })
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
        {displayAuthors()}
        </select>
      </div>
        
      <button>+</button>
   
    </form>
  )
}

// export default graphql(getAuthorsQuery)(AddBook)

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook)

