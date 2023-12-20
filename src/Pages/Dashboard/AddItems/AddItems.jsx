import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAxiosSecret from "../../../Hooks/UseAxiosSecret";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa6";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key${image_hosting_key}`
const AddItems = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = UseAxiosPublic()
    const axiosSecret = UseAxiosSecret()
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and the get an url
        const imageFile = { image: data.image[0] }
        const res = axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        if (res.data.success) {
            // now send the menu item data to the server with the image url 
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecret.post('/menu', menuItem)
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                // show success popup
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }
    return (
        <div>
            <SectionTitle heading="ADD AN ITEM" subHeading='---Whats new?---'></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-5">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input type="text" {...register("name", { required: true })}
                            required placeholder="Recipe Name" className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-5">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select defaultValue='default' {...register("category", { required: true })}
                                className="select select-bordered w-full">
                                <option disabled selected>Seclect a category?</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-5">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* Recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" {...register('recipe')} placeholder="Recipe Details"></textarea></div>

                    <div className="form-control w-full my-5">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn btn-outline bg-sky" >Add Item<FaUtensils></FaUtensils>                     
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;