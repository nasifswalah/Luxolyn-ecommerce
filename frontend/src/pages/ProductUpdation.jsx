import React, { useState } from 'react'
import Button from '../components/Button'
import InputField from '../components/InputField'
import { motion } from 'framer-motion'
import { category } from '../constatnts/constants'
import { edit} from '../assets'

const ProductUpdation = () => {

  const [ formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    console.log(formData);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, name: e.taget.value})
  }

  return (
    <div className="relative xl:h-[97vh] h-screen xl:w-[95vw] w-screen xl:border border-[rgba(255,255,255,0.2)] xl:rounded-lg bg-[#141414] backdrop-blur-md flex flex-col justify-center">
      <div className="absolute top-100 w-full h-screen leading-[60.75px] bg-[radial-gradient(ellipse_at_bottom,rgba(121,12,105,0.129)_0%,rgba(13,5,28,0)_85%)]" />
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="font-themeFont text-[#FAF9F6] sm:text-2xl text-xl text-center font-semibold">
          Update Product
        </h2>
      </motion.div>
      <motion.form
        className="mt-8 flex flex-col gap-3 sm:w-96 w-[90vw] mx-auto"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <InputField
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
        />
        <InputField
          type="number"
          name="price"
          placeholder="Product Price"
          onChange={handleChange}
        />
        <select
          type="text"
          name="category"
          placeholder="Product Category"
          onChange={handleChange}
          className="bg-[#292929] px-6 py-2 placeholder:text-[#464647] text-[#BCBCBC] rounded-xl outline-none border-none font-medium"
        >
          <option value="">Select a category</option>
          { category.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        <textarea
        rows={4}
          name="description"
          placeholder="Product Description"
          onChange={handleChange}
          className="bg-[#292929] px-6 py-2 placeholder:text-[#464647] text-[#BCBCBC] rounded-xl outline-none border-none font-medium"
        />
        <div className='flex items-center'>
					<input type='file' id='image' className='sr-only' accept='image/*' />
					<label
						htmlFor='image'
						className='cursor-pointer bg-[#292929] flex-1 rounded-xl text-sm font-medium text-[#464647] hover:bg-[#363636] outline-none border-none px-6 py-2 flex items-center justify-center gap-2'
					>
						<Upload className='h-5 w-5 inline-block' />
						Upload Image
					</label>
					<span className='ml-3 text-sm text-gray-400'>Image uploaded </span>
				</div>
        <Button name="Create" icon={edit} />
      </motion.form>
    </div>
  )
}

export default ProductUpdation 
