import {React , useState} from "react";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";

const DonorForm = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        firstname : " " , 
        lastname : " ", 
        bloodType : " ", 
        email : " ", 
        phone : " ", 
        address : " ", 
        city : " ", 
        state : " ", 
        zipcode : " "
    })
 

// This function handles the changes occured in the form pages. Like if the user types in the name box, 
// then that change is noted down through this function, where e is the event object. 
const handleChange = (e) => {
    setFormData( prev => ({
        ...prev, 
        [e.target.name] : e.target.value
    }) 
)
}; 

const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
        const token = localStorage.getItem('test-token');
        console.log(formData); 
        await axios.post('http://localhost:5050/api/donorsProfile', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
    alert('Thanks for registering as a donor!');
    navigate('/');
        } 
    catch (err) {
        console.log ("Donor Form Status : " , err); 
    }

}

return (
    <div className="becomeDonorForm">

      <h2 className="title_becomeDonorForm">Become a Blood Donor</h2>
      <form onSubmit={handleSubmit} className="submit_becomeDonorForm">

        <input name="firstname" placeholder="First Name" onChange={handleChange} className="firstName_becomeDonorForm" required />
        <input name="lastname" placeholder="Last Name" onChange={handleChange} className="lastName_becomeDonorForm" required />
        <input name="email" placeholder="Email" onChange={handleChange} className="email_becomeDonorForm" required />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="phone_becomeDonorForm" required />
        <input name="address" placeholder="Address" onChange={handleChange} className="address_becomeDonorForm" required />
        <input name="city" placeholder="City" onChange={handleChange} className="city_becomeDonorForm" required />
        <input name="state" placeholder="State" onChange={handleChange} className="state_becomeDonorForm" required />
        <input name="zipcode" placeholder="ZipCode" onChange={handleChange} className="zipcode_becomeDonorForm" required />

        <select name="bloodType" onChange={handleChange} className="bloodType_becomeDonorForm" required>
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <button type="submit" className="submit_btw_becomeDonorForm">Submit</button>
      </form>
    </div>
  );

}; 

export default DonorForm;