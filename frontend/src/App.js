import { useEffect, useState } from "react";
import axios from "axios"

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fafafa',
    borderRadius: '12px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    width: '350px',
    margin: '50px auto',
  },
  input: {
    padding: '10px',
    width: '90%',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    fontSize: '16px',
    boxSizing: 'border-box',
    outline: 'none',
  },
 button: {
    padding: '10px 20px',
    backgroundColor: 'red', 
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '50%',
    marginBottom: '20px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  listContainer: {
    width: '100%',
  },
  item: {
    backgroundColor: '#fff',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '8px',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontSize: '18px',
    color: '#333',
    fontWeight: '500',
  },
};



function App() {

  const [enteredvalue, setevalue] = useState("")
  const [fruit,setfruit] = useState([])

  useEffect(()=>{

    axios.get("http://localhost:5000/fruitlist").then((data)=>{
      setfruit(data.data)
    })

  },[])

  function handlevalue(e){
    setevalue(e.target.value)
  }

  function handleadd(){

    axios.post("http://localhost:5000/addfruit",{newfruit:enteredvalue})

    setfruit([...fruit,{name:enteredvalue}])
    setevalue(" ")

  }

  return (

    <div style={styles.container}>
  <input 
    style={styles.input} 
    onChange={handlevalue} 
    placeholder="Write something here..."
  />
  <button style={styles.button} onClick={handleadd}>ADD</button>

  <div style={styles.listContainer}>
    {fruit.map(function(item, index) {
      return (
        <h1 style={styles.item} key={index}>
          {item.name}
        </h1>
      );
    })}
  </div>
</div>

  );
}

export default App;
