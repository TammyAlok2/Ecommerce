import React ,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewShop } from '../../../Redux/Slices/ShopSlice';
import HomeLayout from '../../../Layouts/HomeLayout';
import { toast } from 'react-hot-toast';

const AddShop = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

const [courseData,setCourseData] = useState({
  title :' ',
  description :'',
  category :'',
  thumbnail:null
})

const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === 'thumbnail') {
    setCourseData(prevState => ({
      ...prevState,
      [name]: files[0] // Only taking the first file if multiple files are selected

    }));
  } else {
    setCourseData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
};

 
  const [error, setError] = useState(null);

  async function createNewShop(event){
  event.preventDefault();

  if(!courseData.title || !courseData.description || !courseData.category || !courseData.thumbnail){
    toast.error('All fields are required')
  return
  }

 



  const formData = new FormData();
  formData.append("title",courseData.title)
  formData.append("description",courseData.description)
  formData.append("category",courseData.category)
  formData.append("thumbnail",courseData.thumbnail)
 


  const response = await dispatch(addNewShop(formData));
  if(response?.payload?.success){
    navigate('/Shops');

    setCourseData({
      title :' ',
      description :'',
      category :'',
      thumbnail:null
  
    })
  }
  
  
 }


 






  return (
    <HomeLayout>
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 bg-gray-100 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Shop</h2>
          <form onSubmit={createNewShop} noValidate>
            <div className="mb-4">
              <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">
              Shop Title
              </label>
              <input
                type="text"
                id="productName"
                name="title"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                required
                value={courseData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={courseData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
           
            <div className="mb-4">
              <label htmlFor="thumbnail" className="block text-gray-700 font-bold mb-2">
                Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
            
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                accept="image/*"
            
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Add Shop
            </button>
          </form>
        </div>
      </div>
    </div>
    </HomeLayout>
  );
};

export default AddShop;
