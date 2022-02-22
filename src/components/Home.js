import Notes from "./Notes"

const Home = () => {
  return (
    <div>
       <h2 className='my-4'>Add Note</h2>  
       <form className='my-4'>
        <div className="form-group my-2">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group my-2">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <h2 className='my-4'>Your Notes</h2>  
      <Notes/>
    </div>
  )
}

export default Home
